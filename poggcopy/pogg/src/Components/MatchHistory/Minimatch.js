import React from "react";
//displays match information very basic
const Minimatch = ({ m }) => {
  //console.log("m:", m);
  //console.log(m[0].info["gameid"])
  return (
    <div>
      <h1>Match Type and Won</h1>


      <ul>
        {m.map((mat) => (
          <li key={mat.info.gameId}>
            {mat.info.gameMode} 
            {console.log(mat.info.participants)}
            <button>
    <a type="button" href={mat.metadata.matchId}> Advanced Stats</a>
   </button> 
            <br />
            <ul>

          {/* <h4>Team 1 </h4> */}

          {mat.info.teams[0].win ? <h4>Team 1 - Win</h4> : <h4>Team 1 - Loss</h4>}
            {mat.info.participants.slice(mat.info.participants.length / 2).map((p) => {
            
              return <li key={p.summonerName}>
                <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/profileicon/" + p.profileIcon + ".png"} height="35" width="35" alt="Profile Icon"/>
                {p.summonerName}
                
                <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/" + p.championName + ".png"} height="35" width="35" alt={p.championName}/>
                
                {p.kills} / {p.deaths} / {p.assists}
                </li>
            })}
            <br/>
            {mat.info.teams[1].win ? <h4>Team 2 - Win</h4> : <h4>Team 2 - Loss</h4>}

            {mat.info.participants.slice(0,mat.info.participants.length / 2).map((p) => {
            
            return <li key={p.summonerName}>
                              <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/profileicon/" + p.profileIcon + ".png"} height="35" width="35" alt="Profile Icon"/>
{p.summonerName}
<img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/" + p.championName + ".png"} height="35" width="35" alt={p.championName}/>
{p.kills} / {p.deaths} / {p.assists}
</li>
          })}
          <br/>
            </ul>
          </li>
        ))}
      </ul>

      {/* {m.map((match) => {
        <div>
          <p>{match.attributes.matchid}</p>
          <br />
          <p>
            {match.attributes.gamemode} | {match.attributes.win}
          </p>
        </div>;
      })} */}
    </div>
  );
};
export default Minimatch;
