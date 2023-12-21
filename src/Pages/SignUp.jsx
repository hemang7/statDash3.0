import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useSpring, animated } from "react-spring";
import logoSlogan from "../logoSlogan.png";
import { UserAuth } from "../context/AuthContext";
import Modal from "../components/Modal";
import emailjs from "@emailjs/browser";

function SignUp() {
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const modalRef = useRef(null);
  const form = useRef();

  const { createUser } = UserAuth();

  const springProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  });

  const handleOpenModal = () => {
    modalRef.current.openModal();
  };

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!displayName || !email || !password || !confirmPass) {
      toast({
        title: "Error",
        description: "All fields are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!emailPattern.test(email)) {
      toast({
        title: "Error",
        description: "Invalid email format.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPass) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!isCheckboxChecked) {
      toast({
        title: "Error",
        description: "Please read and accept the terms and conditions.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await createUser(email, password, displayName);
      navigate("/login");
      toast({
        title: "Success",
        description: "Registration successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      emailjs
        .sendForm(
          "service_8bzyb3r",
          "template_7b147sd",
          form.current,
          "uOIZJKhpS11ZyW8d2"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    } catch (e) {
      const errorMessage = e.message.replace("Firebase:", "");

      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <animated.section
      style={springProps}
      className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400"
    >
      <div className="flex">
        {/* Left side with icon and text */}
        <div className="md:w-1/2 mb-2 ml-24 flex items-center">
          <img src={logoSlogan} alt="" className="mr-3 sm:w-96" />
        </div>
        {/* Right side with form */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold mb-8 text-center">Signup!</h2>
          <form onSubmit={handleSignUp} ref={form}>
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
              type="text"
              placeholder="Name"
              name="user_name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
              className="text-sm w-full px-3 py-2 border border-solid border-gray-300 rounded mt-4"
              type="email"
              placeholder="Email"
              value={email}
              name="user_email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="password"
              placeholder="Confirm Password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="acceptTerms"
                className="mr-2"
                onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
              />
              <label htmlFor="acceptTerms">
                I agree to the{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={handleOpenModal}
                >
                  Terms and Conditions
                </span>
              </label>
            </div>

            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded w-full tracking-wider"
                type="submit"
              >
                Signup
              </button>
            </div>
          </form>
          <div className="text-center md:text-left mt-4">
            <Link to="/login" className="text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
      <Modal ref={modalRef} />
    </animated.section>
  );
}

export default SignUp;
