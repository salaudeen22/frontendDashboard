import React from "react";
import { LineChart } from "@mui/x-charts";


function Weeklyreport({ data }) {
  if (!data || !data.screendata || data.screendata.length === 0) {
    return <div>No screen data available</div>;
  }

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const dailyData = Array.from({ length: daysInMonth }, (_, index) => ({
    date: new Date(currentYear, currentMonth, index + 1),
    trackedSeconds: 0,
  }));

  data.screendata.forEach((item) => {
    Object.values(item).forEach((value) => {
      const timeStamp = new Date(value.lastDateVal);
      // console.log("timeStamp:", timeStamp);

      if (
        timeStamp.getMonth() === currentMonth &&
        timeStamp.getFullYear() === currentYear
      ) {
        const dayOfMonth = timeStamp.getDate();
        const trackedSeconds = value.trackedSeconds / 3600;
        dailyData[dayOfMonth - 1].trackedSeconds += trackedSeconds;
      }
    });
  });

  // const maxSeconds = Math.max(...dailyData.map((item) => item.trackedSeconds));

  return (
    <div className="weekreportbox">
        
      <div className="LineGraph">
        <h3>Monthly report</h3>
        <hr />
        <LineChart
          xAxis={[{ data: Array.from({ length: daysInMonth }, (_, index) => index + 1) }]}
          series={[
            {
              data: dailyData.map((item) => item.trackedSeconds),
              area: true,
            },
          ]}
          options={{
            title: {
              text: 'Weekly Report',
              align: 'center',
            },
            xAxis: {
              title: {
                text: 'Day of Month',
              },
            },
            yAxis: {
              title: {
                text: 'Tracked Seconds',
              },
            },
          }}
        height={300}
        width={400}
        />
      </div>
    </div>
  );
}

export default Weeklyreport;
