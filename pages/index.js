import React, { useContext } from "react";
import Index from "./auth/login";
import HomePage from "../components/Home/HomePage";
import Dashboard from "../components/Home/Dashboard";
import { GlobalContext } from "../context";
function Landing() {
  const { authState } = useContext(GlobalContext);
  console.log("authstate", authState.data);
  // return <Dashboard />;
  return authState?.data?.user?.isAdmin ? <Dashboard /> : <HomePage />;
}

export default Landing;
