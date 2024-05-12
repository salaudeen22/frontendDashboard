import React, { useState, useEffect } from "react";
import { universalurl } from "../Utils/helper";

function WorkedDisplay({ data }) {
  const [webdata, setWebdata] = useState([]);

  useEffect(() => {
    const UserData = async () => {
      try {
        const response = await fetch(`${universalurl}api/WebData`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        setWebdata(json);
      } catch (error) {
        console.error(error);
      }
    };
    UserData();
  }, []);

  if (!data.screendata || data.screendata.length === 0 || !webdata || webdata.length === 0) {
    return <div>No screen data available</div>;
  }

  const currentDate = new Date(); 
  const currentWeekStart = new Date(currentDate); 
  currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay()); 

  const currentWeekEnd = new Date(currentWeekStart); 
  currentWeekEnd.setDate(currentWeekStart.getDate() + 6); 

  const productivityMap = {
    productivity: 0,
    distraction: 0,
  };
  // console.log(data);

  data.screendata.forEach((screen) => {
    const timeStamp = screen.lastDateVal;
    const date = new Date(timeStamp);

    if (date >= currentWeekStart && date <= currentWeekEnd) {
      const matchedWebData = webdata.find(
        (web) => web.url === screen.url
      );

      if (matchedWebData) {
        productivityMap[matchedWebData.flag]++;
      }
    }
  });

  const productivityLevel =
    productivityMap.productivity > productivityMap.distraction
      ? "productive"
      : productivityMap.productivity < productivityMap.distraction
      ? "distracted"
      : "balanced";

  return (
    <div>
      <h2>You were {productivityLevel} this week</h2>
    </div>
  );
}

export default WorkedDisplay;
