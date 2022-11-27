import React, { useState } from "react";
import AllApplicantSearchBar from "../components/searchBar.jsx";

export default function EditModuleForCurrentList(props) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showAddNewPerson, setShowAddNewPerson] = useState(false);



  return (
    <div
      id="cl_edit_module_wrapper"
      style={props.display ? { display: "" } : { display: "none" }}
    >
      <div id="cl_edit_module_questions">
        <h3>Would you like to: </h3>
        <button type="button" onClick={() => setShowSearchBar(true)}>
          Add an already exisiting applicant?
        </button>
        <button type="button" onClick={() => setShowAddNewPerson(true)}>
          Add someone who has yet to apply?
        </button>
        <button type="button" onClick={props.showRemoveHandler}>Remove someone from the current list?</button>
        <button>Cancel</button>
      </div>
      <div
        id="cl_edit_module_searchBar"
        style={showSearchBar ? { display: "" } : { display: "none" }}
      >
        <AllApplicantSearchBar 
          handleChange={props.searchBarClick}
        />
      </div>

      <div
        id="cl_edit_module_addNew"
        style={showAddNewPerson ? { display: "" } : { display: "none" }}
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
          <input type="text" id="firstName" name="firstName" />
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" />
          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
}
