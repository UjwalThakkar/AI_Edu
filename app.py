import os
from flask import Flask, request, jsonify
from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader, CSVLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_community.llms import Ollama
import json
import re
from langchain.prompts import ChatPromptTemplate
import traceback 
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


# Initialize global variables
embedding_model = "sentence-transformers/all-mpnet-base-v2"
llm_model = "llama3.2:3b"
embeddings = HuggingFaceEmbeddings(model_name=embedding_model)
DB_FAISS_PATH = 'vectorstore/db_faiss'

def process_documents(path):
    """Process and split documents from the given path (file or directory)"""
    documents = []
    
    # Check if the path is a file or directory
    if os.path.isfile(path):
        print(f"Processing single file: {path}")
        ext = os.path.splitext(path)[1].lower()
        if ext == ".pdf":
            loader = PyPDFLoader(path)
        elif ext == ".csv":
            loader = CSVLoader(path)
        else:
            return [], f"Unsupported file format: {ext}"
        
        try:
            data = loader.load()
            print(f"Loaded {len(data)} documents from {path}")
            documents.extend(data)
        except Exception as e:
            return [], f"Error loading file {path}: {str(e)}"
    
    elif os.path.isdir(path):
        print(f"Processing directory: {path}")
        loaders = [
            DirectoryLoader(path, glob="**/*.pdf", show_progress=True, loader_cls=PyPDFLoader),
            DirectoryLoader(path, glob="**/*.docx", show_progress=True),
            DirectoryLoader(path, glob="**/*.csv", loader_cls=CSVLoader)
        ]
        
        for loader in loaders:
            try:
                data = loader.load()
                documents.extend(data)
            except Exception as e:
                print(f"Error loading documents: {str(e)}")
                continue
    else:
        return [], f"Invalid path: {path} is neither a file nor a directory"
    
    if not documents:
        return [], "No documents were loaded"

    splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
        chunk_size=512,
        chunk_overlap=256,
        separators=["\n\n", "\n", " "]
    )
    split_docs = splitter.split_documents(documents)
    print(f"Split into {len(split_docs)} chunks")
    
    return split_docs, None

def create_qa_chain():
    """Create a question-answering chain"""
    llm = Ollama(model=llm_model)
    
    if not os.path.exists(DB_FAISS_PATH):
        raise Exception("No document database found. Please upload documents first.")
    
    vector_store = FAISS.load_local(DB_FAISS_PATH, embeddings, allow_dangerous_deserialization=True)
    retriever = vector_store.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 3}
    )
    
    # Updated prompt template with escaped curly braces for the JSON example
    prompt = PromptTemplate.from_template("""
You are a helpful assistant. Using the following context, create a quiz with 10 multiple-choice questions MCQs,
each having 3 options and one correct answer. You must format your response exactly as shown in the example below:

**questions_and_options**
```json
{{
    "Question 1?": ["Option A", "Option B", "Option C"],
    "Question 2?": ["Option A", "Option B", "Option C"]
}}
```

**questions_and_answers**
```json
{{
    "Question 1?": "Option A",
    "Question 2?": "Option B"
}}
```

If you cannot find enough information in the context, return empty JSON objects.

Context: {context}
Question: {input}

Answer: Here's your quiz based on the provided context:
""")

    doc_chain = create_stuff_documents_chain(
        llm=llm,
        prompt=prompt
    )
    
    qa_chain = create_retrieval_chain(
        retriever=retriever,
        combine_docs_chain=doc_chain
    )
    
    return qa_chain

