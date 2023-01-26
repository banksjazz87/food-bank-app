import React from "react";
import { useNavigate } from "react-router-dom";
import putRequest from "../functions/putRequest.js";
import dataPoints from "../variables/newApplicantDataPoints.js";
import "../assets/styles/editDisplay.scss";

export default function EditPage(props) {
  const navigate = useNavigate();

  const returnInputs = dataPoints.map((x, y) => {
    if (x.type === null) {
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
            onChange={(e) => {
              props.handleChange([x.name], e.target.value);
            }}
          />
        </div>
      );
    }
  });
  return (
    <div
      id="edit_applicant_wrapper"
      style={props.display ? { display: "" } : { display: "none" }}
    >
      <form
        id="edit_form"
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          putRequest("/applicant/update", props.currentApplicant[0]).then(
            (data) => {
              alert(data.message);
              navigate("/dashboard", { replace: true });
            }
          );
        }}
      >
        {returnInputs}
        <input class="input_button" type="submit" value="Submit" />
      </form>
    </div>
  );
}
