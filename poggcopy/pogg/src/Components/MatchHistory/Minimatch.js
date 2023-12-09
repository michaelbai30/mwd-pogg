import React from "react";
//displays match information very basic
//displays basic match information about the matches given
const Minimatch = ({ m }) => {

  return (
  
    <div class="container">
      
      <h1 style={{textAlign: "center",   }}>Match History</h1>


{/* one list element per match, which will contain things such as participants, winner, and a button to more details */}
      <ul style={{listStyleType: "none", margin: "0", padding: "0"}}>
        {m.map((mat) => (
          <li key={mat.info.gameId}>
            <div class="row" style={{border: "1px solid"}}>
            <h4 style={{textAlign: "center"}}>{mat.info.gameMode}</h4> 
            {console.log(mat.info.participants)}
            <button  class="text-decoration-none" style={{borderRadius: "4px", backgroundColor: "#008CBA", textDecoration: "none", color: "white", }}>
    <a type="button" style={{textDecoration: "none", color: "white"}}href={"/match/" + mat.metadata.matchId}> Advanced Stats</a>
   </button> 
            <br />
            <div class="col-md-2" style={{margin: "auto", textAlign: "center"}}> 
            {mat.info.teams[0].win ? <h4>Team 1 - Win</h4>: <h4>Team 1 - Loss</h4>}
          </div>


          <div class="col-md-4 d-flex align-items-center justify-content-center">
          {/* <ul style={{listStyleType: "none", margin: "0", padding: "0"}}> */}
          <table style={{border: "1px solid", width: "100%"}} >
                   
            
            {mat.info.participants.slice(mat.info.participants.length / 2).map((p) => {
            
               return <tr style={{border: "1px solid", textAlign: "center"}}> 
                              

                <td style={{border: "1px solid"}}><img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/profileicon/" + p.profileIcon + ".png"} height="35" width="35" alt="Profile Icon"/></td>
                <td style={{border: "1px solid"}}>{p.summonerName}</td>
                
                <td style={{border: "1px solid"}}><img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/" + p.championName + ".png"} height="35" width="35" alt={p.championName}/></td>
                
               <td style={{border: "1px solid"}}> {p.kills} / {p.deaths} / {p.assists}</td>
                {/* </li> */}
                </tr>
            })}
            </table>
                        {/* </ul> */}

            </div>

            <br/>
            <div class="col-md-4 d-flex align-items-center justify-content-center">
            {/* <ul style={{listStyleType: "none", margin: "0", padding: "0"}}> */}


            <table style={{border: "1px solid", width: "100%"}}>


            {mat.info.participants.slice(0,mat.info.participants.length / 2).map((p) => {
            
            return <tr style={{border: "1px solid", textAlign: "center"}}>
              <td style={{border: "1px solid"}}> <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/profileicon/" + p.profileIcon + ".png"} height="35" width="35" alt="Profile Icon"/></td>
<td style={{border: "1px solid"}}>{p.summonerName}</td>
<td style={{border: "1px solid"}}><img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/" + p.championName + ".png"} height="35" width="35" alt={p.championName}/></td>
<td style={{border: "1px solid"}}>{p.kills} / {p.deaths} / {p.assists}</td>
</tr>
{/* </li> */}
          })}
          </table>
          
                    {/* </ul> */}
                      </div>
                      <div class="col-md-2" style={{margin: "auto", textAlign: "center"}}> 
          {mat.info.teams[1].win ? <h4>Team 2 - Win</h4> : <h4>Team 2 - Loss</h4>}
          </div>
          <br/>
            </div>
<br/>
          </li>
        ))}
      </ul>

    </div>
  );
};
export default Minimatch;
