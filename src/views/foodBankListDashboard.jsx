import React from "react";
import {useNavigate} from "react-router-dom";
import FBDashboardIcon from "../components/dashboardIcon.jsx";
import NavBar from "../components/navBar.jsx";


import "../assets/styles/fbListDashboard.scss";

export default function FoodBankListDashboard() {
 
  let navigate = useNavigate();

  return (
    <div id="fb_list_dashboard">
      <h1>FB List Dashboard</h1>
      <NavBar />

      <div id="icon_wrapper">
        <FBDashboardIcon title="Create List" clickHandler={() => navigate("/create-foodbank-list")} />
        <FBDashboardIcon title="Past Lists" clickHandler={() => navigate("/past-registered-list")} />
        <FBDashboardIcon title="Current Lists" clickHandler={() => navigate("/current-registered-list")} />
      </div>
    </div>
  );
}
