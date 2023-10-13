import Main from "./Main/Main.js";
import IndividualMatch from "./IndividualMatch/IndividualMatch.js";
import Leaderboards from "./Leaderboards/Leaderboards.js";
import MatchHistory from "./MatchHistory/MatchHistory.js";
import Navbar from "./Navbar/Navbar.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Components() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/matchhistory" element={<MatchHistory />} />
        <Route path="/individualmatch" element={<IndividualMatch />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
      </Routes>
    </Router>
  );
}
