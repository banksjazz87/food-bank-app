import React from "react";
import postRequest from "../functions/post.js";
import NewApplicantForm from "../components/newApplicantForm.jsx";

export default function AddPartialApplicantForm(props) {

  /**
   *
   * @param {*} obj
   * @param {*} id
   * @returns an update to the table displayed for the user after a new applicant is added to the table.
   * @comments takes the current applicant data and the newly determined id and inserts the applicant into the current table and also updates the table data stored in the parent to change the display.
   */
  const addApplicantToDb = (obj, id) => {
    const copyOfObj = obj;
    copyOfObj.ApplicantID = id;
    copyOfObj.present = "false";

    postRequest(
      `/save-list/list-name/${props.tableInfo.title}`,
      copyOfObj
    ).then((data) => {
      alert(data.message);
      props.addToTable(copyOfObj);
      props.hideForm();
    });
  };

  const submitHandler = (newApplicantObj) => {
    fetch("/all-applicants")
      .then((data) => data.json())
      .then((final) => {
        const currentFirstLast = `${newApplicantObj.firstName}${newApplicantObj.lastName}`;

        const firstLastOfAll = final.map((x, y) => {
          return `${x.firstName}${x.lastName}`;
        });

        if (firstLastOfAll.indexOf(currentFirstLast) > -1) {
          alert("This person is already in the database");
        } else {
          postRequest("/new-applicant/", newApplicantObj).then((data) => {
            if (data.status === "okay") {
              addApplicantToDb(newApplicantObj, data.id);
            } else {
              alert(data.message);
            }
          });
        }
      });
  };

  return (
    <div
      id="cl_edit_module_addNew"
      style={props.showForm ? { display: "" } : { display: "none" }}
    >
      <NewApplicantForm
        submissionHandler={submitHandler}
        route="/new-applicant"
      />
    </div>
  );
}
