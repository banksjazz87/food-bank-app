import "../assets/styles/App.scss";
import "../assets/styles/root.scss";
import "../assets/styles/library.scss";
import "../assets/styles/dashboard.scss";
import React from "react";
import NavBar from "../components/navBar.jsx";
import {useNavigate} from "react-router-dom";
import DashboardIcon from "../components/dashboardIcon.jsx";
import Footer from "../components/footer.jsx";

export default function Dashboard() {

  const navigate = useNavigate();

  return (
    <div>
      <div class="header_wrapper">
        <h1>Dashboard</h1>
      </div>
      <NavBar />
    <div id="content_wrapper">
      <h1>Applicants</h1>
      <div class="icon_wrapper">
        <DashboardIcon 
          clickHandler={() => navigate('/new_applicant', {replace: true})}
          title="New Applicant"
        />
        <DashboardIcon
          clickHandler={() => navigate('/search', {replace: true})}
          title="Search Edit"
        />
      </div>
      <h1>Foodbank Lists</h1>
      <div class="icon_wrapper">
        <DashboardIcon 
          clickHandler={() => navigate('/create-foodbank-list', {replace: true})}
          title="Create List"
        />
        <DashboardIcon
          clickHandler={() => navigate('/past-registered-list', {replace: true})}
          title="Past Lists"
        />

        <DashboardIcon
          clickHandler={() => navigate('/current-registered-list', {replace: true})}
          title="Current List"
        />
        </div>
        </div>
      <Footer />
    </div>
  );
}
