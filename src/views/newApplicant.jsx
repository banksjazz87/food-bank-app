import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import dataPoints from "../variables/newApplicantDataPoints.js";
import postRequest from "../functions/post.js";
import NavBar from "../components/navBar.jsx";
import "../assets/styles/newApplicant.scss";


export default function Applicant() {

  //React Hook that will be used to update the state of each input, will initialize the state with the dateAltered field.
  const currentDate = new Date();
  const [field, setField] = useState({dateAltered: currentDate.toLocaleDateString()});

  const navigate = useNavigate();


  const newApplicantConfirmation = () => {
    postRequest("/new-applicant", field)
    .then(data => {
      if (data.status === 'okay') {
        alert(data.message);
        navigate("/dashboard", {replace: true});
      } else {
        alert(data.message);
      }
  });
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
      <h1 className="heading_wrapper">New Applicant</h1>
      <NavBar />
      <form 
        className="shadow_form"
        action="/new-applicant" 
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
