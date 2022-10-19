import React from "react";
import FBDashboardIcon from "../components/dashboardIcon.jsx";
import NavBar from "../components/navBar.jsx";
import "../assets/styles/fbListDashboard.scss";

export default function FoodBankListDashboard() {
  return (
    <div id="fb_list_dashboard">
      <h1>FB List Dashboard</h1>
      <NavBar />
      <div id="icon_wrapper">
        <FBDashboardIcon title="Create List" />
        <FBDashboardIcon title="Search Lists" />
      </div>
    </div>
  );
}
