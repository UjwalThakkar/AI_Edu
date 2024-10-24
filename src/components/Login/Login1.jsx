import React from "react";
import "./Login1.css";

const Login1 = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full m-[-20px 0 50px]">
      <div
        className="container bg-white rounded-[10px] relative overflow-hidden w-[786px] max-w-[100%] min-h-[480px]"
        id="container"
      >
        <div className="form-container sign-up-container absolute top-0 h-[100%] transition ease-in-out delay-[0.6s] left-0 opacity-0 w-[50%] z-1">
          <form
            action="#"
            className="bg-[#FFFFFF] flex flex-col items-center justify-center p-[0 50px] h-[100%] text-center text-black "
          >
            <h1 className="font-bold m-0 text-black">Create Account</h1>
            <div className="social-container m-[20px 0]">
              <a
                href="#"
                className="border-[1px] border-[#DDDDDD] rounded-[50%] inline-flex justify-center items-center m-[0 5px] h-[40px] w-[40px]"
              ></a>
            </div>
            <span className="text-[12px]">
              or use you email for registration
            </span>
            <input type="text" name="name" placeholder="Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button className="rounded-[20px] border-[1px] bg-[#ff4b2b] text-white font-[12px] p-[12px 45px] tracking-[1px] transition-transform delay-[80ms] ease-in active:scale-[0.95] focus:outline-none ghost:bg-color-transparent">Sign Up</button>
          </form>
        </div>
        <div className="form_container sign-in-container absolute top-0 h-[100%] transition ease-in-out delay-[0.6s] left-0 w-[50%] z-2">
          <form action="#">
            <h1>Sign In</h1>
            <div className="social-container m-[20px 0]">
              <a
                href="#"
                className="border-[1px] border-[#DDDDDD] rounded-[50%] inline-flex justify-center items-center m-[0 5px] h-[40px] w-[40px]"
              ></a>
            </div>
            <span>or use your account</span>
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <a href="#">Forgot your Password?</a>
            <button>Sign In</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login1;
