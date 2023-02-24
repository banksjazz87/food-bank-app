import React, { useState } from "react";
import SearchBar from "../components/searchBar.jsx";
import DisplayApplicant from "../components/displayApplicant.jsx";
import EditDeleteButtons from "../components/editDeleteButtons.jsx";
import EditPage from "../components/editDisplay.jsx";
import DeleteAlert from "../components/deleteAlert.jsx";
import NavBar from "../components/navBar.jsx";
import "../assets/styles/searchApplicants.scss";
import { useNavigate } from "react-router-dom";

export default function SearchApplicants() {
  const navigate = useNavigate();

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
  const [searchBy, setSearchBy] = useState("");

  //This is called when the user selects an option from a SearchBar.
  const updateApplicant = (array) => {
    setApplicantInfo(array);
    setShowApplicant(true);
    setShowEditPage(false);
    scrollToData();
  };

  //Used to display the edit page.
  const displayEdit = () => {
    setShowEditPage(true);
    setShowApplicant(false);
  };

  //Updates the applicant's info when a revision is made.
  const updateInfo = (field, value) => {
    const currentDate = new Date();
    let currentApplicant = applicantInfo.slice();

    currentApplicant[0][field] = value;
    currentApplicant[0]["dateAltered"] = currentDate.toLocaleDateString();

    setApplicantInfo(currentApplicant);
  };

  //Used to control if the DeleteAlert should be shown.
  const showDeleteAlert = () => {
    if (deleteAlert) {
      setDeleteAlert(false);
    } else {
      setDeleteAlert(true);
    }
  };

  //This is used on the select field to determine what the user is currently searching for.
  const updateSearchHandler = (selected) => {
    setSearchBy(selected);
  };

  //This is used to determine which searchbar should be displayed.
  const checkForSearching = (str) => {
    if (searchBy === str) {
      return true;
    } else {
      return false;
    }
  };

  //Scroll into view after selecting an applicant name.
  const scrollToData = () => {
    const applicantData = document.getElementById("display_applicant_wrapper");
    setTimeout(() => applicantData.scrollIntoView({ behavior: "smooth" }), 500);
  };

  return (
    <div id="search_applicant_wrapper">
      <div className="header_wrapper">
        <h1>Search Applicants</h1>
      </div>
      <NavBar />
      <div id="search_options_wrapper">
        <h2>What would you like to search for?</h2>
        <select
          id="choose_applicant_type"
          onChange={(e) => {
            e.preventDefault();
            updateSearchHandler(e.target.value);
          }}
        >
          <option>Choose from the following</option>
          <option>All Applicants</option>
          <option>Partial Forms</option>
        </select>
      </div>

      <SearchBar
        handleChange={updateApplicant}
        value="Submit"
        route="/all-applicants"
        title="All Applicants"
        description="all-applicants"
        show={checkForSearching("All Applicants")}
      />

      <SearchBar
        handleChange={updateApplicant}
        value="Submit"
        route="/all-applicants/partial-forms"
        title="Partial Forms"
        description="all-partial-forms"
        show={checkForSearching("Partial Forms")}
      />

      <DisplayApplicant
        currentApplicant={applicantInfo}
        display={showApplicant}
      />

      <EditDeleteButtons
        display={showApplicant}
        editClick={displayEdit}
        printClick={() => {
          //Set the current applicant info into the session storage.
          let currentApplicant = {
            id: applicantInfo[0].ApplicantID,
            first: applicantInfo[0].firstName,
            last: applicantInfo[0].lastName,
          };
          sessionStorage.setItem(
            "currentApplicant",
            JSON.stringify(currentApplicant)
          );

          //Navigate to the print page.
          navigate("/printed-applicant-form", { replace: true });
        }}
        deleteClick={() => {
          setDeleteAlert(true);
        }}
      />

      <EditPage
        display={showEditPage}
        currentApplicant={applicantInfo}
        handleChange={updateInfo}
      />

      <DeleteAlert
        display={deleteAlert}
        warningMessage={
          "Are you sure that you would like to permanently delete this applicant?"
        }
        noClickHandler={showDeleteAlert}
        yesClickHandler={showDeleteAlert}
        selected={applicantInfo[0]}
        routePath="/remove/applicant"
      />
    </div>
  );
}
