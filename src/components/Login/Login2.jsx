import React, { useRef, useEffect } from "react";
import "./Login1.css";
// import "./Login1";
const Login2 = () => {
  const signUpButton = useRef(null);
  const signInButton = useRef(null);
  const container = useRef(null);
  useEffect(() => {
    const handleSignUpClick = () => {
        console.log("right panel active clicked")
      container.current.classList.add("right-panel-active");
      console.log(container)
    };

    const handleSignInClick = () => {
        console.log("right panel inactive clicked")
      container.current.classList.remove("right-panel-active");
      console.log(container)
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

  return (
    <div className="w-[100%] h-[100vh] flex flex-col justify-center items-center">
      <div className="login-container" ref={container} id="container">
        <div className="form-container sign-up-container">
          <form action="#">
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
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>    
          </form>
        </div>
        <div className="form-container sign-in-cont	ainer">
          <form action="#">
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
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
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
};

export default Login2;
