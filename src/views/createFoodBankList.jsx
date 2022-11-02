import React, { useState } from "react";
import NavBar from "../components/navBar.jsx";
import postRequest from "../functions/post.js";
import AllApplicantSearchBar from "../components/searchBar.jsx";


export default function CreateFoodBankList(props) {
  const [listName, setListName] = useState({ title: "" });
  const [listData, setListData] = useState({
    title: "",
    attendants: [],
  });
  const [editMode, setEditMode] = useState(false);



  //Function that is used when the submit button is pushed after creating the title.
  const submitListTitle = () => {
    postRequest("/new_foodbank_list", listName).then((data) => {
      if (data.message === "success") {
        setListData({ ...listData, title: data.title });
      } else {
        alert(data.message);
      }
    });
  };

  //Function used to add a new attendant to the foodbank list.
  const addNewAttendant = (array) => {
    const previousAttendants = listData.attendants.slice();
    setListData({ ...listData, attendants: previousAttendants.concat(array) });
  };

  //Function to save the list in the database.
  const saveList = () => {
    postRequest(`/save-list/list-name/${listData.title}`, listData).then((data) => alert(data.message)
    );
  };

 

  const displayApplicants = (array) => {
    const layOutApplicants = array.map((x, y) => {
      return (
        <div key={`applciant_y`}>
          <p applicantNumber={y}>{`${y + 1}. ${x.lastName}, ${x.firstName}`}</p>
          <button 
            id={y} 
            style={editMode ? {display: ""} : {display: "none"}} 
            onClick={(e) => {
              const previousAttendants = listData.attendants.slice();
              previousAttendants.splice(parseInt(e.target.id), 1);
               setListData({...listData, attendants: previousAttendants})
               }
            }
            >
            Delete</button>
        </div>
      );
    });
    if (array.length > 0) {
      return layOutApplicants;
    }
  };

  return (
    <div id="create_list_wrapper">
      <div class="header_wrapper">
        <h1>Create Foodbank List</h1>
      </div>

      <NavBar />
      <form
        action="/new_foodbank_list"
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          submitListTitle();
        }}
      >
        <label for="food_bank_list_name">New List Name</label>
        <input
          id="food_bank_list_name"
          name="food_bank_list_name"
          type="text"
          placeHolder="new name"
          onChange={(e) => setListName({ ...listName, title: e.target.value })}
        />
        <input type="submit" value="Submit" />
      </form>
      <AllApplicantSearchBar
        handleChange={addNewAttendant}
        value="Add To List"
      />
      <h1>{listData.title}</h1>
      {displayApplicants(listData.attendants)}
      <button class="save_button" type="button" onClick={saveList}>
        Save
      </button>
      <button 
        class="edit_button" 
        type="button" 
        onClick={() => setEditMode(true)}
        >Edit</button>
    </div>
  );
}
