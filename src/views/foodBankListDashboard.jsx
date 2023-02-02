import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "../components/dashboardIcon.jsx";
import NavBar from "../components/navBar.jsx";
import "../assets/styles/fbListDashboard.scss";

export default function FoodBankListDashboard() {
  let navigate = useNavigate();

  return (
    <div id="fb_list_dashboard">
      <div className="header_wrapper">
        <h1>FB List Dashboard</h1>
      </div>
      <NavBar />

      <div id="icon_wrapper">
        <DashboardIcon
          title="Create List"
          clickHandler={() => navigate("/create-foodbank-list")}
        />
        <DashboardIcon
          title="Past Lists"
          clickHandler={() => navigate("/past-registered-list")}
        />
        <DashboardIcon
          title="Current Lists"
          clickHandler={() => navigate("/current-registered-list")}
        />
      </div>
    </div>
  );
}
