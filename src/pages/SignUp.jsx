import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  // Importing from firebase the required functions
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
// We import the functions from the firebase along with serverTimeStamp which will allow us to set the Timestamp of the created user on the Db on submission
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config"; // Importing DB firebase the required functions from config
import { ReactComponent as ArrowRightIcom } from "../assets/assets/svg/keyboardArrowRightIcon.svg";
import { ReactComponent as visibilityIcon } from "../assets/assets/svg/visibilityIcon.svg";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nameUser: "",
    email: "",
    password: ""
  });

  const { nameUser, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  // To rectify the react two many renders limit
  const onChange2 = () => {
    // setShowPassword(!prevState);
    console.log(showPassword);
    if (showPassword === false) {
      setShowPassword(true);
    } else if (showPassword === true) {
      setShowPassword(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user; // getting user object

      // You can get the current User with auth.currentUser
      updateProfile(auth.currentUser, {
        displayName: nameUser
      });

      const formDataCopy = { ...formData }; // Create the entire form' copy in some another variable
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/"); // Redirect to the HomePage
    } catch (error) {
      toast.error("Something went wrong with Registration");
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

        <input
          type="text"
          className="nameInput"
          placeholder="Name"
          id="nameUser"
          value={nameUser}
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

        <div className="signUpBar">
          <p className="signUpText">Sign Up</p>
          <button className="signInButton">
            <ArrowRightIcom fill="#fff" width="34px" height="34px" />
          </button>
        </div>
      </form>

      {/* Google o Auth */}
      <OAuth />

      <Link to="/login" className="registerLink">
        Sign In Instead
      </Link>
    </div>
  );
}

export default SignUp;
