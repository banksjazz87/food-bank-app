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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="new_applicant" element={<Applicant />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);



