import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../firebase.config";
import { updateDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import arrowRight from "../assets/assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/assets/svg/homeIcon.svg";
function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false); // TO UPDATE THE USER DETAILS
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name
        });

        // Update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          nameUser: name
        });
      }
    } catch (error) {
      toast.error("Could not Update profile details");
    }
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const { name, email } = formData;

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>

        <button type="button" className="logOut" onClick={onLogout}>
          LogOut
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          {/* Now this is the change button which is simply using conditional rendering*/}
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit(); // if changeDetails is true then invoke the onSubmit() function
              setChangeDetails((prevState) => !prevState); //
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>

        {/* This is the profile card where the profile details will be shown for updation*/}
        <div className="profileCard">
          <form action="">
            {/* The first Input for name*/}
            <input
              type="text"
              id="name"
              className={!changeDetails ? "profileName" : "profileNameActive"} // Changing the CSS make the solid input bar go grey and allow the text to change
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />

            {/* The Second Input for changing the email*/}
            <input
              type="text"
              id="email"
              className={!changeDetails ? "profileEmail" : "profileEmailActive"}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>

        <Link to="/create-listing" className="createListing">
          <img src={homeIcon} alt="home" />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt="arrow-right" />
        </Link>
      </main>
    </div>
  );
}

export default Profile;
