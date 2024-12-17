import React from "react";
// import Home from "../pages/home/Home";
import NewBoard from "../pages/newboard/NewBoard";
import { CardsSection } from "../components/cardsSection/CardsSection";
import { Users } from "../pages/users/Users";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";
import EditProfile from "../pages/editProfile/EditProfile";
import { AllBoards } from "../pages/home/allBoards/AllBoards";




const publicRoutesList = [
  // { path: "/", element: <Home /> },
  { path: "/", element: <CardsSection /> },
  { path: "/add-board", element: <NewBoard /> },
  { path: "/users", element: <Users /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/profile", element: <EditProfile /> },
  { path: "/board", element: <AllBoards /> },
 
];

const privateRoutesList = [
  // {path:"/*", element : <Home />}
];

export { publicRoutesList, privateRoutesList };
