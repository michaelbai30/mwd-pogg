import React from "react";

const SummonerProfile = ({ summoner, rankedStats, matchHistory }) => {
  return (
    <>
      {summoner && (
        <div>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/13.20.1/img/profileicon/${summoner.profileIconId}.png`}
            alt={summoner.name}
          />
          <br />
          Name: {summoner.name} <br />
          Level: {summoner.summonerLevel}
        </div>
      )}

      {rankedStats.length > 0 && (
        <div>
          <h2>Ranked Stats</h2>
          <ul>
            <label htmlFor="rank">Queue: </label>
            <select name="rank" id="rank">
              <option>Solo/Duo</option>
              <option>Flex</option>
            </select>

            {rankedStats.map((stat) => (
              <li key={stat.queueType}>
                Queue Type: {stat.queueType} <br />
                Wins: {stat.wins} <br />
                Losses: {stat.losses} <br />
                Rank: {stat.tier} {stat.rank}
              </li>
            ))}
          </ul>
          <button type="submit">See More Ranked Data</button>
        </div>
      )}

      {matchHistory.length > 0 && (
        <div>
          <h2>Recent Matches</h2>
          <ul>
            {matchHistory.map((match) => (
              <li key={match.gameId}>
                Game Mode: {match.queue} <br />
                Champion ID: {match.champion}
                <button type="button">View Match Statistics</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SummonerProfile;
