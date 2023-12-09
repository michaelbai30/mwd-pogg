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

    //obtains match information from the match id and puts that into the state variable
    useEffect(() => {
        singleMatch(matchid).then((m) => {
            setMatch(m);
        })
        //Runs only on the first render
      }, [matchid]);
    
    console.log(match);
    
    const btnHandler = () => {
      console.log("hi");
      //setPage(1);
    }  
    
//     var gameDate = new Date(match.info.gameStartTimestamp	);
// gameDate = gameDate.toLocaleDateString("en-US")
const getthedate = (vale) => {
  var v = new Date(vale);
  return v.toLocaleDateString("en-US") ;
}

 return (
<div class="container">
  <br/>
{/* {console.log(match)}
{console.log(page)} */}

{/* if there is a match, display the participants, stats, and additional information */}
    {(match != false) ? 
    <div class="row" style={{border: "1px solid"}}>
          <div style={{textAlign: "center"}}>
            {match.info.teams[0].win ? <h1>Team 1 Wins</h1> : <h1>Team 2 Wins</h1>}
            <h2>{ getthedate(match.info.gameStartTimestamp)} | {match.info.gameMode} </h2> 
          </div>

{/* buttons to change the graphs displayed */}
       <button class="col-md-6" onClick={() => {setPage({ page: 1 }); console.log(page)}} style={{borderRadius: "4px", backgroundColor: "#008CBA", textDecoration: "none", color: "white", }}>Team Damage</button> 
       <button class="col-md-6" onClick={() => {setPage({ page: 3 }); console.log(page)}} style={{borderRadius: "4px", backgroundColor: "#008CBA", textDecoration: "none", color: "white", }}>Individual Damage</button> 

       <button class="col-md-6" onClick={() => {setPage({ page: 2 }); console.log(page)}} style={{borderRadius: "4px", backgroundColor: "#008CBA", textDecoration: "none", color: "white", }}>Team Economy</button> 
       <button class="col-md-6" onClick={() => {setPage({ page: 4 }); console.log(page)}} style={{borderRadius: "4px", backgroundColor: "#008CBA", textDecoration: "none", color: "white", }}>Individual Economy</button> 



    {/* <p>{match.info.gameId}</p> */}
    <div class="col-md-4 d-flex align-items-center justify-content-center">

    {/* {match.info.teams[0].win ? <h4>Team 1 - Win</h4> : <h4>Team 1 - Loss</h4>} */}
    {/* <ul> */}
    <table style={{border: "1px solid", width: "100%", height: "100%"}} >
      <tr style={{border: "1px solid", textAlign: "center", fontWeight: "bold"}}>
        <td style={{border: "1px solid"}}>ID</td>
        <td style={{border: "1px solid"}}>Name</td>
        <td style={{border: "1px solid"}}>Champ</td>
        <td style={{border: "1px solid"}}>K</td>
        <td style={{border: "1px solid"}}>D</td>
        <td style={{border: "1px solid"}}>A</td>
        <td style={{border: "1px solid"}}>CS</td>
        <td style={{border: "1px solid"}}>Items</td>
      </tr>

    {match.info.participants.slice(match.info.participants.length / 2).map((p) => {
            
            return                <tr style={{border: "1px solid", textAlign: "center"}}> 

            {/* // <li key={p.summonerName}> */}
            <td style={{border: "1px solid"}}> <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/profileicon/" + p.profileIcon + ".png"} height="35" width="35" alt="Profile Icon"/> </td>
            <td style={{border: "1px solid"}}> {p.summonerName} </td>
              
            <td style={{border: "1px solid"}}> <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/" + p.championName + ".png"} height="35" width="35" alt={p.championName}/> </td>
              
            <td style={{border: "1px solid"}}>  {p.kills}  </td>
            <td style={{border: "1px solid"}}>{p.deaths} </td>
            <td style={{border: "1px solid"}}> {p.assists} </td>
            <td style={{border: "1px solid"}}> {p.totalMinionsKilled} </td> 
            
              <td style={{border: "1px solid"}}>     {(p.item0 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item0 + ".png"} height="25" width="25" alt={p.item0}/>}
              {(p.item1 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item1 + ".png"} height="25" width="25" alt={p.item1}/>}
              {(p.item2 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item2 + ".png"} height="25" width="25" alt={p.item2}/>}
              {(p.item3 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item3 + ".png"} height="25" width="25" alt={p.item3}/>}
              {(p.item4 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item4 + ".png"} height="25" width="25" alt={p.item4}/>}
              {(p.item5 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item5 + ".png"} height="25" width="25" alt={p.item5}/>}
              {(p.item6 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item6 + ".png"} height="25" width="25" alt={p.item6}/>} </td>

        </tr>
              {/* </li> */}
          })}
          </table>
          {/* </ul> */}
          </div>
<br/>

<div class="col-md-4 d-flex align-items-center justify-content-center">
  {/* this is where the component for the charts is placed */}
{page && <Middle page={page} match={match}/>}
</div>
{/* {(page == 0) && <p>hello0</p>}
{(page == 1) && <p>hello1</p>}
{(page == 2) && <p>hello2</p>}
{(page == 3) && <p>hello3</p>} */}

<div class="col-md-4 d-flex align-items-center justify-content-center">

    <table style={{border: "1px solid", width: "100%", height: "100%"}} >
    <tr style={{border: "1px solid", textAlign: "center", fontWeight: "bold"}}>
        <td style={{border: "1px solid"}}>ID</td>
        <td style={{border: "1px solid"}}>Name</td>
        <td style={{border: "1px solid"}}>Champ</td>
        <td style={{border: "1px solid"}}>K</td>
        <td style={{border: "1px solid"}}>D</td>
        <td style={{border: "1px solid"}}>A</td>
        <td style={{border: "1px solid"}}>CS</td>
        <td style={{border: "1px solid"}}>Items</td>
      </tr>

{match.info.participants.slice(0, match.info.participants.length / 2).map((p) => {
        
        return                <tr style={{border: "1px solid", textAlign: "center"}}> 

        {/* // <li key={p.summonerName}> */}
        <td style={{border: "1px solid"}}> <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/profileicon/" + p.profileIcon + ".png"} height="35" width="35" alt="Profile Icon"/> </td>
        <td style={{border: "1px solid"}}> {p.summonerName} </td>
          
        <td style={{border: "1px solid"}}> <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/" + p.championName + ".png"} height="35" width="35" alt={p.championName}/> </td>
          
        <td style={{border: "1px solid"}}>  {p.kills}  </td>
        <td style={{border: "1px solid"}}>{p.deaths} </td>
        <td style={{border: "1px solid"}}> {p.assists} </td>
        <td style={{border: "1px solid"}}> {p.totalMinionsKilled} </td> 
        
          <td style={{border: "1px solid"}}>     {(p.item0 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item0 + ".png"} height="25" width="25" alt={p.item0}/>}
          {(p.item1 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item1 + ".png"} height="25" width="25" alt={p.item1}/>}
          {(p.item2 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item2 + ".png"} height="25" width="25" alt={p.item2}/>}
          {(p.item3 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item3 + ".png"} height="25" width="25" alt={p.item3}/>}
          {(p.item4 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item4 + ".png"} height="25" width="25" alt={p.item4}/>}
          {(p.item5 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item5 + ".png"} height="25" width="25" alt={p.item5}/>}
          {(p.item6 != 0) &&  <img src= {"https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/" + p.item6 + ".png"} height="25" width="25" alt={p.item6}/>} </td>

    </tr>
          {/* </li> */}
      })}
      </table>
    </div>

    </div>
    : navigate("/")} 
    

    </div>

   
 )
}

export default Match;