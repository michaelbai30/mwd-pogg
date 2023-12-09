import { Link } from "react-router-dom";
import Parse from "parse";
import { logOutUser } from "../Auth/AuthService.js";
import { useState } from "react";

const Navbar = () => {
  // Check if user is authenticated
  const isAuthenticated = Parse.User.current();

  //note: the navbar does not update until reload of the page

  return (
    <div>
      <nav>
        <ul style={{listStyleType: "none",  margin: "0",  padding: "0",  overflow: "hidden", border: "1px solid #e7e7e7",  backgroundColor: " #f3f3f3"}}>
          {isAuthenticated ? (
            <>
              <li style={{display: "block",  color: "white",  textAlign: "center",  padding: "14px 16px",  textDecoration: "none", float: "left"}}>
                <Link style={{textDecoration: "none", color: "#424242"}} to="/">Main</Link>
              </li>
              <li style={{display: "block",  color: "white",  textAlign: "center",  padding: "14px 16px",  textDecoration: "none", float: "left"}}>
                <Link  style={{textDecoration: "none", color: "#424242"}} to="/matchhistory">Match History</Link>
              </li>
              <li style={{display: "block",  color: "white",  textAlign: "center",  padding: "14px 16px",  textDecoration: "none", float: "left"}}>
                <Link  style={{textDecoration: "none", color: "#424242"}} to="/leaderboards">Leaderboards</Link>
              </li>
              <li style={{display: "block",  color: "white",  textAlign: "center",  padding: "14px 16px",  textDecoration: "none", float: "left"}}>
                <Link  style={{textDecoration: "none", color: "#424242"}} to="/userstats">User Stats</Link>
              </li>
              <li style={{display: "block",  color: "white",  textAlign: "center",  padding: "14px 16px",  textDecoration: "none", float: "left"}}>
                {" "}
                <Link  style={{textDecoration: "none"}} to="/">
                  {" "}
                  <button onClick={logOutUser}>Logout</button>{" "}
                </Link>
              </li>
              
              {/* <li>
                {" "}
                <button onClick={logOutUser}>Logout</button>{" "}
              </li> */}
            </>
          ) : (
            <>
              {/* <li>
                <Link to="./auth/login">Login</Link>
              </li>
              <li>
                <Link to="./auth/register">Register</Link>
              </li> */}
              <li style={{display: "block",  color: "white",  textAlign: "center",  padding: "14px 16px",  textDecoration: "none", float: "left"}}>
                <Link  style={{textDecoration: "none", color: "#424242"}} to="/auth">Login/Register</Link>
              </li>

              <li style={{display: "block",  color: "white",  textAlign: "center",  padding: "14px 16px",  textDecoration: "none", float: "left"}}>
                <Link  style={{textDecoration: "none", color: "#424242"}} to="/">Main</Link>
              </li>
              <li style={{display: "block",  color: "white",  textAlign: "center",  padding: "14px 16px",  textDecoration: "none", float: "left"}}>
                <Link  style={{textDecoration: "none", color: "#424242"}} to="/matchhistory">Match History</Link>
              </li>
              <li style={{display: "block",  color: "white",  textAlign: "center",  padding: "14px 16px",  textDecoration: "none", float: "left"}}>
                <Link  style={{textDecoration: "none", color: "#424242"}} to="/leaderboards">Leaderboards</Link>
              </li>
              <li style={{display: "block",  color: "white",  textAlign: "center",  padding: "14px 16px",  textDecoration: "none", float: "left"}}>
                <Link  style={{textDecoration: "none", color: "#424242"}} to="/userstats">User Stats</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
