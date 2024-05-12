import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { LineChart } from "@mui/x-charts";
import Sidebar from "../Component/Sidebar";
import { universalurl } from "../Utils/helper";
import Swal from "sweetalert2";

function WebsiteAnalytics() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState("Loading..");
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout Succesfully!",
    
      icon: "success",
    });
    localStorage.clear();
    navigate("/");
  };

  const handleAvatarClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const UserData = async () => {
      const email = localStorage.getItem("userEmail");
      try {
        const response = await fetch(`${universalurl}api/displayuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        });
        const json = await response.json();
        // console.log(json);
        setData(json);
        setUser(json.name);
      } catch (error) {
        console.error(error);
      }
    };
    UserData();
  }, []);

  const { url } = useParams();
  const filter = new Map();

  const screendata = data.screendata || [];
  screendata.forEach((item) => {
    const dataValues = Object.values(item);
    dataValues.forEach((value) => {
      if (value.url === url) {
        if (!filter.has(value.timestamp)) {
          filter.set(value.timestamp, value.trackedSeconds);
        } else {
          filter.set(
            value.timestamp,
            filter.get(value.timestamp) + value.trackedSeconds
          );
        }
      }
    });
  });

  //   console.log(filter);

  let totalHours = 0;
  filter.forEach((value) => {
    totalHours += value;
  });
  const totalScreenTime = Math.floor(totalHours / 3600);

  const averageTime = Math.floor(totalHours / (3600 * filter.size));

//   const chartData = Array.from(filter.entries()).map(
//     ([lastDateVal, trackedSeconds]) => ({
//       x: new Date(lastDateVal),
//       y: trackedSeconds,
//     })
//   );
//   console.log(chartData);

  return (
    <>
    <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="Container">
        <main>
          <nav>
            <button onClick={toggleSidebar} id="tooglebutton">
              x
            </button>
            <h1>
              Good Day, <span>{user}</span>
            </h1>
            <ul>
              <li className="bell">
                <FontAwesomeIcon icon={faBell} />
              </li>
              <li className="bell">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </li>
              <li>
                <img
                  src={data.userImage?data.userImage:"https://source.unsplash.com/random/900×700/?useravatar"}
                  alt="Avatar"
                  className="avatar"
                  onClick={handleAvatarClick}
                ></img>
                {dropdownVisible && (
                  <div className="dropdown-content">
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </li>
            </ul>
          </nav>
          {data.length == 0 ? (
            <div>Loading please wait...</div>
          ) : (
            <div className="section-3">
              <div className="s3header">
                <div className="TotalBox">
                  <div className="title">Total Screen Time</div>
                  <hr />
                  <div className="content">
                    <h1>
                      <span>{totalScreenTime} hours</span>
                    </h1>
                  </div>
                </div>
                <div className="TotalBox">
                  <div className="title">Average Screen Time</div>
                  <hr />
                  <div className="content">
                    <h1>
                      {averageTime} <span>Hour/day</span>
                    </h1>
                  </div>
                </div>
              </div>
              <div className="s3Bottom">
                {/* <div className="weekreportbox">
                  <div className="LineGraph">
                    <h3>Monthly report</h3>
                    <hr />
                    <LineChart
                      series={[{ data: chartData }]} 
                      options={{
                        title: {
                          text: "Monthly Report",
                          align: "center",
                        },
                        xAxis: {
                          title: {
                            text: "Date",
                          },
                        },
                        yAxis: {
                          title: {
                            text: "Tracked Seconds",
                          },
                        },
                      }}
                      width={600}
                      height={300}
                    />
                  </div>
                </div> */}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default WebsiteAnalytics;
