import React from "react";
import {Chart} from "chart.js/auto"
import {Pie} from "react-chartjs-2"


//component that has various charts for displaying data
const Middle = ({page, match}) => {

// console.log(page);

const labels2 = ["Team1", "Team2"];
var names = [];
var indDamage = [];
var indElims = [];
var indCS = [];
var indGold = [];

var t1escore = 0;
var t2escore = 0;
var t1damage = 0;
var t2damage = 0;
var t1cs = 0;
var t2cs = 0;
var t1gold = 0;
var t2gold = 0;


//build variables to store the data needed for the chart
for (var i = 0; i < match.info.participants.length; i++) {

    console.log(match.info.participants[i]);
    names.push(match.info.participants[i].summonerName);
    indDamage.push(match.info.participants[i].totalDamageDealtToChampions);
    indElims.push(match.info.participants[i].kills);
    indCS.push(match.info.participants[i].totalMinionsKilled);
    indGold.push(match.info.participants[i].goldEarned);

    if (match.info.participants[i].teamId == 200) {
        t1escore += match.info.participants[i].kills;
        t1damage += match.info.participants[i].totalDamageDealtToChampions;

        t1gold += match.info.participants[i].goldEarned;
        t1cs += match.info.participants[i].totalMinionsKilled;
    }
    else {
        t2escore += match.info.participants[i].kills;
        t2damage += match.info.participants[i].totalDamageDealtToChampions;
        t2gold += match.info.participants[i].goldEarned;

        t2cs += match.info.participants[i].totalMinionsKilled;

    }
}
console.log(names)

//array for background colors
//may be changed size based on game mode
var backgroundColorInd = []
for (var i = 0; i < match.info.participants.length / 2; i++) {
    backgroundColorInd.push('rgb(54, 162, 235)');
}
for (var i = 0; i < match.info.participants.length / 2; i++) {
  backgroundColorInd.push('rgb(255, 99, 132)');
}

//build the chart datasets
const data = {
  labels: labels2,
  datasets: [
    {
      label: "Eliminations",
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',],
      borderColor: "rgb(0,0,255)",
      data: [t1escore, t2escore],
      rotation: 180,
      maintainAspectRatio: false,
  
    },
  ],
};
const indElimsData = {
  labels: names,
  datasets: [
    {
      label: "Eliminations",
      backgroundColor: backgroundColorInd,
      borderColor: "rgb(0,0,255)",
      data: indElims,
      // rotation: 180,
      maintainAspectRatio: false,
  
    },
  ],
};


  const damagedata = {
    labels: labels2,
    datasets: [
      {
        label: "Total Champion Damage",
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',],
        borderColor: "rgb(0,0,255)",
        data: [t1damage, t2damage],
        rotation: 180,
        maintainAspectRatio: false,
    
      },
    ],
  };

  const indDamageData = {
    labels: names,
    datasets: [
      {
        label: "Damage",
        backgroundColor: backgroundColorInd,
        borderColor: "rgb(0,0,255)",
        data: indDamage,
        // rotation: 180,
        maintainAspectRatio: false,
    
      },
    ],
  };

  const csdata = {
    labels: labels2,
    datasets: [
      {
        label: "CS",
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',],
        borderColor: "rgb(0,0,255)",
        data: [t1cs, t2cs],
        rotation: 180,
        maintainAspectRatio: false,
    
      },
    ],
  };

  const indCSData = {
    labels: names,
    datasets: [
      {
        label: "CS",
        backgroundColor: backgroundColorInd,
        borderColor: "rgb(0,0,255)",
        data: indCS,
        // rotation: 180,
        maintainAspectRatio: false,
    
      },
    ],
  };
  const golddata = {
    labels: labels2,
    datasets: [
      {
        label: "Gold",
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',],
        borderColor: "rgb(0,0,255)",
        data: [t1gold, t2gold],
        rotation: 180,
        maintainAspectRatio: false,
    
      },
    ],
  };
  
  const indGoldData = {
    labels: names,
    datasets: [
      {
        label: "Gold",
        backgroundColor: backgroundColorInd,
        borderColor: "rgb(0,0,255)",
        data: indGold,
        // rotation: 180,
        maintainAspectRatio: false,
    
      },
    ],
  };


//depending on the charts specified, return two charts. 
//By default, team damage is displayed
    return (
        <div>
            {page.page != 2 && page.page != 3 && page.page != 4 && <div> <div style={{textAlign: "center"}}> <h4>Team Elims</h4></div> <div> <Pie data={data} options={{maintainAspectRatio: false, }} height="250px" width="250px"/> </div> <br/> <div style={{textAlign: "center"}}><h4>Team Damage</h4> </div> <div> <Pie data={damagedata} options={{maintainAspectRatio: false}} height="250px" width="250px"/>  </div> </div>}
            {page.page == 2 && <div> <div style={{textAlign: "center"}}><h4>Team CS</h4> </div>  <div> <Pie data={csdata} options={{maintainAspectRatio: false}} height="250px" width="250px"/> </div> <br/> <div style={{textAlign: "center"}}><h4>Team Gold</h4> </div>  <div> <Pie data={golddata} options={{maintainAspectRatio: false}} height="250px" width="250px"/>  </div> </div>}
            {page.page == 3 && <div> <div style={{textAlign: "center"}}> <h4>Individual Elims</h4></div> <div> <Pie data={indElimsData} options={{maintainAspectRatio: false,  plugins: { legend: {display: false}}}} height="250px" width="250px"/> </div> <br/> <div style={{textAlign: "center"}}><h4>Individual Damage</h4> </div> <div> <Pie data={indDamageData} options={{maintainAspectRatio: false, plugins: { legend: {display: false}}}} height="250px" width="250px"/>  </div> </div>}
            {page.page == 4 && <div> <div style={{textAlign: "center"}}> <h4>Individual CS</h4></div> <div> <Pie data={indCSData} options={{maintainAspectRatio: false,  plugins: { legend: {display: false}}}} height="250px" width="250px"/> </div> <br/> <div style={{textAlign: "center"}}><h4>Individual Gold</h4> </div> <div> <Pie data={indGoldData} options={{maintainAspectRatio: false, plugins: { legend: {display: false}}}} height="250px" width="250px"/>  </div> </div>}

        </div>
    )

}

export default Middle;