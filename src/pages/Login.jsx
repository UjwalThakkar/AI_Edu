import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { heroBackground } from "../assets";
import Login1 from "../components/Login/Login1.jsx";
import Login2 from "../components/Login/Login2.jsx";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const navigate = useNavigate();

  const signUpButton = useRef(null);
  const signInButton = useRef(null);
  const container = useRef(null);
  useEffect(() => {
    const handleSignUpClick = () => {
      console.log("right panel active clicked");
      setEmail("");
      setUsername("");
      setPassword("");
      container.current.classList.add("right-panel-active");
      console.log(container);
    };

    const handleSignInClick = () => {
      console.log("right panel inactive clicked");
      setEmail("");
      setUsername("");
      setPassword("");
      container.current.classList.remove("right-panel-active");
      console.log(container);
    };

    const signUpBtn = signUpButton.current;
    const signInBtn = signInButton.current;

    signUpBtn.addEventListener("click", handleSignUpClick);
    signInBtn.addEventListener("click", handleSignInClick);

    // Cleanup event listeners on component unmount
    return () => {
      signUpBtn.removeEventListener("click", handleSignUpClick);
      signInBtn.removeEventListener("click", handleSignInClick);
    };
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       fetchUserInfo(user.uid);
  //     } else {
  //       // setCurrentUser(null);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [fetchUserInfo, setCurrentUser]);

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleInstituteNameChange = (e) => {
    setInstituteName(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(`signing in using email: ${email} and password: ${password}`);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", res.user);

      // Fetch the user data immediately after signing in
      const userDoc = await getDoc(doc(db, "users", res.user.uid));
      // if (userDoc.exists()) {
      if (res) {
        // setCurrentUser(userDoc.data());
        navigate("/");
        // toast.success("Welcome Back!");
      } else {
        // toast.error("User data not found!");
        console.error("no user doc found!");
      }
    } catch (err) {
      console.log(err);
      // toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create user with email and password
      console.log(
        `creating user account with email: ${email} and password: ${password}`
      );
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // const imgUrl = avatar?.file ? await upload(avatar.file) : "";

      console.log("User registered:", res.user);

      // Save user information to Firestore
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        id: res.user.uid,
        // userType: userType,
        // ...(userType === "institute" && { instituteName }),
      });

      // toast.success("Account created! Please log in.");
      console.log("register successful");
      useNavigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        // toast.error("The email address is already in use by another account.");  
      } else {
        // toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh]">
      <div className="w-[100%] h-[100vh] flex flex-col justify-center items-center">
        <div className="login-container" ref={container} id="container">
          <div className="form-container sign-up-container">
            <form action="#" onSubmit={handleRegister}>
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your email for registration</span>
              <input
                type="text"
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button disabled={loading}>
                {loading ? "Loading" : "Sign Up"}
              </button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form action="#" onSubmit={handleLogin}>
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your account</span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a href="#">Forgot your password?</a>
              <button disabled={loading}>
                {loading ? "loading" : "Sign In"}
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="ghost" ref={signInButton} id="signIn">
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" ref={signUpButton} id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    </div>
    // <div className="w-full h-[100vh] flex justify-center items-center gap-[100px] overflow-hidden">
    //   <img
    //     src={heroBackground}
    //     className="w-full z-0 absolute"
    //     width={1440}
    //     height={1800}
    //     alt="hero"
    //   />
    //   <div className="z-2 w-[80%] h-[90%] bg-[#ffffff0c] shadow-111xl backdrop-blur-[1.5px] rounded-[10px] border-[1px] border-[#ffffff2d] flex flex-row justify-center items-center ">
    //     <div className="flex-1 flex-col items-center gap-[20px] z-2">
    //       <form
    //         onSubmit={handleLogin}
    //         className="flex flex-col items-center justify-center gap-[20px]"
    //       >
    //         <input
    //           type="text"
    //           name="email"
    //           placeholder="Email"
    //           className="p-[20px] border-none outline-none bg-gray-500 text-white rounded-[5px]"
    //         />
    //         <input
    //           type="password"
    //           name="password"
    //           placeholder="Password"
    //           className="p-[20px] border-none outline-none bg-gray-500 text-white rounded-[5px]"
    //         />
    //         <input
    //           type="text"
    //           name="insitute"
    //           placeholder="Insitute Name"
    //           className="p-[20px] border-none outline-none bg-gray-500 text-white rounded-[5px]"
    //         />
    //         <button
    //           disabled={loading}
    //           className="w-75 p-[20px] border-none bg-blue-500 rounded-[5px] cursor-pointer font-medium disabled:cursor-not-allowed disabled:bg-blue-300"
    //         >
    //           {loading ? "loading" : "Sign In"}
    //         </button>
    //       </form>
    //     </div>
    //     <div className="h-[80%] w-[2px] bg-gray-400 z-2"></div>
    //     <div className="flex-1 flex-col items-center gap-[20px] z-2">
    //       <form
    //         onSubmit={handleRegister}
    //         className="flex flex-col items-center justify-center gap-[20px]"
    //       >
    //         <input
    //           type="text"
    //           name="username"
    //           placeholder="Username"
    //           className="p-[20px] border-none outline-none bg-gray-500 text-white rounded-[5px]"
    //         />
    //         <input
    //           type="text"
    //           name="email"
    //           placeholder="Email"
    //           className="p-[20px] border-none outline-none bg-gray-500 text-white rounded-[5px]"
    //         />
    //         <input
    //           type="password"
    //           name="password"
    //           placeholder="Password"
    //           className="p-[20px] border-none outline-none bg-gray-500 text-white rounded-[5px]"
    //         />
    //         <label htmlFor="userType">Select User Type:</label>
    //         <select
    //           id="userType"
    //           name="userType"
    //           value={userType}
    //           onChange={handleUserTypeChange}
    //         >
    //           <option value="">--Select--</option>
    //           <option value="Student">Student</option>
    //           <option value="Institute">Institute</option>
    //         </select>
    //         {userType === "institute" && (
    //           <input
    //             type="text"
    //             name="instituteName"
    //             id="instituteName"
    //             value={instituteName}
    //             onChange={handleInstituteNameChange}
    //           />
    //         )}
    //         <button
    //           disabled={loading}
    //           className="w-75 p-[20px] border-none bg-blue-500 rounded-[5px] cursor-pointer font-medium disabled:cursor-not-allowed disabled:bg-blue-300"
    //         >
    //           {loading ? "loading" : "Register"}
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
