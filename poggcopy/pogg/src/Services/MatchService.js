import Parse from "parse";
import axios from "axios";

export const getMatches = (puuid) => {
  // Abstraction using axios
  return (
    axios
      .get(
        `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=RGAPI-e56b40e6-664c-4752-a91d-22bac12be6d4`
      )
      .then((response) => response.data)
      // Error handling if summoner name not found
      .catch((error) => {
        //alert("Error fetching match data");
        return false;
      })
  );
};

export const populateMatches = (matchList, activeSumm) => {
  for (var i in matchList) {
    singleMatch(matchList[i]).then((matchdata) =>
      buildMatch(matchdata, activeSumm)
    );
  }
};

export const singleMatch = (matchId) => {
  return (
    axios
      .get(
        `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=RGAPI-e56b40e6-664c-4752-a91d-22bac12be6d4`
      )
      .then((response) => response.data)
      // Error handling if summoner name not found
      .catch((error) => {
        //alert("Error fetching match data");
        return false;
      })
  );
};

export const buildMatch = (matchdata, activeSumm) => {
  var win = false;
  for (var i in matchdata.info.participants) {
    if (
      matchdata.info.participants[i].summonerName.trim() ===
      activeSumm.attributes.summonername.trim()
    ) {
      win = matchdata.info.participants[i].win;
    }
  }

  const Match = Parse.Object.extend("Match");
  const match = new Match();
  // using setter to UPDATE the object
  match.set("matchid", matchdata.metadata.matchId);
  match.set("gamemode", matchdata.info.gameMode);
  match.set("summonertomatch", activeSumm);
  match.set("win", win);
  notInDB(matchdata.metadata.matchId, activeSumm).then((res) => {
    if (res) {
      return match.save();
    }
  });
};

//check if already in DB before adding
export const notInDB = (mid, summ) => {
  const Match = Parse.Object.extend("Match");
  var query = new Parse.Query(Match);
  query.equalTo("matchid", mid);
  query.equalTo("summonertomatch", summ);
  return query.first().then(function (summ) {
    if (summ) {
      console.log("found in db");
      return false;
    } else {
      console.log("not in db");
      return true;
    }
  });
};

export const getMatchesBySumm = (summ) => {
  const Match = Parse.Object.extend("Match");
  const query = new Parse.Query(Match);
  query.equalTo("summonertomatch", summ);
  return query.find().then((results) => {
    // returns array of Match objects
    console.log(results);
    return results;
  });
};

