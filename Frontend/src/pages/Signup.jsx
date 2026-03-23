import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
  e.preventDefault();
  const { name, email, password } = signupInfo;

  if (!name || !email || !password) {
    return handleError("Name, email and password are required");
  }

  try {
    const url = "http://localhost:8080/auth/signup";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupInfo),
    });

    const result = await response.json();
    const { success, message, error } = result;

    if (success) {
      handleSuccess(message);
      localStorage.setItem("username",name);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else if (error) {
      const details = error?.details?.[0]?.message;
      handleError(details || "Signup failed");
    } else {
      handleError(message);
    }

    console.log(result);
  } catch (err) {
    handleError(err.message || "Something went wrong");
  }
};

  return (
    
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={signupInfo.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={signupInfo.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signupInfo.password}
          onChange={handleChange}
        />

        <button type="submit">Sign Up</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>

      <ToastContainer />
    </div>
    
  );
}

export default Signup;
