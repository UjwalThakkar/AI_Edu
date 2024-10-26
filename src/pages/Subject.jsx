import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchResources } from "../firestoreFunctions";
import { useStateProvider } from "../lib/stateContext";
import Documents from "../components/Documents";
import Quiz from "../components/Quiz";
import Chat from "../components/Chat";

const Subject = () => {
  const [resources, setResources] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [{ userInformation, branch, sem, sub }, dispatch] = useStateProvider();
  const params = useParams();

  useEffect(() => {
    const loadResources = async () => {
      const resourcesData = await fetchResources(branch, sem, sub);
      console.log(resourcesData);
    };
    loadResources();
  }, []);

  console.log(
    `from state manager sem: ${sem}, and branch: ${branch}, and selected_subject: ${sub}`
  );

  return (
    <div className="w-[100vw] h-[90%] flex flex-col justify-start items-center">
      <div className="w-[100%] h-[10%] border-b-[1px] text-black border-gray-300 flex flex-row justify-center items-center gap-[0%]">
        <div
          className={`cursor-pointer h-[100%] w-[8%] flex items-center justify-center ${
            selectedTab === 0 ? "bg-gray-100" : ""
          }`}
          onClick={() => setSelectedTab(0)}
        >
          <h3>Documents</h3>
        </div>
        <div
          className={`cursor-pointer h-[100%] w-[8%] flex items-center justify-center ${
            selectedTab === 1 ? "bg-gray-100" : ""
          }`}
          onClick={() => setSelectedTab(1)}
        >
          Chat
        </div>
        <div
          className={`cursor-pointer h-[100%] w-[8%] flex items-center justify-center ${
            selectedTab === 2 ? "bg-gray-100" : ""
          }`}
          onClick={() => setSelectedTab(2)}
        >
          Quiz
        </div>
      </div>
      <div className="w-[100%] h-[80%]">
        {selectedTab == 0 ? (
          <Documents />
        ) : selectedTab == 1 ? (
          <Chat />
        ) : selectedTab == 2 ? (
          <Quiz />
        ) : (
          <Documents />
        )}
      </div>
    </div>
  );
};

export default Subject;
