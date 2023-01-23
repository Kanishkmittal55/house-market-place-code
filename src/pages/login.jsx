import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ReactComponent as ArrowRightIcom } from "../assets/assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/assets/svg/visibilityIcon.svg";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentials.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid User Credentials");
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const onChange2 = () => {
    // setShowPassword(!prevState);
    console.log(showPassword);
    if (showPassword === false) {
      setShowPassword(true);
    } else if (showPassword === true) {
      setShowPassword(false);
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome Back !</p>
      </header>

      <form onSubmit={onSubmit}>
        <input
          type="email"
          className="emailInput"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChange}
        />

        <div className="passwordInputDiv">
          <input
            type={showPassword ? "text" : "password"}
            className="passwordInput"
            placeholder="Password"
            id="password"
            value={password}
            onChange={onChange}
          />

          <img
            src={visibilityIcon}
            alt="show Password"
            className="showPassword"
            onClick={onChange2}
          />
        </div>

        <Link to="/forgot-password" className="forgotPasswordLink">
          Forgot Password
        </Link>

        <div className="signInBar">
          <p className="signInText">Sign In</p>
          <button className="signInButton">
            <ArrowRightIcom fill="#fff" width="34px" height="34px" />
          </button>
        </div>
      </form>

      {/* Google o Auth */}
      <OAuth />

      <Link to="/register" className="registerLink">
        Sign Up Instead
      </Link>
    </div>
  );
}

export default Login;
