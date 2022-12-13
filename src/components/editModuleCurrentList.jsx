import React, { useState } from "react";
import SearchBar from "../components/searchBar.jsx";
import AddPartialApplicantForm from "./addPartialApplicantForm.jsx";
import "../assets/styles/editModuleCurrentList.scss";

export default function EditModuleForCurrentList(props) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showAddNewPerson, setShowAddNewPerson] = useState(false);

  const hidePreviousSelected = () => {
    setShowSearchBar(false);
    setShowAddNewPerson(false);
  }

  return (
    <div
      id="cl_edit_module_wrapper"
      style={props.display ? { display: "" } : { display: "none" }}
    >
      <div id="cl_edit_module_questions">
        <h3>Would you like to: </h3>
        <div id="button_wrapper">
          <button type="button" onClick={() => setShowSearchBar(true)}>
            Add Existing
          </button>

          <button type="button" onClick={() => setShowAddNewPerson(true)}>
            Add New 
          </button>

          <button type="button" onClick={props.showRemoveHandler}>
            Remove 
          </button>

          <button 
            onClick={() => {
                props.hideModuleHandler();
                hidePreviousSelected();
          }
          }>Cancel</button>
        </div>
      </div>
      <div
        id="cl_edit_module_searchBar"
        style={showSearchBar ? { display: "" } : { display: "none" }}
      >
        <SearchBar
          handleChange={props.searchBarClick}
          route="/all-applicants"
          show={true}
          title="Search All Applicants"
        />
      </div>
      <AddPartialApplicantForm
        showForm={showAddNewPerson}
        nameHandler={props.newApplicantHandler}
        tableInfo={props.tableDetails}
        addToTable={props.addNewHandler}
      />
    </div>
  );
}
