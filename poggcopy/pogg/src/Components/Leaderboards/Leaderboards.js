import React, { useState, useEffect } from "react";
import './Leaderboards.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Leaderboards = () => {
  const [summoners, setSummoners] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(""); 
  const [selectedQueue, setSelectedQueue] = useState(""); 
  const [loading, setLoading] = useState(false);

  const apiKey = "RGAPI-e56b40e6-664c-4752-a91d-22bac12be6d4"; 

  useEffect(() => {
    // Only fetch leaderboards if both region and queue are selected
    if (selectedRegion && selectedQueue) {
      fetchLeaderboards();
    }
  }, [selectedRegion, selectedQueue]);

  const fetchSummonerDetails = async (summonerId, region) => {
    try {
      const response = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch summoner details: ${error}`);
      return null;
    }
  };

  const fetchSummonerRank = async (summonerId, region) => {
    try {
      const rankResponse = await fetch(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`);
      if (!rankResponse.ok) {
        throw new Error(`HTTP error! status: ${rankResponse.status}`);
      }
      const rankData = await rankResponse.json();
      const highestRank = rankData.sort((a, b) => b.leaguePoints - a.leaguePoints)[0];
      return highestRank ? {
        rank: `${highestRank.tier} ${highestRank.rank}`,
        wins: highestRank.wins,
        losses: highestRank.losses,
        winRate: ((highestRank.wins / (highestRank.wins + highestRank.losses)) * 100).toFixed(2)
      } : { rank: 'Unranked', wins: 0, losses: 0, winRate: '0.00' };
    } catch (error) {
      console.error(`Failed to fetch summoner rank: ${error}`);
      return { rank: 'Unranked', wins: 0, losses: 0, winRate: '0.00' };
    }
  };

  const fetchLeaderboards = async () => {
    setLoading(true);
    try {
      const queueType = selectedQueue === "Ranked Solo" ? "RANKED_SOLO_5x5" : "RANKED_FLEX_SR";
      const response = await fetch(`https://${selectedRegion}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/${queueType}?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const topSummoners = data.entries.sort((a, b) => b.leaguePoints - a.leaguePoints).slice(0, 20);

      const detailedSummoners = await Promise.all(topSummoners.map(async (summoner) => {
        const summonerDetails = await fetchSummonerDetails(summoner.summonerId, selectedRegion);
        if (!summonerDetails) {
          return null;
        }
        const rankDetails = await fetchSummonerRank(summoner.summonerId, selectedRegion);
        return {
          ...summoner,
          summonerLevel: summonerDetails.summonerLevel,
          profileIconId: summonerDetails.profileIconId,
          rank: rankDetails.rank,
          wins: rankDetails.wins,
          losses: rankDetails.losses,
          winRate: rankDetails.winRate
        };
      }));

      setSummoners(detailedSummoners.filter(Boolean));
    } catch (error) {
      console.error("Failed to fetch leaderboards:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Leaderboards</h1>
  
      <div className="d-flex justify-content-center mb-3">
        <select 
          className="form-select me-2"
          value={selectedRegion} 
          onChange={(e) => setSelectedRegion(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="">Select Region</option>
          <option value="BR1">BR</option>
          <option value="EUN1">EUN</option>
          <option value="EUW1">EUW</option>
          <option value="LA1">LA1</option>
          <option value="LA2">LA2</option>
          <option value="NA1">NA</option>
          <option value="RU">RU</option>
          <option value="TR1">TR</option>
          <option value="KR">KR</option>
        </select>
  
        <select 
          className="form-select"
          value={selectedQueue} 
          onChange={(e) => setSelectedQueue(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="">Select Queue Type</option>
          <option value="Ranked Solo">Ranked Solo</option>
          <option value="Ranked Flex">Ranked Flex</option>
        </select>
      </div>
  
      <button 
        className={`btn ${loading ? 'btn-secondary' : 'btn-primary'}`}
        onClick={fetchLeaderboards} 
        disabled={loading || !selectedRegion || !selectedQueue}
      >
        {loading ? 'Loading...' : 'Load Top Summoners'}
      </button>
  
      {summoners.length > 0 && (
        <div className="leaderboard-grid mt-4">
          {summoners.map((summoner, index) => (
            <div key={index} className="leaderboard-row d-flex align-items-center p-2">
              <div className="rank me-3">{index + 1}</div>
              <div className="profile-icon me-3">
                <img 
                  src={`http://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${summoner.profileIconId}.png`}
                  alt="Summoner Icon"
                  className="rounded-circle"
                />
              </div>
              <div className="summoner-info">
                <p><strong>{summoner.summonerName}</strong> - Level: {summoner.summonerLevel}</p>
                <div>LP: {summoner.leaguePoints}</div>
                <div>Rank: {summoner.rank}</div>
                <div>Wins: {summoner.wins}</div>
                <div>Losses: {summoner.losses}</div>
                <div>Win Rate: {summoner.winRate}%</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboards;

