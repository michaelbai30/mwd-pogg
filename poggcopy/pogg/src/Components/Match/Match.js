// import React from "react";
import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import Middle from "./Middle.js";

import { Link, useParams } from "react-router-dom";
import {singleMatch} from "../../Services/MatchService.js";


 const Match = () => {
    const navigate = useNavigate();

    const [match, setMatch] = useState([]);
    const [page, setPage] = useState(1);


    const {matchid} = useParams();

    useEffect(() => {
        singleMatch(matchid).then((m) => {
            setMatch(m);
        })
        //Runs only on the first render
      }, [matchid]);


    

    // var matc;
    //  var mat = singleMatch(matchid)
    //  .then( (m) => {
    //     //matc = m;
    //     return m;
    // })

    
    console.log(match);
    
    const btnHandler = () => {
      console.log("hi");
      //setPage(1);
    }  
    
 return (
<div class="container">
{/* {console.log(match)}
{console.log(page)} */}

    {(match != false) ? 
    <div class="row">
       <button onClick={() => {setPage({ page: 1 }); console.log(page)}}>Damage Chart</button> 
       <button onClick={() => {setPage({ page: 2 }); console.log(page)}}>Economy Chart</button> 



    {/* <p>{match.info.gameId}</p> */}
    <div class="col-md-4">
    {match.info.teams[0].win ? <h4>Team 1 - Win</h4> : <h4>Team 1 - Loss</h4>}
    <ul>
    {match.info.participants.slice(match.info.participants.length / 2).map((p) => {
            
            return <li key={p.summonerName}>
              <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/profileicon/" + p.profileIcon + ".png"} height="35" width="35" alt="Profile Icon"/>
              {p.summonerName}
              
              <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/" + p.championName + ".png"} height="35" width="35" alt={p.championName}/>
              
              {p.kills} / {p.deaths} / {p.assists} | {p.totalMinionsKilled}
              <br/>
              {(p.item0 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item0 + ".png"} height="25" width="25" alt={p.item0}/>}
              {(p.item1 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item1 + ".png"} height="25" width="25" alt={p.item1}/>}
              {(p.item2 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item2 + ".png"} height="25" width="25" alt={p.item2}/>}
              {(p.item3 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item3 + ".png"} height="25" width="25" alt={p.item3}/>}
              {(p.item4 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item4 + ".png"} height="25" width="25" alt={p.item4}/>}
              {(p.item5 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item5 + ".png"} height="25" width="25" alt={p.item5}/>}
              {(p.item6 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item6 + ".png"} height="25" width="25" alt={p.item6}/>}

              </li>
          })}
          </ul>
          </div>
<br/>

<div class="col-md-4">
{page && <Middle page={page} match={match}/>}
</div>
{/* {(page == 0) && <p>hello0</p>}
{(page == 1) && <p>hello1</p>}
{(page == 2) && <p>hello2</p>}
{(page == 3) && <p>hello3</p>} */}



<div class="col-md-4">
{match.info.teams[1].win ? <h4>Team 2 - Win</h4> : <h4>Team 2 - Loss</h4>}
<ul>
{match.info.participants.slice(0,match.info.participants.length / 2).map((p) => {
            
            return <li key={p.summonerName}>
                              <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/profileicon/" + p.profileIcon + ".png"} height="35" width="35" alt="Profile Icon"/>
{p.summonerName}
<img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/" + p.championName + ".png"} height="35" width="35" alt={p.championName}/>
{p.kills} / {p.deaths} / {p.assists} | {p.totalMinionsKilled}

<br/>
{(p.item0 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item0 + ".png"} height="25" width="25" alt={p.item0}/>}
              {(p.item1 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item1 + ".png"} height="25" width="25" alt={p.item1}/>}
              {(p.item2 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item2 + ".png"} height="25" width="25" alt={p.item2}/>}
              {(p.item3 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item3 + ".png"} height="25" width="25" alt={p.item3}/>}
              {(p.item4 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item4 + ".png"} height="25" width="25" alt={p.item4}/>}
              {(p.item5 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item5 + ".png"} height="25" width="25" alt={p.item5}/>}
              {(p.item6 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item6 + ".png"} height="25" width="25" alt={p.item6}/>}
</li>
          })}

          
    </ul>
    </div>

    </div>
    : navigate("/")} 
    

    </div>

   
 )
}

export default Match;