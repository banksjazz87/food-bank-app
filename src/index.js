import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/App.scss";
import "./assets/styles/index.scss";
import "./assets/styles/displayCurrentFoodBankList.scss";
import "./assets/styles/login.scss";
import "./assets/styles/newApplicantPage.scss";
import "./assets/styles/newApplicantForm.scss";
import "./assets/styles/pastLists.scss";
import "./assets/styles/searchApplicants.scss";
import "./assets/styles/root.scss";
import "./assets/styles/printedApplicantForm.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Applicant from "./views/newApplicantPage.jsx";
import Login from "./views/login.jsx";
import SearchApplicants from "./views/searchApplicants.jsx";
import DisplayCurrentFoodBankList from "./views/currentFoodBankList.jsx";
import PastLists from "./views/pastLists.jsx";
import Dashboard from "./views/dashBoard.jsx";
import FoodBankListDashboard from "./views/foodBankListDashboard.jsx";
import CreateFoodBankList from "./views/createFoodBankList.jsx";
import PrintedApplicantForm from "./views/printedApplicantForm.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter style={{ backgroundColor: "purple" }}>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="new_applicant" element={<Applicant />} />
      <Route path="login" element={<Login />} />
      <Route path="search" element={<SearchApplicants />} />
      <Route path="current-registered-list" element={<DisplayCurrentFoodBankList />}/>
      <Route path="foodbank-list-dashboard" element={<FoodBankListDashboard />}/>
      <Route path="create-foodbank-list" element={<CreateFoodBankList />} />
      <Route path="past-registered-list" element={<PastLists />} />
      <Route path="printed-applicant-form" element={<PrintedApplicantForm />} />
    </Routes>
  </BrowserRouter>
);
