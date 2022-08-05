import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Applicant from "./routes/newApplicant.jsx";
import Login from "./routes/login.jsx";
import SearchApplicants from "./routes/searchApplicants.jsx";
import FoodBankList from "./routes/foodBankList.jsx";
import PastLists from "./routes/pastLists.jsx";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
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



