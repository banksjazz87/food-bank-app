import React, {useState, useEffect } from "react";
import AllApplicantSearchBar from "../components/searchBar.jsx";
import DisplayApplicant from "../components/displayPastApplicant.jsx";

export default function SearchApplicants() {

    const [applicantInfo, setApplicantInfo] = useState([{firstName: "Bill"}]);
    

    const updateApplicant = (array) => {
      setApplicantInfo(array);
      console.log(applicantInfo); 
    }

    
    return (
        <div>
        <h1>This will be the search all section.</h1>
        <AllApplicantSearchBar handleChange={updateApplicant}/>
        <DisplayApplicant currentApplicant={applicantInfo}/>
        <h1>{applicantInfo.length === 0 ? "Hello my name is Mark" : `Hello my name is ${applicantInfo[0].firstName}.`}</h1>
        
        </div>
    )
}