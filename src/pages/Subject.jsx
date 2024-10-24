import React from "react";
import { useParams } from "react-router-dom";

const Subject = () => {
  const params = useParams();

  return (
    <div className="w-[100vw] h-[90%] flex flex-col justify-start items-center">
        <div className="w-[100%] h-[10%] border-b-[1px] text-black border-gray-300 flex flex-row justify-center items-center gap-[8%]">
            <div className="cursor-pointer" onClick={() => setSelectedTab(1)}>Documets</div>
            <div className="cursor-pointer" onClick={() => setSelectedTab(1)}>Chat</div>
            <div className="cursor-pointer" onClick={() => setSelectedTab(1)}>Quiz</div>
        </div>
    </div>
  );
};

export default Subject;
