import React from "react";
import Navbar from "../components/navBar.jsx";
import paLogo from "../assets/images/pa-logo.jpeg";


export default function PrintedApplicantForm() {
  return (
    <div id="page_wrapper">
    <div className="header_wrapper">
        <h1>Applicant Form</h1>
    </div>
      <Navbar />
      <div id="printed_form_wrapper">
        <img 
            src={paLogo}
            alt="Logo of Pennsylvania Department of Agriculture"
            id="pa_logo"
        ></img>

      </div>
    </div>
  );
}
