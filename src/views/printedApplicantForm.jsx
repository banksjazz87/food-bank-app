import React from "react";
import PrintedPersonCount from "../components/printedPersonCount.jsx";
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

      <div id="logo_individuals_wrapper">
        <img
          src={paLogo}
          alt="Logo of Pennsylvania Department of Agriculture"
          id="pa_logo"
        ></img>
        <PrintedPersonCount
          title="Children (0-17)"
          count="3"
        />
      </div>
      </div>
    </div>
  );
}
