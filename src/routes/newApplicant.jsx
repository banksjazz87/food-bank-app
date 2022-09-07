import React, { useState } from "react";
import dataPoints from "../variables/newApplicantDataPoints.js";
import postRequest from "../functions/post.js";
import "../assets/styles/newApplicant.scss";

export default function Applicant() {

  //React Hook that will be used to update the state of each input
  const currentDate = new Date();
  const [field, setField] = useState({dateRevised: currentDate.toLocaleDateString()});

 
  const newApplicantConfirmation = () => {
    postRequest("/new_applicant", field)
    .then(data => alert(data.message));
  }

  const returnFields = dataPoints.map((x, y) => {
    if (x.value === null) {
      return (
          <p id={x.name} className="section_heading" key={`label_${y}`} for={x.name}>
            {x.placeHolder}
          </p>
      );
      } else if (x.style === "hidden") {
        return (
          <input  
            key={`input_${y}`}
            type={x.type}
            id={x.name}
            style={{display: "none"}}
            value={x.value()}
          />
        )
      
    } else {
      return (
        <div className="input_pair" key={`input_${y}`}>
          <label key={`label_${y}`} htmlFor={x.name}>
            {x.placeHolder}
          </label>
          <br/>
          <input
            key={`input_${y}`}
            type={x.type}
            id={x.name}
            className="new_applicant_input"
            maxLength={x.maxWidth}
            name={x.name}
            min={x.type === "number" ? 0 : ""}
            onChange = {(e) => setField({...field, [x.name]: e.target.value})}
          />
        </div>
      );
    }
  });

  return (
    <div id="new_applicant_wrapper">
      <h1 id="heading">New Applicant</h1>
      <form 
        action="/new_applicant" 
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          newApplicantConfirmation();
        }}>
        {returnFields}
        <input id="new_applicant_submit" type="submit" value="submit"/>
      </form>
    </div>
  );
}
