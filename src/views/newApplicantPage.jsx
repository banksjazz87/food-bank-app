import React from "react";
import { useNavigate } from "react-router-dom";
import postRequest from "../functions/post.js";
import NavBar from "../components/navBar.jsx";
import NewApplicantForm from "../components/newApplicantForm.jsx";
import "../assets/styles/newApplicantPage.scss";

export default function Applicant() {
  const navigate = useNavigate();

  const newApplicantConfirmation = (obj) => {

    if (obj.firstName.length === 0 || obj.lastName.length === 0) {
      alert('A First Name and Last Name must be provided.');
      const topOfPage = document.getElementById('new_applicant_wrapper');
      topOfPage.scrollIntoView({behavior: "smooth"});

    } else {
      
    postRequest("/new-applicant", obj).then((data) => {

      if (data.status === "okay") {
        alert(data.message);
        navigate("/dashboard", { replace: true });
      } else {
        alert(data.message);
      }

    });
  };
};

  return (
    <div id="new_applicant_wrapper">
      <div className="header_wrapper">
        <h1 className="heading_wrapper">New Applicant</h1>
      </div>
      <NavBar />
      <NewApplicantForm
        submissionHandler={newApplicantConfirmation}
        route="/new-applicant"
      />
    </div>
  );
}
