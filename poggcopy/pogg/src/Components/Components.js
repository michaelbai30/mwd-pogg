import Main from "./Main/Main.js";
import IndividualMatch from "./IndividualMatch/IndividualMatch.js";
import Leaderboards from "./Leaderboards/Leaderboards.js";
import MatchHistory from "./MatchHistory/MatchHistory.js";
import Navbar from "./Navbar/Navbar.js";
import Home from "./Home/Home.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.js";
import AuthModule from "./Auth/Auth.js";
import AuthRegister from "./Auth/AuthRegister";
import AuthLogin from "./Auth/AuthLogin";
import Match from "./Match/Match.js";
import UserStats from "./UserStats/UserStats.js";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

export default function Components() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthModule />} />
        <Route path="/auth/register" element={<AuthRegister />} />
        <Route path="/auth/login" element={<AuthLogin />} />
   
        <Route
          path="/matchhistory"
          element={
            <ProtectedRoute path="/matchhistory" element={MatchHistory} />
          }
        />
        <Route
          path="/leaderboards"
          element={
            <ProtectedRoute path="/leaderboards" element={Leaderboards} />
          }
        />
        <Route
          path="/userstats"
          element={<ProtectedRoute path="/userstats" element={UserStats} />}
        />
        <Route
          path="/match/:matchid"
          element={
            <ProtectedRoute path="/match" element={Match} />
          }
          />
        <Route path="*" element={<Navigate to="//" replace />} />
      </Routes>
    </Router>
  );
}
