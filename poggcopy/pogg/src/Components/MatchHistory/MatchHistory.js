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

  //this function is kinda janky for now
  const handleClick = () => {
        getSummonerByName(summonerName).then( (nm) => {
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
    // getByName(summonerName)
    //   .then((data) => setActiveSumm(data))
    //   .then(() => {
    //     getSummonerByName()
    //     // getMatchesBySumm(activeSumm).then((lis) => setMatches(lis));
    //   });

    // .then(getMatches(activeSumm.attributes.puuid))
    // .then((dat) => populateMatches(dat, activeSumm));
    //   .then((data) => {populateMatches(data, activeSumm);})
    // );
  };

  useEffect(() => {
    getAllSumms().then((tsumms) => {
      setSumms(tsumms);
      console.log(tsumms);
    });

    // getById("OXsgE8Mhjc").then((lesson) => {
    //   console.log(lesson);
    //   setLesson(lesson);
    // });
  }, []);

  return (
    <div>
      <h1>Get Match Data</h1>
      <p>Select a summoner to get match data on</p>
      <p>If not here, make sure you have looked them up on the main page</p>
      <p>
        Note: if stats don't appear, try waiting a bit and clicking again. Use
        Protossian as the user for an example
      </p>
      <label for="summoner">Summoner to Lookup:</label>

      <input
        type="text"
        name="summs"
        value={summonerName}
        onChange={(e) => {
          setSummonerName(e.target.value);
        }}
      >
        {/* {summs.map(function (sname) {
          return (
            <option key={sname.attributes.summonername}>
              {sname.attributes.summonername}
            </option>
          );
        })} */}

      </input>
      <button onClick={handleClick}>Get Match History</button>
      {matches.length > 0 && <Minimatch m={matches} />}
    </div>
  );
};

export default MatchHistory;
