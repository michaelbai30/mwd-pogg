import React from "react";
import summoners from "../../Services/summoners.json"; // Adjust the path accordingly

const SummonerList = () => {
  if (!Array.isArray(summoners)) {
    return <div>Error: Data not in expected format</div>;
  }

  return (
    <ul>
      {summoners.map((summoner) => (
        <li key={summoner.name} style={{ border: "2px black solid" }}>
          Name: {summoner.name} <br />
          Level: {summoner.level} <br />
          Queue Type: {summoner.queueType} <br />
          Wins: {summoner.wins} <br />
          Losses: {summoner.losses} <br />
          Rank: {summoner.tier} {summoner.rank} <br />
          <button type="button" id={summoner.name} name={summoner.name}>
            View Stats
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SummonerList;
