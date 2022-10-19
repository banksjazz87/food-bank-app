import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/App.scss';
import './assets/styles/index.scss';
import './assets/styles/displayFoodBankList.scss';
import './assets/styles/login.scss';
import './assets/styles/newApplicant.scss';
import './assets/styles/pastLists.scss';
import './assets/styles/searchApplicants.scss';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Applicant from "./views/newApplicant.jsx";
import Login from "./views/login.jsx";
import SearchApplicants from "./views/searchApplicants.jsx";
import DisplayFoodBankList from "./views/displayFoodBankList.jsx";
import PastLists from "./views/pastLists.jsx";
import Dashboard from "./views/dashBoard.jsx";
import FoodBankListDashboard from "./views/foodBankListDashboard.jsx";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter style={{backgroundColor: "purple"}}>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="new_applicant" element={<Applicant />} />
      <Route path="login" element={<Login />} />
      <Route path="search" element={<SearchApplicants />} />
      <Route path="current_registered_list" element={<DisplayFoodBankList />} />
      <Route path="foodbank-list-dashboard" element={<FoodBankListDashboard />} />

      <Route path="past_registered_list" element={<PastLists />} />
    </Routes>
  </BrowserRouter>
);



