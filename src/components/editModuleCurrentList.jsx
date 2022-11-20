import React, { useState } from "react";
import AllApplicantSearchBar from "../components/searchBar.jsx";

export default function EditModuleForCurrentList(props) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div
      id="cl_edit_module_wrapper"
      style={props.display ? { display: "" } : { display: "none" }}
    >
      <div id="cl_edit_module_questions">
        <h3>Would you like to: </h3>
        <button 
            type="button" 
            onClick={() => setShowSearchBar(true)}
        >
          Add an already exisiting applicant?
        </button>
        <button> Add someone who has yet to apply?</button>
        <button>Remove someone from the current list?</button>
        <button>Cancel</button>
      </div>
      <div
        id="cl_edit_module_searchBar"
        style={showSearchBar ? { display: "" } : { display: "none" }}
      >
        <AllApplicantSearchBar />
      </div>
    </div>
  );
}
