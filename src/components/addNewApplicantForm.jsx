import React, { useState } from "react";
import postRequest from "../functions/post.js";

export default function AddNewApplicantForm (props) {

  const [newApplicant, setNewApplicant] = 
    useState({
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
    dateAltered: null 
  });

  const createNewApplicant = (field, value) => {
    setNewApplicant({...newApplicant, 
      [field]: value});

      console.log(newApplicant);
  }

  const submitHandler = (newApplicantObj) => {
      fetch("/all-applicants")
          .then(data => data.json())
          .then(final => {
             const currentFirstLast = `${newApplicantObj.firstName}${newApplicantObj.lastName}`;

            const firstLastOfAll = final.map((x, y) => {
              return `${x.firstName}${x.lastName}`;
          });

          if (firstLastOfAll.indexOf(currentFirstLast) > -1) {
            alert("This person is already in the database");
          } else {
            postRequest("/new-applicant/", newApplicantObj)
              .then(data => {
              if (data.status === "okay") {
                postRequest('/unregistered-applicant', newApplicantObj)
                .then(data => alert(data[0].ApplicantID))
              } else {
                alert(data.messages);
              }
            });
          }

        });
                

}

    return (
        <div
        id="cl_edit_module_addNew"
        style={props.showForm? { display: "" } : { display: "none" }}
      >
        <form
          id="add_new_person"
          method="post"
          action="/add-new/current-list"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label for="firstName">First Name:</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            onChange={(e) => {
              createNewApplicant("firstName", e.target.value);
            }}
            />
          <label for="lastName">Last Name:</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName"
            onChange={(e) => {
              createNewApplicant("lastName", e.target.value)
            }} />
          <input 
            type="submit" 
            value="submit" 
            onClick={(e) => {
              e.preventDefault();
              submitHandler(newApplicant);
            }} 
            />
        </form>
      </div>
    )
}