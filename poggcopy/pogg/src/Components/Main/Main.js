import React, { useEffect, useState } from "react";
import {
  getSummonerByName,
  getRankedStats,
  getRecentMatchHistory,
  getSummonersFromJson
} from "../../Services/RiotService.js";
import SummonerList from "./SummonerList.js";
import SummonerProfile from "./SummonerProfile.js";
import { getByName, createSummoner } from "../../Services/SummonerService.js";

const Main = () => {
  const [summonerName, setSummonerName] = useState("");
  const [jsonSummoners, setJsonSummoners] = useState([]);
  const [summoner, setSummoner] = useState(null);
  const [rankedStats, setRankedStats] = useState([]);
  const [matchHistory, setMatchHistory] = useState([]);

  useEffect(() => {
    getSummonersFromJson().then((data) => setJsonSummoners(data));
  }, []);

  //gets up to date summoner info, then if the summoner does not exist creates them in the db
  const handleSearch = () => {
   
    getSummonerByName(summonerName).then((data) => {
      if (data) {
        setSummoner(data);
        if (!getByName(data.name)) {
          console.log("new summoner");
          createSummoner(data);
        }
        console.log(data);
        return null;
      }
      return null;
    });


  };

  return (
    <div>
      <h1>Find Summoner</h1>
      <p>Enter a summoner name here to get data!</p>
      <input
        type="text"
        placeholder="Enter Summoner Name"
        value={summonerName}
        onChange={(e) => setSummonerName(e.target.value)}
      />
      <select name="region" id="region">
        <option value="NA">North America</option>
        <option value="EW">Europe West</option>
        <option value="EN">Europe Nordic/East</option>
        <option value="OC">Oceania</option>
        <option value="RU">Russia</option>
        <option value="TK">Turkey</option>
        <option value="BR">Brazil</option>
        <option value="LN">Latin America North</option>
        <option value="LS">Latin America South</option>
        <option value="JP">Japan</option>
      </select>
      <button onClick={handleSearch}>Search</button>

      <SummonerProfile
        summoner={summoner}
        rankedStats={rankedStats}
        matchHistory={matchHistory}
      />

      <h2>Summoners Queried</h2>
      <SummonerList summs={jsonSummoners} />
    </div>
  );
};

export default Main;
