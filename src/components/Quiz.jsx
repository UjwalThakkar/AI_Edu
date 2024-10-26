import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Quiz = () => {
  const [Loading, setLoading] = useState(false)
  const [mcqData, setMcqData] = useState([])
  const url = 'http://localhost:5000/api/query';
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    "question": "State and explain different components of the Block chain."
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await axios.post(url, body, { headers });
        const { questions_and_answers, questions_and_options } = response.data;
        setMcqData(questions_and_options);

        // Combine questions, options, and answers into a structured format
        // const combinedData = Object.keys(questions_and_options).map(question => ({
        //   question,
        //   options: questions_and_options[question],
        //   answer: questions_and_answers[question] || "No Answer Provided"
        // }));
        // setMcqData(combinedData);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }
    fetchQuiz();
  }, []);

  useEffect(() => { console.log(mcqData) }, [mcqData]);

  return (

    <div className="w-[100%] h-min-[80%] h-[100%] flex flex-col items-center justify-start">
      <ul className='bg-white w-[100%] flex flex-col '>
        <li className='mt-5 rounded-md'>
          <div className="w-[100%] h-[auto] border-[1px] border-gray-200 rounded-xl shadow-md p-5">
            <h2 className='text-black font-bold '>DescDescribe the process of Block Propagation and Relay</h2>
            <input className='text-black ml-5' type="checkbox" name="options1" id="option1" value="option1" />
            <label className='text-black' for="option1">Option A</label>
            <input className='text-black ml-5' type="checkbox" name="options1" id="option1" value="option1" />
            <label className='text-black' for="option1">Option B</label>
            <input className='text-black ml-5' type="checkbox" name="options1" id="option1" value="option1" />
            <label className='text-black' for="option1">Option C</label>
          </div>
        </li>
        <li className="w-[100%] h-[auto] border-[1px] border-gray-200 rounded-xl shadow-md p-5">
          <div className="w-[90%] h-[auto] border-[1px] border-gray-200 rounded-sm p-5">
            <h2 className='text-black font-bold '>Explain the structure and components of a block in a Blockchain</h2>
            <input className='text-black ml-5' type="checkbox" name="options1" id="option1" value="option1" />
            <label className='text-black' for="option1">Option A</label>
            <input className='text-black ml-5' type="checkbox" name="options1" id="option1" value="option1" />
            <label className='text-black' for="option1">Option B</label>
            <input className='text-black ml-5' type="checkbox" name="options1" id="option1" value="option1" />
            <label className='text-black' for="option1">Option C</label>
          </div>
        </li>
        <li className="w-[100%] h-[auto] border-[1px] border-gray-200 rounded-xl shadow-md p-5">
          <div className="w-[90%] h-[auto] border-[1px] border-gray-200 rounded-sm p-5">
            <h2 className='text-black font-bold '>Describe the process of Dispute Resolution in a Blockchain</h2>
            <input className='text-black ml-5' type="checkbox" name="options1" id="option1" value="option1" />
            <label className='text-black' for="option1">Option A</label>
            <input className='text-black ml-5' type="checkbox" name="options1" id="option1" value="option1" />
            <label className='text-black' for="option1">Option B</label>
            <input className='text-black ml-5' type="checkbox" name="options1" id="option1" value="option1" />
            <label className='text-black' for="option1">Option C</label>
          </div>
        </li>
        <li className="w-[100%] h-[auto] border-[1px] border-gray-200 rounded-xl shadow-md p-5">
          <div className="w-[90%] h-[auto] border-[1px] border-gray-200 rounded-sm p-5">
            <h2 className='text-black font-bold '>How do Previous Block Addresses/Hashes ensure tamper-proofing</h2>
            <input className='text-black ml-5' type="checkbox" name="options1" id="option1" value="option1" />
            <label className='text-black' for="option1">Option A</label>
            <input className='text-black ml-5' type="checkbox" name="options1" id="option1" value="option1" />
            <label className='text-black' for="option1">Option B</label>
            <input className='text-black ml-5' type="checkbox" name="options1" id="option1" value="option1" />
            <label className='text-black' for="option1">Option C</label>
          </div>
        </li>
        <li className="w-[100%] h-[auto] border-[1px] border-gray-200 rounded-xl shadow-md p-5">
          <div className="w-[90%] h-[auto] border-[1px] border-gray-200 rounded-sm p-5">
            <h2 className='text-black font-bold '>How does the Collective Contribution ensure security and integrity in a Blockchain</h2>
            <input className='text-black ml-5' type="checkbox" name="options1" id="option1" value="option1" />
            <label className='text-black' for="option1">Option A</label>
            <input className='text-black ml-5' type="checkbox" name="options1" id="option1" value="option1" />
            <label className='text-black' for="option1">Option B</label>
            <input className='text-black ml-5' type="checkbox" name="options1" id="option1" value="option1" />
            <label className='text-black' for="option1">Option C</label>
          </div>
        </li>
      </ul>
    </div>

  )
}

export default Quiz
