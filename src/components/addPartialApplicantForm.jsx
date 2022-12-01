import React, { useState } from "react";
import postRequest from "../functions/post.js";
import NewApplicantForm from "../components/newApplicantForm.jsx";

export default function AddPartialApplicantForm (props) {


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
        <NewApplicantForm
          submissionHandler={submitHandler}
          route="/new-applicant"
        />

      </div>
    )
}