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
        <ul>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/">Main</Link>
              </li>
              <li>
                <Link to="/matchhistory">Match History</Link>
              </li>
              <li>
                <Link to="/leaderboards">Leaderboards</Link>
              </li>
              <li>
                {" "}
                <Link to="/">
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
              <li>
                <Link to="/auth">Login/Register</Link>
              </li>

              <li>
                <Link to="/">Main</Link>
              </li>
              <li>
                <Link to="/matchhistory">Match History</Link>
              </li>
              <li>
                <Link to="/leaderboards">Leaderboards</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
