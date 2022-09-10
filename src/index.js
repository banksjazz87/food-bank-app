import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/App.scss';
import './assets/styles/index.scss';
import './assets/styles/foodBankList.scss';
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
import FoodBankList from "./views/foodBankList.jsx";
import PastLists from "./views/pastLists.jsx";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter style={{backgroundColor: "purple"}}>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="new_applicant" element={<Applicant />} />
      <Route path="login" element={<Login />} />
      <Route path="search" element={<SearchApplicants />} />
      <Route path="current_registered_list" element={<FoodBankList />} />
      <Route path="past_registered_list" element={<PastLists />} />
    </Routes>
  </BrowserRouter>
);



