import './App.css';
import React from "react";
import { Link } from "react-router-dom";


export default function App() {
  return (
    <div>
      <h1>Welcome to the Chapel Food Bank Application</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/login">Login</Link> |{" "}
        <Link to="/new_applicant">New Applicant</Link>
      </nav>
    </div>
  );
}






