import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const SummaryPieGraph = ({ data }) => {
  if (!data.screendata || data.screendata.length === 0) {
    return <div>No screen data available</div>;
  }

  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const currentWeekStart = new Date(currentDate);
  currentWeekStart.setDate(currentDate.getDate() - currentDay);
  currentWeekStart.setHours(0, 0, 0, 0);
  
  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
 currentWeekEnd.setHours(23, 59, 59, 999); 

  const screendata = data.screendata;
  const urlMap = new Map();

  screendata.forEach(item => {
    const dataValues = Object.values(item);
    dataValues.forEach(value => {
      const timeStamp = value.lastDateVal;
      const date = new Date(timeStamp);
    
  
      if (date >= currentWeekStart && date <= currentWeekEnd) {
       
        const url = value.url;
        const trackedSeconds = value.trackedSeconds / 3600;
        
        if (urlMap.has(url)) {
          urlMap.set(url, urlMap.get(url) + trackedSeconds);
        } else {
          urlMap.set(url, trackedSeconds);
        }
      }
    });
  });

  const dummyData = Array.from(urlMap.entries()).map(([url, trackedSeconds]) => ({
    url,
    trackedSeconds,
  }));

  // Calculate average tracked seconds
  const totalSeconds = dummyData.reduce((acc, item) => acc + item.trackedSeconds, 0);
  const averageSeconds = totalSeconds / dummyData.length;

  // Filter the data based on the average
  const filteredData = dummyData.filter(item => item.trackedSeconds > averageSeconds);

  // Calculate the total seconds of the filtered data
  const totalFilteredSeconds = filteredData.reduce((acc, item) => acc + item.trackedSeconds, 0);

  // Add an "Other" category for data that didn't make it to the filtered list
  const otherSeconds = totalSeconds - totalFilteredSeconds;
  if (otherSeconds > 0) {
    filteredData.push({ url: 'Other', trackedSeconds: otherSeconds });
  }

  return (
    <div className="graphContainer">
      <div className="graphCard">Weekly Website Usage</div>
      <div className="graphContent">
        <PieChart
          series={[
            {
              data: filteredData.map((item) => ({
                argument: item.url,
                value: item.trackedSeconds,
                label: `${item.url} (${Math.round(item.trackedSeconds/3600)}hours)`,
              })),
              innerRadius: 30,
              outerRadius: 120,
              paddingAngle: 5,
              cornerRadius: 5,
            },
          ]}
          height={300}
        />
      </div>
    </div>
  );
};

export default SummaryPieGraph;