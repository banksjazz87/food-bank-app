import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/navBar.scss";

export default function HomeNavBar(props) {
  return (
    <nav
      className={
        props.display === "standard" ? "nav_wrapper" : "mobile_nav_wrapper"
      }
    >
      <Link to="/login">Login</Link>
    </nav>
  );
}
