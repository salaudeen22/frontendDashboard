
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css"
import Authecation from './Screen/Authecation';
import React from "react";
import Dashboard from './Screen/Dashboard.jsx';

import Analytics from "./Screen/Analytics.jsx";
import WebsiteAnalystics from "./Screen/WebsiteAnalystics.jsx";


function App() {
  
 
  return (
    <div>
      <Router>
     
        <Routes>
          <Route path="/" element={<Authecation/>} />
         
          <Route path="/home" element={<Dashboard/>} />
          <Route path="/Analytics" element={<Analytics/>} />
          <Route path="/WebAnalytics/:url" element={<WebsiteAnalystics />} />



       
        </Routes>
      </Router> 
 
    </div>
  )
}

export default App