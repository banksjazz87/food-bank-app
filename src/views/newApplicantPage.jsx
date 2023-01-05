import React from "react";
import { useNavigate } from "react-router-dom";
import postRequest from "../functions/post.js";
import NavBar from "../components/navBar.jsx";
import NewApplicantForm from "../components/newApplicantForm.jsx";
import Footer from "../components/footer.jsx";
import "../assets/styles/newApplicantPage.scss";

export default function Applicant() {
  const navigate = useNavigate();
  const newApplicantConfirmation = (obj) => {
    postRequest("/new-applicant", obj).then((data) => {
      if (data.status === "okay") {
        alert(data.message);
        navigate("/dashboard", { replace: true });
      } else {
        alert(data.message);
      }
    });
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
    <Footer />
    </div>
  );
}
