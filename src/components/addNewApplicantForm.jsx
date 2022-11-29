import React, { useState } from "react";

export default function AddNewApplicantForm (props) {

  const [newApplicant, setNewApplicant] = useState({firstName: "", lastName: ""});

  const createNewApplicant = (field, value) => {
    setNewApplicant({...newApplicant, 
      [field]: value});

      console.log(newApplicant);
  }

  const submitHandler = (newApplicantObj) => {
    const applicantSearch = fetch("/all-applicants")
                          .then(data => data.json())
                          .then(final => {
                            return final;
                          }
                            );
    const currentFirstLast = `${newApplicant.firstName}${newApplicant.lastName}`;

    const firstLastOfAll = applicantSearch.map((x, y) => {
      return `${x.firstName}${x.lastName}`;
  });

    if (firstLastOfAll.indexOf(currentFirstLast) > -1 ) {
      alert("this person is alreday a current registered applicant");
    }

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
              submitHandler();
            }} 
            />
        </form>
      </div>
    )
}