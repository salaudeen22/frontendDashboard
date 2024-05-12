import React from 'react';


function EncouragementBox({ data }) {
  if (!data || !data.screendata || data.screendata.length === 0) {
    return <div>No screen data available</div>;
  }

  const currentDate = new Date();
  const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const currentMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const screendata = data.screendata;
  const urlMap = new Map();

  screendata.forEach((item) => {
    const dataValues = Object.values(item);
    dataValues.forEach((value) => {
      const timeStamp = value.lastDateVal;
      const date = new Date(timeStamp);

      if (date >= currentMonthStart && date <= currentMonthEnd) {
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

  
  let productivitySeconds = 0;
  let distractionSeconds = 0;

  urlMap.forEach((value, key) => {
    if (key.includes('productivity')) {
      productivitySeconds += value;
    } else if (key.includes('distraction')) {
      distractionSeconds += value;
    }
  });

  let encouragementMessage;
  let encouragementClassName;
  let imageSrc;

  
  if (productivitySeconds > distractionSeconds) {
    encouragementMessage = "Keep up the productivity!";
    encouragementClassName = "encouragement-productivity";
    imageSrc = "https://www.shareicon.net/data/2017/03/29/881750_sport_512x512.png";
  } else if (productivitySeconds < distractionSeconds) {
    encouragementMessage = "Stay focused and minimize distractions!";
    encouragementClassName = "encouragement-distraction";
    imageSrc = "https://www.nevergiveupdayshop.com/image/cache/catalog/ingud716-1280x961.png.webp";
  } else {
    encouragementMessage = "Balance is key. Keep it up!";
    encouragementClassName = "encouragement-balance";
    imageSrc = "https://rxglobal.com/sites/default/files/2023-09/Best%20Company%20Work-Life%20Balance%20Logo_1.png";
  }

  return (
    <div className={`EncouragementBox ${encouragementClassName}`}>
        <h2>Congrulation</h2>
      <img src={imageSrc} alt="Encouragement" className="encouragement-image" />
    
      <p>{encouragementMessage}</p>
    </div>
  );
}

export default EncouragementBox;
