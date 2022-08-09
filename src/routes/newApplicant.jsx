import React from "react";

export default function Applicant() {
  const dataPoints = [
      {initialValue: "", type:"text", maxWidth: 25, name: "firstName"}, 
      {initialValue: "", type: "text", maxWidth: 25, name: "lastName"}, 
      {initialValue: "", type: "tel", maxWidth: 15, name: "phone"},
      {initialValue: "", type: "text", maxWidth: 25, name: "address"}, 
      {initialValue: 0, type: "number", maxWidth: 2, name: "Number of People In Household"}, 
      {initialValue: 0, type: "number", maxWidth: 2, name: "Number of Children"}, 
      {initialValue: 0, type: "number", maxWidth: 2, name: "Number of Adults"}, 
      {initialValue: 0, type: "number", maxWidth: 2, name: "Number of Citizens"}, 
      {initialValue: null, type: null, maxWidth: null, name: "Total Household Income"}, 
      {initialValue: 0, type: "number", maxWidth: 6, name: "Monthly Income"}, 
      {initialValue: 0, type: "number", maxWidth: 6, name: "Anual Income"}, 
      {initialValue: 0, type: "number", maxWidth: 6, name: "Weekly Income"}
    ];
    return (
      <div id="new_applicat_wrapper">

      </div>
    );
  }