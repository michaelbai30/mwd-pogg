import React from "react";
import Parse from "parse";
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import Main from "./Components/Main/Main.js";
// import IndividualMatch from "./Components/IndividualMatch/IndividualMatch.js";
// import Leaderboards from "./Components/Leaderboards/Leaderboards.js";
// import MatchHistory from "./Components/MatchHistory/MatchHistory.js";
import * as Env from "./Environment.js";
import Components from "./Components/Components";

// Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
// Parse.serverURL = Env.SERVER_URL;
Parse.initialize(
  "CwvJHs5Pu9asw9Aecsqcsn34A9B1zNLpVhqTmrtb",
  "QcO6fbkFfnc4OhXKEVwKhIkIVwwquHP20Q1vZuBV"
);
Parse.serverURL = "https://parseapi.back4app.com";

export default function App() {
  return <Components />;
}
