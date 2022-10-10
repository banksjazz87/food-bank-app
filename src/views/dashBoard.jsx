import "../assets/styles/App.scss";
import "../assets/styles/root.scss";
import "../assets/styles/library.scss";
import React from "react";
import NavBar from "../components/navBar.jsx";

export default function Dashboard() {
  return (
    <div>
      <div class="header_wrapper">
        <h1>Dashboard</h1>
      </div>
      <NavBar />
    </div>
  );
}
