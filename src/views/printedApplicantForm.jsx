import React from "react";
import PrintedPersonCount from "../components/printedPersonCount.jsx";
import PrintedInputPair from "../components/printedInputPair.jsx";
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
              tableContents={[
                { title: "Children (0-17)", count: 1 },
                { title: "Adults", count: 2 },
                { title: "Seniors (60 and up)", count: 1 },
              ]}
            />
          </div>
        </div>
        <div id="top_heading">
          <h2>Bureau of Food Assistance</h2>
          <h2>The Emergency Food Assistance Program (TEFAP)</h2>
          <h4>"Self Declaration of Need"</h4>
          <h3>Effective July 1, 2022 to June 30, 2023</h3>
        </div>

        <div id="fields">

          <div id="field_block_1" className="field_block">
            <PrintedInputPair
              pairArray={[
                { value: "Name", label: "Recipient Name" }
                ]}
            />
            <PrintedInputPair
              pairArray={[
                { value: "402 Myrtle", label: "Street Address" }
                ]}
            />
            <PrintedInputPair 
              pairArray={[
                {value: "Emlenton", label: "City"}, 
                {value: "PA", label: "State"}, 
                {value: 16373, label: "Zip"}
                ]}
            />
          </div>

          <div id="field_block_2" className="field_block">
              <PrintedInputPair 
                pairArray={[
                  {value: "signature", label: "Agency Representative Signature"}, 
                  {value: "1/15/2023", label: "Date"}
                  ]}
              />
              <PrintedInputPair 
                pairArray={[
                  {value: "Toadstool", label: "Distribution Site Name"}, 
                  {value: 42, label: "Number"}
                  ]}
              />
              <PrintedInputPair 
                pairArray={[
                  {value: "Hershey", label: "Distribution Site Location"}
                  ]}
              />
        </div>
        </div>

      </div>
    </div>
  );
}
