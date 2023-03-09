import React, { useState } from "react";
import dataPoints from "../variables/newApplicantDataPoints.js";
import "../assets/styles/newApplicantForm.scss";

export default function NewApplicantForm(props) {
  //React Hook that will be used to update the state of each input, will initialize the state with the dateAltered field.
  const currentDate = new Date();
  const initialFormState = {
    firstName: "",
    lastName: "",
    phone: null,
    street: null,
    city: null,
    state: null,
    zip: null,
    children: null,
    adults: null,
    seniors: null,
    totalOccupants: null,
    weeklyIncome: null,
    monthlyIncome: null,
    annualIncome: null,
    totalIncome: null,
    dateAltered: currentDate.toLocaleDateString(),
  };

  const [field, setField] = useState(initialFormState);

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
          <label
            className="new_applicant_label"
            key={`label_${y}`}
            htmlFor={x.name}
          >
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
            onChange={(e) => {
                if (x.currency === true) {
                  setField({...field, [x.name]: parseInt(e.target.value).toFixed(2)});
                  console.log(field);
                } else {
                  setField({ ...field, [x.name]: e.target.value });
                }
            }}
          />
        </div>
      );
    }
  });

  return (
    <div id="applicant_form_wrapper">
      <button
        id="close_form_x"
        type="button"
        style={window.location.pathname === '/current-registered-list' ? { display: "" } : { display: 'none' }}
        onClick={() => {
          props.cancel();
          setField(initialFormState);
        }}
      >X
      </button>
      <form
        id="applicant_form"
        className="shadow_form"
        action={props.route}
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          const currentForm = document.getElementById('applicant_form');

          if (field.firstName.length > 0 && field.lastName.length > 0) {

            fetch(`/single-applicant-check/first/${field.firstName}/last/${field.lastName}`)
              .then(results => results.json())
              .then((data) => {
                if (data.length === 0) {
                  props.submissionHandler(field);
                  setField(initialFormState);
                  currentForm.reset();
                } else {
                  alert(`An applicant by the name of ${field.firstName} ${field.lastName} is already in the database.`);
                  setField(initialFormState);
                  currentForm.reset();
                  currentForm.scrollIntoView({behavior: 'smooth'});
                }
            });

          } else {
            alert('First Name and Last Name are required.');
            currentForm.scrollIntoView({ behavior: 'smooth' });
          }
        }
        }
      >
        {returnFields}
        <input id="new_applicant_submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}
