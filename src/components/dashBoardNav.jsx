import React from "react";
import { Link } from "react-router-dom";
import '../assets/styles/navBar.scss';


export default function DashBoardNavBar(props) {
    return (
        <nav
        className={
          props.display === "standard" ? "nav_wrapper" : "mobile_nav_wrapper"
        }
        
      >
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/new_applicant">New Applicant</Link>
        <Link to="/search">Search Applicants</Link>
        <Link to="/current_registered_list">Food Bank List</Link>
        <Link to="/past_registered_list">Past Registered List</Link>
      </nav>
    )
}