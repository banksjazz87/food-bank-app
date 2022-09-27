import React, { useState } from "react";
import dataPoints from "../variables/newApplicantDataPoints.js";

export default function EditPage(props) {
  const returnInputs = dataPoints.map((x, y) => {
    if (x.name === null) {
      return (
        <p
          id={x.name}
          className="section_heading"
          key={`label_${y}`}
          for={x.name}
        >
          {x.placeHolder}
        </p>
      );
    } else if (x.name === "dateAltered") {
      return (
        <input
          key={`input_$y`}
          type={x.type}
          value={() => {
            const currentDate = new Date();
            return currentDate.toLocaleDateString();
          }}
          style={{ display: "none" }}
        />
      );
    } else {
      return (
        <div className="input_pair" key={`input_${y}`}>
          <label key={`label_${y}`} htmlFor={x.name}>
            {x.placeHolder}
          </label>
          <br />
          <input
            key={`input_${y}`}
            type={x.type}
            id={x.name}
            value={props.currentApplicant[0][x.name]}
            className="new_applicant_input"
            maxLength={x.maxWidth}
            name={x.name}
            min={x.type === "number" ? 0 : ""}
            onChange={(e) => props.handleChange([x.name], e.target.value )}
          />
        </div>
      );
    }
  });
  return (
   <div style={props.display ? {display: ""} : {display: "none"}}>
   <h1>
      This Will be the edit page
    </h1>
    <form 
      id="edit_form" 
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(props.currentApplicant)
      }}
      >
       {returnInputs}

       </form>
    
   </div>
  );
}
