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
          <div id="person_count_wrapper">
          <PrintedPersonCount 
            tableContents={[{title: "Children (0-17)", count: 1}, {title: "Adults", count: 2}, {title: "Seniors (60 and up)", count: 1}]}
          />
          </div>
        </div>
        <div id="top_heading">
          <h2>Bureau of Food Assistance</h2>
          <h2>The Emergency Food Assistance Program (TEFAP)</h2>
          <h4>"Self Declaration of Need"</h4>
          <h3>Effective July 1, 2022 to June 30, 2023</h3>
        </div>
      </div>
    </div>
  );
}
