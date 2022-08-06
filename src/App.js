import './assets/styles/App.scss';
import React from "react";
import { Link } from "react-router-dom";


export default function App() {
  return (
    <div id="homepage_wrapper">
      <h1>Welcome to the Chapel Food Bank Application</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/login">Login</Link> |{" "}
        <Link to="/new_applicant">New Applicant</Link>
        <Link to="/search">Search Applicants</Link>
        <Link to="/current_registered_list">Food Bank List</Link>
        <Link to="/past_registered_list">Past Registered List</Link>
      </nav>
    </div>
  );
}






