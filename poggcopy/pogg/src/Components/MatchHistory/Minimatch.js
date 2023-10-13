import React from "react";
//displays match information very basic
const Minimatch = ({ m }) => {
  console.log("m:", m);
  return (
    <div>
      <h1>Match Type and Won</h1>
      <ul>
        {m.map((mat) => (
          <li key={Math.random()}>
            {mat.attributes.gamemode} | {mat.attributes.win.toString()}
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
