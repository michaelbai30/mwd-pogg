import React, { useState } from "react";
import { getSummonerByName, getRankedStats } from "../../Services/RiotService";
import { getMatches, singleMatch } from "../../Services/MatchService";
import './UserStats.css';

const UserStats = () => {
  const [summonerName, setSummonerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [rankedStats, setRankedStats] = useState(null);
  const getKDARatioColor = (kda) => {
    if (kda >= 0 && kda <= 1.50) return 'grey';
    if (kda >= 1.51 && kda <= 2.50) return 'green';
    if (kda >= 2.51 && kda <= 3.50) return 'lightblue';
    if (kda > 3.50) return 'red';
    return 'black';
  };
  const [averageStats, setAverageStats] = useState({
    kills: 0,
    deaths: 0,
    assists: 0,
    goldEarned: 0,
    cs: 0,
  });
  const [topChampions, setTopChampions] = useState([]);

  async function fetchChampionData() {
    try {
      const url = "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion.json";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Failed to fetch champion data:", error);
      return {};
    }
  }

  const fetchUserStats = async () => {
    setLoading(true);
    try {
      const summonerData = await getSummonerByName(summonerName);
      if (summonerData && summonerData.puuid) {
        const matchIds = await getMatches(summonerData.puuid);
        const matchDetails = await Promise.all(matchIds.map(matchId => singleMatch(matchId)));
        const validMatches = matchDetails.filter(match => match);

        let totalKills = 0, totalDeaths = 0, totalAssists = 0, totalGold = 0, totalCS = 0;

        validMatches.forEach(match => {
          const participant = match.info.participants.find(p => p.summonerName === summonerName);
          if (participant) {
            totalKills += participant.kills;
            totalDeaths += participant.deaths;
            totalAssists += participant.assists;
            totalGold += participant.goldEarned;
            totalCS += participant.totalMinionsKilled;
          }
        });

        setAverageStats({
          kills: totalKills / validMatches.length,
          deaths: totalDeaths / validMatches.length,
          assists: totalAssists / validMatches.length,
          KDA: (totalKills + totalAssists) / totalDeaths,
          goldEarned: totalGold / validMatches.length,
          cs: totalCS / validMatches.length,
        });

        // fetch ranked stats
        const rankedData = await getRankedStats(summonerData.id);
        const soloRankedStats = rankedData.find(d => d.queueType === 'RANKED_SOLO_5x5');

        if (soloRankedStats) {
          setRankedStats(soloRankedStats);
        } else {
          // reset ranked stats if no ranked data is found
          setRankedStats({
            tier: "Unranked",
            rank: "",
            leaguePoints: 0,
            wins: 0,
            losses: 0
          });
        }

        // logic for top 3 champions
        const championCount = {};
        validMatches.forEach(match => {
          match.info.participants.forEach(participant => {
            if (participant.summonerName === summonerName) {
              championCount[participant.championName] = (championCount[participant.championName] || 0) + 1;
            }
          });
        });

        const sortedChampions = Object.entries(championCount)
                                      .sort((a, b) => b[1] - a[1])
                                      .slice(0, 3);
        
        const championData = await fetchChampionData();
        const topChamps = sortedChampions.map(([name]) => ({
          name,
          image: `http://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${championData[name].image.full}`
        }));

        setTopChampions(topChamps);
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 user-stats-title">User Stats</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={summonerName}
              onChange={(e) => setSummonerName(e.target.value)}
              placeholder="Enter LoL Account Name"
              aria-label="Summoner's name"
              aria-describedby="button-addon2"
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={fetchUserStats}
              disabled={loading}
            >
              {loading ? "Loading..." : "Get User Stats"}
            </button>
          </div>
        </div>
      </div>
  
      {averageStats.kills > 0 && (
        <div className="card mb-4">
          <div className="card-header text-center">
            Average Stats Over Last Matches
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="stat-label kills-label">Kills:</span> {averageStats.kills.toFixed(2)}
            </li>
            <li className="list-group-item">
              <span className="stat-label deaths-label">Deaths:</span> {averageStats.deaths.toFixed(2)}
            </li>
            <li className="list-group-item">
              <span className="stat-label assists-label">Assists:</span> {averageStats.assists.toFixed(2)}
            </li>
            <li className="list-group-item">
              <span className="stat-label kda-label">KDA Ratio:</span> 
              <span className={`badge ms-2 kda-${getKDARatioColor(averageStats.KDA)}`}>
                {averageStats.KDA.toFixed(2)}
              </span>
            </li>
            <li className="list-group-item">
              <span className="stat-label gold-label">Gold Earned:</span> {averageStats.goldEarned.toFixed(2)}
            </li>
            <li className="list-group-item">
              <span className="stat-label cs-label">Average CS:</span> {averageStats.cs.toFixed(2)}
            </li>
          </ul>
        </div>
      )}
  
      {rankedStats && (
        <div className="card mb-4">
          <div className="card-header text-center">
            Ranked Solo Stats
          </div>
          <div className="card-body">
            <p className="card-text">
              <span className="stat-label rank-label">Rank:</span> {rankedStats.tier} {rankedStats.rank}
            </p>
            <p className="card-text">
              <span className="stat-label lp-label">LP:</span> {rankedStats.leaguePoints}
            </p>
            <p className="card-text">
              <span className="stat-label wins-label">Wins:</span> {rankedStats.wins}
            </p>
            <p className="card-text">
              <span className="stat-label losses-label">Losses:</span> {rankedStats.losses}
            </p>
            <p className="card-text">
              <span className="stat-label winrate-label">Win Rate:</span> 
              {((rankedStats.wins / (rankedStats.wins + rankedStats.losses)) * 100).toFixed(2) + "%"}
            </p>
          </div>
        </div>
      )}
  
      {topChampions.length > 0 && (
        <div className="card">
          <div className="card-header text-center">
            Top Played Champions
          </div>
          <div className="card-body">
            <div className="row">
              {topChampions.map((champion, index) => (
                <div key={index} className="col-md-4 text-center">
                  <img src={champion.image} alt={champion.name} className="img-thumbnail" />
                  <p>{champion.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default UserStats;
