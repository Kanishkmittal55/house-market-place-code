import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "./pages/explore";
import Offers from "./pages/offers";
import Category from "./pages/Category";
import Profile from "./pages/profile";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />
          {/*Creating a Private Route */}
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />{" "}
            {/*This is the outlet , which helps render child components */}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <Navbar />
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
