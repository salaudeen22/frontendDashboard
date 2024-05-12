import React from "react";

function TotalScreenTime({ data }) {
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

  // console.log(totaltime);
  totaltime = totaltime / 2;
  const hours = Math.floor(totaltime / 3600);
  // const minutes = Math.floor((totaltime % 3600) / 60);

  return (
    <div className="TotalBox">
      <div className="title">Total Screen Time</div>
      <hr />
      <div className="content">
        <h1>
          <span>{hours} hours</span>
        </h1>
      </div>
    </div>
  );
}

export default TotalScreenTime;
