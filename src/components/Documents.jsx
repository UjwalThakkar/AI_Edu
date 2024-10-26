import React, { useEffect } from "react";
import { useStateProvider } from "../lib/stateContext";
import { fetchResources } from "../firestoreFunctions";
import { reducerCases } from "../lib/constants";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const Documents = () => {
  const [{ resource, branch, sem, sub }, dispatch] = useStateProvider();
  const storage = getStorage();

  const handleDownload = async (filePath, fileName) => {
    try {
      // Create a reference to the file path in Firebase Storage
      const fileRef = ref(storage, filePath);
      const url = await getDownloadURL(fileRef);

      // Create a link to download or view the document
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank"; // Opens in a new tab
      link.download = fileName; // Specifies the file name for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error fetching document:", error);
      alert("Failed to download document.");
    }
  };

  return (
    <div className="w-[100%] min-h-[80%] h-[auto] flex flex-col items-center justify-start gap-5 pt-5">
      {resource.map((res) => (
        <div
          key={res.id}
          className="text-black w-[80%] h-[auto] border-[1px] border-gray-300 rounded-xl shadow"
        >
          <h3>{res.name.toUpperCase()}</h3>
          <p>Uploaded on: {res.timestamp?.toDate().toLocaleString()}</p>
          <button
            onClick={() => handleDownload(`files/${res.name}`)}
            className="text-blue-500 underline"
          >
            View Document
          </button>
        </div>
      ))}
    </div>
  );
};

export default Documents;
