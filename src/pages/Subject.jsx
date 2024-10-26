import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchResources } from "../firestoreFunctions";
import { useStateProvider } from "../lib/stateContext";
import Documents from "../components/Documents";
import Quiz from "../components/Quiz";
import Chat from "../components/Chat";
import { reducerCases } from "../lib/constants";

const Subject = () => {
  const [resources, setResources] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [{ userInformation, resource, branch, sem, sub }, dispatch] =
    useStateProvider();
  const [resourceFiles, setResourceFiles] = useState([]);
  const params = useParams();

  useEffect(() => {
    const loadResources = async () => {
      const resourcesData = await fetchResources(branch, sem, sub);
      setResourceFiles(resourcesData);
      console.log(resourcesData);
      dispatch({
        type: reducerCases.SET_RESOURCES,
        resource: resourcesData,
      });
    };

    loadResources();
  }, []);

  // console.log(
  //   `from state manager sem: ${sem}, and branch: ${branch}, and selected_subject: ${sub}`
  // );

  return (
    <div className="w-[100vw] h-[90%] flex flex-col justify-start items-center">
      <div className="w-[100%] h-[10%] border-b-[1px] text-black border-gray-300 flex flex-row justify-center items-center gap-[0%]">
        <div
          className={`cursor-pointer h-[100%] w-[8%] flex items-center justify-center ${
            selectedTab === 1 ? "bg-gray-100" : ""
          }`}
          onClick={() => setSelectedTab(1)}
        >
          <h3>Documents</h3>
        </div>
        <div
          className={`cursor-pointer h-[100%] w-[8%] flex items-center justify-center ${
            selectedTab === 2 ? "bg-gray-100" : ""
          }`}
          onClick={() => setSelectedTab(2)}
        >
          Chat
        </div>
        <div
          className={`cursor-pointer h-[100%] w-[8%] flex items-center justify-center ${
            selectedTab === 3 ? "bg-gray-100" : ""
          }`}
          onClick={() => setSelectedTab(3)}
        >
          Quiz
        </div>
      </div>
      <div className="w-[100%] h-[80%]">
        {selectedTab == 1 ? (
          <Documents />
        ) : selectedTab == 2 ? (
          <Chat />
        ) : selectedTab == 3 ? (
          <Quiz />
        ) : (
          <div className="Select a tab"></div>
        )}
      </div>
    </div>
  );
};

export default Subject;