def create_qa_chain_deep_answer():
    """Create a question-answering chain"""
    llm = Ollama(model=llm_model)
    
    # Load the vector store
    if not os.path.exists(DB_FAISS_PATH):
        raise Exception("No document database found. Please upload documents first.")
    
    vector_store = FAISS.load_local(DB_FAISS_PATH, embeddings, allow_dangerous_deserialization=True)

    retriever = vector_store.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 3}  # Adjust this if needed
    )
    
    # Create a simple prompt template instead of ChatPromptTemplate
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful assistant. Using the following context, answer the user's question in detailed and long format. If you cannot find the answer in the context, say so."),
        ("human", "Context: {context}"),
        ("human", "Question: {input}"),
    ])

    # Create the document chain
    doc_chain = create_stuff_documents_chain(
        llm=llm,
        prompt=prompt
    )
    
    # Create the retrieval chain
    qa_chain = create_retrieval_chain(
        retriever=retriever,
        combine_docs_chain=doc_chain
    )
    
    return qa_chain

@app.route('/api/upload', methods=['POST'])
def upload_documents():
    """API endpoint for document upload and processing"""
    if 'directory' not in request.json:
        return jsonify({"error": "No directory or file specified"}), 400
    
    path = request.json['directory']
    try:
        # Process documents
        split_docs, error = process_documents(path)
        if error:
            return jsonify({"error": error}), 400
        
        # Create and save vector store
        db = FAISS.from_documents(split_docs, embeddings)
        print(f"FAISS Vector Store contains {len(split_docs)} document chunks")
        os.makedirs(os.path.dirname(DB_FAISS_PATH), exist_ok=True)
        db.save_local(DB_FAISS_PATH)
        
        return jsonify({
            "message": "Documents processed successfully",
            "document_chunks": len(split_docs)
        })
    
    except Exception as e:
        return jsonify({"error": f"Error processing documents: {str(e)}"}), 500

def clean_response(answer_text):
    """Clean and reformat the model's response for JSON output."""
    try:
        # More robust regex patterns that handle various whitespace and formatting
        qao_pattern = r"\*\*questions_and_options\*\*\s*```(?:json)?\s*(\{.*?\})\s*```"
        qaa_pattern = r"\*\*questions_and_answers\*\*\s*```(?:json)?\s*(\{.*?\})\s*```"
        
        qao_match = re.search(qao_pattern, answer_text, re.DOTALL)
        qaa_match = re.search(qaa_pattern, answer_text, re.DOTALL)
        
        if not qao_match or not qaa_match:
            print("Debug - Raw response:", answer_text)  # Debug line
            return {
                "questions_and_options": {},
                "questions_and_answers": {},
                "error": "Required JSON sections not found in the response."
            }
        
        # Extract and clean the JSON strings
        questions_and_options = qao_match.group(1).strip()
        questions_and_answers = qaa_match.group(1).strip()
        
        # Parse JSON with error handling
        try:
            qao_dict = json.loads(questions_and_options)
        except json.JSONDecodeError as e:
            print(f"Debug - Q&O JSON parse error: {str(e)}")
            qao_dict = {}
            
        try:
            qaa_dict = json.loads(questions_and_answers)
        except json.JSONDecodeError as e:
            print(f"Debug - Q&A JSON parse error: {str(e)}")
            qaa_dict = {}
        
        return {
            "questions_and_options": qao_dict,
            "questions_and_answers": qaa_dict
        }
        
    except Exception as e:
        print(f"Debug - Unexpected error: {str(e)}")  # Debug line
        return {
            "questions_and_options": {},
            "questions_and_answers": {},
            "error": f"Error processing response: {str(e)}"
        }

@app.route('/api/query', methods=['POST'])
def query_documents():
    """API endpoint for querying documents"""
    if 'question' not in request.json:
        return jsonify({"error": "No question provided"}), 400
    
    question = request.json['question']
    print(question)
    try:
        qa_chain = create_qa_chain()
        response = qa_chain.invoke({"input": question})
        
        # Add debug logging
        print("Debug - Raw LLM response:", response['answer'])
        
        cleaned_response = clean_response(response['answer'])
        
        # Check if we got empty results
        if (not cleaned_response.get('questions_and_options') and 
            not cleaned_response.get('questions_and_answers')):
            return jsonify({
                "error": "No valid quiz could be generated from the context",
                "debug_response": response['answer']  # Include raw response for debugging
            }), 404
        print(cleaned_response)    
        return jsonify(cleaned_response)
    
    except Exception as e:
        print(f"Debug - Server error: {str(e)}")  # Debug line
        return jsonify({
            "error": f"Error processing query: {str(e)}",
            "trace": traceback.format_exc()
        }), 500
    
