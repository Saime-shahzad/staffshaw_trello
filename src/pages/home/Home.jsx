import React from "react";
import Index from "../layout/Index";
import { Header } from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import SignIn from "../signIn/SignIn";
import SignUp from "../signUp/SignUp";
import EditProfile from "../editProfile/EditProfile";

const Home = () => {
  const location=useLocation()
  return (
    <div>
      {
        location.pathname=== "/sign-in" ?
         <SignIn />  :
          location.pathname=== "/sign-up" ? <SignUp/>
          :
          location.pathname=== "/profile" ? <EditProfile/>
          :

        <>
        
      <div>
        <Header />
      </div>
      <div className="Layout-Parrent">
        <Index />
      </div>
        </>
      }
    </div>
  );
};
export default Home;
