import React, { useEffect, useState } from "react";
import Index from "../layout/Index";
import { Header } from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import SignIn from "../signIn/SignIn";
import SignUp from "../signUp/SignUp";
import EditProfile from "../editProfile/EditProfile";
import { useRoutFunction } from "../../assets/usefulFunctions/UseFullFunctions";

const Home = () => {
  const [isToken, setIsToken] = useState(false);
  const location = useLocation();
  const routeTo = useRoutFunction();
  const token=localStorage.getItem("token")
  useEffect(() => {
    if (token && token !== undefined) {
      setIsToken(true);
    } 
    else if(location.pathname === "/sign-up"){
      routeTo("/sign-up")
    }
    else{
      routeTo("/sign-in")

    }
  }, [isToken, routeTo , location.pathname , token ]);
 
  
  return (
    <div>
      {location.pathname === "/sign-in" && !isToken ? (
        <SignIn />
      ) : location.pathname === "/sign-up" && !isToken ? (
        <SignUp />
      ) : location.pathname === "/profile" ? (
        <EditProfile />
      ) : (
        isToken && (
          <>
            <div>
              <Header />
            </div>
            <div className="Layout-Parrent">
              <Index />
            </div>
          </>
        )
      )}
    </div>
  );
};
export default Home;
