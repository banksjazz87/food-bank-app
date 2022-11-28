import React from "react";

export default function AddNewApplicantForm (props) {

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
              props.nameHandler("firstName", e.target.value);
            }}
            />
          <label for="lastName">Last Name:</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName"
            onChange={(e) => {
              props.nameHandler("lastName", e.target.value)
            }} />
          <input 
            type="submit" 
            value="submit" 
            onClick={(e) => {
              e.preventDefault();
              
            }} 
            />
        </form>
      </div>
    )
}