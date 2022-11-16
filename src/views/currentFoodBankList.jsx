import React from "react";
import NavBar from "../components/navBar.jsx";
import DisplayCurrentFoodBankList from "../components/displayCurrentFoodBankList";

export default function CurrentFoodBankList() {
  return (
    <div id="current_fb_list">
      <h1>
        This will be the current foodbank list
      </h1>

      <NavBar />

      <DisplayCurrentFoodBankList/>
    </div>
  );
}
