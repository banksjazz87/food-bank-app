import "../assets/styles/App.scss";
import "../assets/styles/root.scss";
import "../assets/styles/library.scss";
import "../assets/styles/dashboard.scss";
import React from "react";
import NavBar from "../components/navBar.jsx";
import {useNavigate} from "react-router-dom";
import DashboardIcon from "../components/dashboardIcon.jsx";

export default function Dashboard() {

  const navigate = useNavigate();

  return (
    <div>
      <div class="header_wrapper">
        <h1>Dashboard</h1>
      </div>
      <NavBar />

      <h1>Applicants</h1>
        <DashboardIcon 
          clickHandler={() => navigate('/new_applicant', {replace: true})}
          title="New Applicant"
        />
        <DashboardIcon
          clickHandler={() => navigate('/search', {replace: true})}
          title="Search and Edit"
        />
      <h1>Foodbank Lists</h1>
    </div>
  );
}
