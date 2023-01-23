import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcom } from "../assets/assets/svg/keyboardArrowRightIcon.svg";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email Was sent");
    } catch (error) {
      toast.error("Could Not send reset email");
    }
  };
  return (
    <div className="pageContainer">
      <header className="pageHeader">Forgot Password</header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <Link className="forgotPasswordLink" to="/login">
            Sign In
          </Link>

          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
              <ArrowRightIcom fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
