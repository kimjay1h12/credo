import React, { useContext } from "react";
import Index from "./auth/login";
import HomePage from "../components/Home/HomePage";
import Dashboard from "../components/Home/Dashboard";
function Landing() {
  return <Dashboard />;
  // return <Index />;
}

export default Landing;
