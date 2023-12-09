import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../Auth/AuthService";

//mostly from class
//used to limit access if not logged in
// You can pass props using the spread operator to throw them on an object if there are too many to break out
const ProtectedRoute = ({ element: Component, ...rest }) => {
  console.log("element: ", Component);

  const navigate = useNavigate();
  const goBackHandler = () => {
    console.log("hello");
    navigate("/");
  };

  useEffect(() => {
    if (!checkUser()) {
      navigate("/auth");
    }
  });
  if (checkUser()) {
    // if (0) {
    return <Component />;
  } else {
    return (
      //  This will simply redirect upon loading; means they are not logged in
      <p>redirect</p>

    );
  }
};

export default ProtectedRoute;
