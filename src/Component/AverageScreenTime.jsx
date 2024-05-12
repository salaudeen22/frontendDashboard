import React from "react";

function AverageScreenTime({ data }) {
  if (!data.screendata || data.screendata.length === 0) {
    return <div>No screen data available</div>;
  }
  let totaltime = 0;


  let screendata = data.screendata;
  // console.log(screendata);
  for (let i = 0; i < screendata.length; i++) {
    let data = Object.values(screendata[i]);
    for (let j = 0; j < data.length; j++) {
      totaltime += data[j].trackedSeconds;
    }
  }
  const hours = Math.floor(totaltime / 3600);

  const averageTime = Math.floor(hours / 60);
  // console.log("average time"+averageTime);
  return (
    <div className="TotalBox">
      <div className="title">Average Scree Time</div>
      <hr />

      <div className="cotent">
        <h1>
          {averageTime} <span>Hour/day</span>
        </h1>
      </div>
    </div>
  );
}

export default AverageScreenTime;
