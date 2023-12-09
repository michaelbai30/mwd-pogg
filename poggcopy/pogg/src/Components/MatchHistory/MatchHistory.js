import React, { useEffect, useState } from "react";
import { getAllSumms, getByName } from "../../Services/SummonerService.js";
import {getSummonerByName} from "../../Services/RiotService.js";
import {
  getMatches,
  populateMatches,
  getMatchesBySumm,
  singleMatch
} from "../../Services/MatchService.js";
import Minimatch from "./Minimatch.js";

const MatchHistory = () => {
  const [summonerName, setSummonerName] = useState("");
  const [summs, setSumms] = useState([]);
  const [activeSumm, setActiveSumm] = useState("");
  const [matches, setMatches] = useState([]);
  const [activeMatch, setMat] = useState();

  //function for button click; 
  const handleClick = () => {
        getSummonerByName(summonerName).then( (nm) => {
          if (!nm) return null;
          var puuid = nm.puuid;
          console.log(puuid);
          var sMatches = getMatches(puuid).then( (sMatches) => {
            var matchesInfo = Promise.all(sMatches.map(singleMatch));
            
            return matchesInfo
          }).then ((minfo) => {
            console.log(minfo);
            setMatches(minfo);
          })
        })
   
  };

  useEffect(() => {
    getAllSumms().then((tsumms) => {
      setSumms(tsumms);
      console.log(tsumms);
    });

   
  }, []);

  return (
    <div style={{textAlign: "center"}}>
      <h1>Get Match Data</h1>
      <p>Enter the name of a summoner to obtain recent match data from them!</p>
      <p>(Try bobjenkins1, a top player)</p>
     
      {/* <label for="summoner">Summoner to Lookup:</label> */}

      <input
        type="text"
        name="summs"
        value={summonerName}
        onChange={(e) => {
          setSummonerName(e.target.value);
        }}
        style={{width: "75%", border: "3px groove #008CBA", borderRadius: "4px"}}
        
      >
     

      </input>
      <br/>        <br/>

      <button onClick={handleClick} style={{borderRadius: "4px", backgroundColor: "#008CBA", textDecoration: "none", color: "white", }}>Get Match History</button>
      {matches.length > 0 && <Minimatch m={matches} />}
    </div>
  );
};

export default MatchHistory;
