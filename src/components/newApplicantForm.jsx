import React, { useState } from "react";
import dataPoints from "../variables/newApplicantDataPoints.js";
import "../assets/styles/newApplicantForm.scss";

export default function NewApplicantForm(props) {
  //React Hook that will be used to update the state of each input, will initialize the state with the dateAltered field.
  const currentDate = new Date();
  const [field, setField] = useState({
    dateAltered: currentDate.toLocaleDateString(),
  });

  const returnFields = dataPoints.map((x, y) => {
    if (x.value === null) {
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
    } else if (x.style === "hidden") {
      return (
        <input
          key={`input_${y}`}
          type={x.type}
          id={x.name}
          style={{ display: "none" }}
          value={x.value()}
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
            className="new_applicant_input"
            maxLength={x.maxWidth}
            name={x.name}
            min={x.type === "number" ? 0 : ""}
            onChange={(e) => setField({ ...field, [x.name]: e.target.value })}
          />
        </div>
      );
    }
  });

  return (
    <form
      className="shadow_form"
      action={props.route}
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        props.submissionHandler(field);
      }}
    >
      {returnFields}
      <input id="new_applicant_submit" type="submit" value="submit" />
    </form>
  );
}
