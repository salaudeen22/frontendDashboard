import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHome, faChartLine, faFlag, faUsers } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ isSidebarOpen }) {
  

 

  return (
    <div className={`sidebar ${isSidebarOpen ? '' : 'hidden'}`}>
      <FontAwesomeIcon id="icon" icon={faClock} />
      <ul>
        <li>
          <Link to="/home">
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </li>
        <li>
          <Link to="/Analytics">
            <FontAwesomeIcon icon={faChartLine} />
          </Link>
        </li>
        <li>
          <Link to="/flags">
            <FontAwesomeIcon icon={faFlag} />
          </Link>
        </li>
        <li>
          <Link to="/users">
            <FontAwesomeIcon icon={faUsers} />
          </Link>
        </li>
      </ul>
    
    </div>
  );
}

export default Sidebar;
