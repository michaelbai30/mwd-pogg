import React from "react";
import {Chart} from "chart.js/auto"
import {Pie} from "react-chartjs-2"

const Middle = ({page, match}) => {

console.log(page);

const labels2 = ["Team1", "Team2"];

var t1escore = 0;
var t2escore = 0;
var t1damage = 0;
var t2damage = 0;
var t1cs = 0;
var t2cs = 0;
var t1gold = 0;
var t2gold = 0;

for (var i = 0; i < match.info.participants.length; i++) {

    console.log(match.info.participants[i]);
    if (match.info.participants[i].teamId == 100) {
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

  const golddata = {
    labels: labels2,
    datasets: [
      {
        label: "CS",
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

    return (
        <div>
            {page.page == 1 && <div> <div> <h4>Team Elims</h4></div> <div> <Pie data={data} options={{maintainAspectRatio: false}} height="250px" width="250px"/> </div> <br/> <div><h4>Team Damage</h4> </div> <div> <Pie data={damagedata} options={{maintainAspectRatio: false}} height="250px" width="250px"/>  </div> </div>}
            {page.page == 2 && <div> <div><h4>Team CS</h4> </div>  <div> <Pie data={csdata} options={{maintainAspectRatio: false}} height="250px" width="250px"/> </div> <br/> <div><h4>Team Gold</h4> </div>  <div> <Pie data={golddata} options={{maintainAspectRatio: false}} height="250px" width="250px"/>  </div> </div>}

        </div>
    )

}

export default Middle;