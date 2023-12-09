import Parse from "parse";
import axios from "axios";
/* SERVICE FOR PARSE SERVER OPERATIONS */

const url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
const url2 = "?api_key=RGAPI-e56b40e6-664c-4752-a91d-22bac12be6d4";

// READ operation - get summoner by name
export const getByName = (textName) => {
  const Summoner = Parse.Object.extend("Summoner");
  var query = new Parse.Query(Summoner);
  query.equalTo("summonername", textName);
  return query
    .first()
    .then(function (summ) {
      if (summ) {
        console.log("found: ", summ);
        return summ;
      } else {
        return null;
      }
    })
    .catch(function (error) {
      console.log("Error: " + error.code + " " + error.message);
    });


};

// CREATE operation - new Summoner
export const createSummoner = (data) => {
  console.log("Creating: ", data.name);
  const Summoner = Parse.Object.extend("Summoner");
  const summoner = new Summoner();
  // using setter to UPDATE the object
  summoner.set("summonername", data.name);
  summoner.set("puuid", data.puuid);
  summoner.set("accountid", data.accountId);
  summoner.set("profileicon", data.profileIconId);
  return summoner.save().then((result) => {
    // returns new Summoner object
    return result;
  });
};

// READ operation - get all summoners
export const getAllSumms = () => {
  const Summoner = Parse.Object.extend("Summoner");
  const query = new Parse.Query(Summoner);
  // query.select("summonername");
  return query.find().then(function (results) {
    return results;
  });
};
