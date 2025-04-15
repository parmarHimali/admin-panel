import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import Signup from "./components/Signup";
import SignIn from "./components/SignIn";
import { toast, ToastContainer } from "react-toastify";
import MainContainer from "./components/MainContainer";
import DashboardCards from "./components/DashboardCards";
import Interests from "./components/interests/Interests";
import UserContainer from "./components/users/UserContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getInterests,
  getSubInterests,
  setFilteredInterest,
} from "./store/interestSlice";
import UserDetails from "./components/users/UserDetails";
import PostDetails from "./components/users/PostDetails";

export const BASE_URL = "http://192.168.29.147:9090/v2";
export const getCookieValue = (name) => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : null;
};

const hexToRGBA = (hex, alpha) => {
  // Ensure hex starts with #
  if (!hex.startsWith("#")) return hex;

  // Normalize shorthand hex (#RGB to #RRGGBB)
  if (hex.length === 4) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }

  // Extract RGB values
  if (hex.length === 7) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return hex; // Return original if invalid
};
export function rgbToHex(rgbString) {
  // Extract numbers using regex
  const match = rgbString.match(/\d+/g);
  if (!match || match.length < 3) return null; // Invalid format

  // Convert to hex
  return (
    "#" +
    match
      .slice(0, 3) // Get R, G, B values
      .map((num) => Number(num).toString(16).padStart(2, "0")) // Convert & pad
      .join("")
      .toUpperCase()
  );
}
export const rgbaWithOpacity = (color, alpha = 0.5) => {
  if (typeof color !== "string") return color; // Ensure it's a string

  if (color.startsWith("#")) {
    return hexToRGBA(color, alpha);
  }
  if (color.startsWith("rgb")) {
    return color.replace("rgb", "rgba").replace(")", `, ${alpha})`);
  }

  return color; // Return original if format is unknown
};

const App = () => {
  const { subInterests } = useSelector((state) => state.interests);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInterests());
    dispatch(getSubInterests());
  }, []);

  useEffect(() => {
    dispatch(setFilteredInterest(subInterests));
  }, [subInterests]);
  return (
    <>
      <Routes>
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<MainContainer />}>
          <Route path="/" element={<DashboardCards />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/users/:pageId/:rows" element={<UserContainer />} />
          <Route path="/user-detail/:uid" element={<UserDetails />} />
          <Route path="/post-detail/:pid" element={<PostDetails />} />
        </Route>
      </Routes>
      <ToastContainer limit={3} autoClose={2000} closeOnClick={true} />
    </>
  );
};

export default App;
