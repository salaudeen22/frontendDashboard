import React from "react";
import TotalScreenTime from "../Component/TotalScreenTime";
import AverageScreenTime from "../Component/AverageScreenTime";
import SummaryPieGraph from "../Component/SummaryPieGraph";
import WorkedDisplay from "../Component/WorkedDisplay";



function HomePage({ data }) {
    if (!data.screendata || data.screendata.length === 0) {
        return <div>Please Download and activate the extesnion</div>;
      }

  return (
    <div className="section-1">
      <div className="headerSection">
        <TotalScreenTime data={data} />
        <WorkedDisplay data={data}/>
        <AverageScreenTime data={data} />
      </div>
      <SummaryPieGraph data={data} />
    </div>
 
  );
}

export default HomePage;
