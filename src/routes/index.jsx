import React from "react";
import { Routes, Route  } from "react-router-dom";
import { publicRoutesList } from "./routes";

const AppRoutes = () => {
  return (
    
    <Routes>
      {publicRoutesList.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
     
    
  );
};

export default AppRoutes;
