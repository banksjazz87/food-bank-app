import React, { useState } from "react";
import AllApplicantSearchBar from "../components/searchBar.jsx";
import DisplayApplicant from "../components/displayPastApplicant.jsx";
import EditDeleteButtons from "../components/editDeleteButtons";
import EditPage from "../components/editDisplay.jsx";
import DeleteAlert from "../components/deleteAlert.jsx";
import NavBar from "../components/navBar.jsx";
import "../assets/styles/searchApplicants.scss";

export default function SearchApplicants() {
  //Will be used to update the current information about the applicant.
  const [applicantInfo, setApplicantInfo] = useState([
    {
      firstName: "",
      lastName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      children: "",
      adults: "",
      seniors: "",
      totalOccupants: "",
      weeklyIncome: 0,
      monthlyIncome: 0,
      annualIncome: 0,
      totalIncome: 0,
      dateAltered: "",
    },
  ]);

  const [showApplicant, setShowApplicant] = useState(false);

  const [showEditPage, setShowEditPage] = useState(false);

  const [deleteAlert, setDeleteAlert] = useState(false);

  const updateApplicant = (array) => {
    setApplicantInfo(array);
    setShowApplicant(true);
    setShowEditPage(false);
  };

  const displayEdit = () => {
    setShowEditPage(true);
    setShowApplicant(false);
  };

  const updateInfo = (field, value) => {
    const currentDate = new Date();
    let currentApplicant = applicantInfo.slice();

    currentApplicant[0][field] = value;
    currentApplicant[0]["dateAltered"] = currentDate.toLocaleDateString();

    setApplicantInfo(currentApplicant);
  };

  const showDeleteAlert = () => {
    if (deleteAlert) {
      setDeleteAlert(false);
    } else {
      setDeleteAlert(true);
    }
  };

  return (
    <div id="search_applicant_wrapper">
      <h1>Search Applicants</h1>
      <NavBar />
      <AllApplicantSearchBar handleChange={updateApplicant} />
      <DisplayApplicant
        currentApplicant={applicantInfo}
        display={showApplicant}
      />
      <EditDeleteButtons
        display={showApplicant}
        editClick={displayEdit}
        deleteClick={showDeleteAlert}
      />
      <EditPage
        display={showEditPage}
        currentApplicant={applicantInfo}
        handleChange={updateInfo}
      />
      <DeleteAlert 
        display={deleteAlert} 
        handleClick={showDeleteAlert}
        currentApplicant={applicantInfo}
         />
    </div>
  );
}