@app.route('/api/querydeepanswers', methods=['POST'])
def query_documents_deep_answers():
    """API endpoint for querying documents with plain text output"""
    if 'question' not in request.json:
        return "No question provided", 400  # Return plain text error if question is missing

    question = request.json['question']
    try:
        # Create QA chain
        qa_chain = create_qa_chain_deep_answer()

        # Get response from the model
        response = qa_chain.invoke({"input": question})

        # Ensure we're returning only the answer as plain text
        return response['answer'], 200  # Flask will return this as plain text due to direct string response

    except Exception as e:
        # Handle and return any exceptions in plain text
        return f"Error processing query: {str(e)}", 500

def create_curriculum_parser_chain():
    """Create a chain for parsing curriculum text into structured format"""
    llm = Ollama(model=llm_model)
    
    # Load the vector store if needed
    if not os.path.exists(DB_FAISS_PATH):
        raise Exception("No document database found. Please upload documents first.")
    
    vector_store = FAISS.load_local(DB_FAISS_PATH, embeddings, allow_dangerous_deserialization=True)
    
    retriever = vector_store.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 3}
    )
    
    # Create a prompt template for curriculum parsing
    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a curriculum parsing assistant. Your task is to:
1. Analyze the given curriculum text
2. Identify main topics and their subtopics
3. Return the result as a JSON dictionary where main topics are keys and subtopics are arrays in the values
4. Format should be exactly like this example:
{{
    "Topic 1": ["Subtopic 1", "Subtopic 2", "Subtopic 3"],
    "Topic 2": ["Subtopic 1", "Subtopic 2", "Subtopic 3"]
}}
Only return the JSON dictionary, no additional text."""),
        ("human", "Here is the curriculum text to analyze: {input}"),
        ("human", "Additional context if available: {context}")
    ])
    
    # Create the document chain
    doc_chain = create_stuff_documents_chain(
        llm=llm,
        prompt=prompt,
        document_variable_name="context"
    )
    
    # Create the retrieval chain
    parser_chain = create_retrieval_chain(
        retriever=retriever,
        combine_docs_chain=doc_chain
    )
    
    return parser_chain

@app.route('/api/parse-curriculum', methods=['POST'])
def parse_curriculum_endpoint():
    """API endpoint for parsing curriculum text into structured dictionary"""
    if 'text' not in request.json:
        return jsonify({"error": "No curriculum text provided"}), 400
    
    curriculum_text = request.json['text']
    try:
        # Create parser chain
        parser_chain = create_curriculum_parser_chain()
        
        # Get response from the model
        response = parser_chain.invoke({"input": curriculum_text})
        
        # Extract just the JSON part from the response
        try:
            # Find the first { and last } to extract just the JSON part
            response_text = response['answer']
            json_start = response_text.find('{')
            json_end = response_text.rfind('}') + 1
            
            if json_start == -1 or json_end == 0:
                return jsonify({"error": "No valid JSON found in response"}), 500
                
            json_str = response_text[json_start:json_end]
            result = json.loads(json_str)
            
            return jsonify(result)
            
        except json.JSONDecodeError as e:
            return jsonify({
                "error": "Failed to parse response as JSON",
                "details": str(e),
                "raw_response": response['answer']
            }), 500
    
    except Exception as e:
        return jsonify({
            "error": f"Error processing curriculum: {str(e)}",
            "trace": traceback.format_exc()
        }), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)