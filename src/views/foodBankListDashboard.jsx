import React, {useState} from "react";
import FBDashboardIcon from "../components/dashboardIcon.jsx";
import NavBar from "../components/navBar.jsx";

import CreateFbList from "../components/createFbList.jsx";
import "../assets/styles/fbListDashboard.scss";



export default function FoodBankListDashboard() {

const [showCreate, setShowCreate] = useState(false);

  return (
    <div id="fb_list_dashboard">

      <h1>FB List Dashboard</h1>
      <NavBar />

    <div id="icon_wrapper">
      <CreateFbList
       clickHandler={() => setShowCreate(true)}
       showForm={showCreate}
       />
        

        <div id="search_past_lists">
        <FBDashboardIcon title="Search Lists" />
        </div>
      </div>
    </div>
  );
}
