import React, { useEffect, useState } from "react";
import {
  fetchBranches,
  fetchSemesters,
  fetchSubjects,
} from "../firestoreFunctions";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Subject from "./Subject";
import { useStateProvider } from "../lib/stateContext";
import { reducerCases } from "../lib/constants";

const Dashboard = () => {
  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [{ userInformation, branch, sem, sub }, dispatch] = useStateProvider();
  const navigate = useNavigate();

  useEffect(() => {
    const loadBranches = async () => {
      const branchesData = await fetchBranches();
      setBranches(branchesData);
    };
    loadBranches();
  }, []);

  useEffect(() => {
    if (selectedBranch) {
      const loadSemesters = async () => {
        const semestersData = await fetchSemesters(selectedBranch);
        setSemesters(semestersData);
      };
      loadSemesters();
    }
  }, [selectedBranch]);

  useEffect(() => {
    if (selectedBranch && selectedSemester) {
      const loadSubjects = async () => {
        const subjectsData = await fetchSubjects(
          selectedBranch,
          selectedSemester
        );
        setSubjects(subjectsData);
      };
      loadSubjects();
    }
  }, [selectedSemester]);

  const TileContainer = () => {
    console.log(
      `from state manager sem: ${sem}, and branch: ${branch}, and selected_subject: ${sub}`
    );
    return (
      <div className="w-[100vw] h-[90%] p-10 flex flex-col justify-start items-start gap-5">
        {subjects.length != 0 ? (
          subjects.map((subject) => (
            <div
              key={subject.id}
              // onClick={() => {
              //   navigate(`/Subject/${subject.id}`);
              // }}
              onClick={() => {
                dispatch({
                  type: reducerCases.SET_BRANCH,
                  branch: selectedBranch,
                });
                dispatch({
                  type: reducerCases.SET_SEM,
                  sem: selectedSemester,
                });
                dispatch({
                  type: reducerCases.SET_SUB,
                  sub: subject.id,
                });

                setSelectedSubject(subject.id);
              }}
              className="cards w-[280px] h-[180px] bg-orange-300 rounded-xl flex flex-col shadow-lg border-[1px] border-gray-200 hover:shadow-xl hover:scale-[105%] transition-all ease-in-out"
            >
              <div className=" w-full h-[40%] text-white px-5 py-4 flex flex-row justify-between items-center">
                <h1 className="text-xl">{subject.name}</h1>
                <h1>...</h1>
              </div>
            </div>
          ))
        ) : (
          <div className=" w-[100%] h-[100%] flex justify-center items-center text-gray-400 font-extrabold">
            No Subjects to display...
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-start items-start flex-wrap bg-white">
      <div className="navbar w-[100%] h-[10%] shadow-lg bg-blue-50 flex flex-row justify-between items-center px-5">
        <h1
          className="text-xl text-black font-extrabold cursor-pointer"
          onClick={() => {
            dispatch({
              type: reducerCases.SET_SUB,
              sub: undefined,
            });
            navigate("/");
          }}
        >
          Dashboard
        </h1>
        <div className="overflow-hidden w-[20%] h-[100%]">
          <select
            className="w-[45%] h-[100%] bg-gray-100 text-black"
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>

          {selectedBranch && (
            <select
              className="w-[45%] h-[100%] bg-gray-100 text-black"
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="">Select Semester</option>
              {semesters.map((sem) => (
                <option key={sem.id} value={sem.id}>
                  {sem.name}
                </option>
              ))}
            </select>
          )}
        </div>
        {/* <h2 className="text-black">welcome {userInformation.username}</h2> */}
        <div className=" w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl">
          U
        </div>
        <div className="text-black border-[1px] border-black">
          <button
            onClick={() => {
              console.log("signing user out!");
              auth.signOut();
            }}
          >
            signOut
          </button>
        </div>
      </div>
      {sub ? <Subject /> : <TileContainer />}
    </div>
  );
};

export default Dashboard;
