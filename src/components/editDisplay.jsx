import React, { useState } from "react";

export default function EditPage(props) {
  const returnInputs = props.currentApplicant.map((x, y) => {
    if (x.type === null) {
      return (
        <p
          id={x.name}
          className="section_heading"
          key={`label_${y}`}
          for={x.name}
        >
          {x.placeholder}
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
    <h1 style={props.display ? { display: "" } : { display: "none" }}>
      This Will be the edit page
    </h1>
  );
}
