import React, {useState} from "react";
import NavBar from "../components/navBar.jsx";
import DisplayCurrentFoodBankList from "../components/displayCurrentFoodBankList";
import EditModuleForCurrentList from "../components/editModuleCurrentList.jsx";

export default function CurrentFoodBankList() {
  const [showEditModule, setShowEditModule] = useState(false);

  const showEditHandler = () => {
    if (showEditModule) {
      setShowEditModule(false);
    } else {
      setShowEditModule(true);
    }
  }

  return (
    <div id="current_fb_list">
      <h1>
        This will be the current foodbank list
      </h1>

      <NavBar />
      <DisplayCurrentFoodBankList/>
      <EditModuleForCurrentList
      display={showEditModule}
        
      />


      <button 
        class="edit_button"
        type="button" 
        onClick={showEditHandler}>Edit</button>
    </div>
  );
}
