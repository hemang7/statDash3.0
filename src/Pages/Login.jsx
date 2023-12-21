import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useSpring, animated } from "react-spring";
import Logo from "../logo.png";
import logoName from "../logoName.png";
import logoSlogan from "../logoSlogan.png";

import { UserAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const springProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Login Error",
        description: "Please enter both email and password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await signIn(email, password);
      navigate("/main-app");
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Login Error",
        description: "Incorrect email or password entered!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center items-center my-2 mx-2 md:mx-0 md:my-0 bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400">
      <animated.div style={springProps} className="flex ">
        {/* Left side with icon and text */}

        <div className=" sm:mb-5 flex sm:mr-14 sm:w-full">
          <img src={logoSlogan} alt="" className="mr-3 sm:w-96" />
        </div>
      </animated.div>
      <animated.div style={springProps} className="sm:w-1/3 sm:ml-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">Login!</h2>
        <form onSubmit={handleLogin}>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <a
              className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
              href="#"
              onClick={() => navigate("/reset-password")}
            >
              Forgot Password?
            </a>
          </div>
          <div className="text-center md:text-left">
            <animated.button
              className={`mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white  font-semibold uppercase rounded w-full tracking-wider`}
              type="submit"
              style={springProps}
            >
              Login
            </animated.button>
          </div>
        </form>
        <div className="mt-4 font-semibold text-slate-500 text-center md:text-left">
          Don't have an account?{" "}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="#"
            onClick={() => navigate("/signup")}
          >
            Register
          </a>
        </div>
      </animated.div>
    </section>
  );
}

export default Login;
