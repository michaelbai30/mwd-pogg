// This file serves as the "custom service for data methods"
import axios from "axios";
// i need to encrypt this. no good hardcoding it.
// NOTE: Full API key obtained
const API_KEY = "RGAPI-e56b40e6-664c-4752-a91d-22bac12be6d4";

// fetches data from json explicitly
export const getSummonersFromJson = () => {
  return axios
    .get("./Services/summoners.json")
    .then((response) => response.data)
    .catch((error) =>
      console.error("Error fetching summoners from JSON:", error)
    );
};

export const getSummonerByName = (name) => {
  // Abstraction using axios
  return (
    axios
      .get(
        `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`
      )
      .then((response) => response.data)
      // Error handling if summoner name not found
      .catch((error) => {
        alert("Error fetching summoner data");
        return null;
      })
  );
};

//get recent match history by account ID
//TODO: might have to edit, see https://codepull.com/api/getting-league-of-legends-matches-stats-from-the-riot-api/
export const getRecentMatchHistory = (accountId) => {
  //  return axios
  //   .get(
  //     `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=10&api_key=${API_KEY}`
  //   )
  //  .then((response) => response.data)
  // .catch((error) => console.error("Error fetching match history:", error));
};

export const getRankedStats = (summonerId) => {
  return axios
    .get(
      `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching ranked stats:", error);
    });
};
