import React, { useState } from "react";
import NavBar from "../components/navBar.jsx";
import postRequest from "../functions/post.js";
import AllApplicantSearchBar from "../components/searchBar.jsx";
import deleteRequest from "../functions/deleteRequest.js";

export default function CreateFoodBankList() {
  const [listName, setListName] = useState({ title: "" });
  const [listData, setListData] = useState({
    title: "",
    attendants: [],
    firstLast: [],
  });
  const [displayEdit, setDisplayEdit] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showApplicantBar, setShowApplicantBar] = useState(false);

  //Function that is used when the submit button is pushed after creating the title.
  const submitListTitle = () => {
    postRequest("/new_foodbank_list", listName).then((data) => {
      if (data.message === "success") {
        setListData({ ...listData, title: data.title });
        setShowApplicantBar(true);
      } else {
        alert(data.message);
      }
    });
  };

  //Function to display the save and edit buttons.
  const showEdit = () => {
    if (!displayEdit) {
      setDisplayEdit(true);
    } 
  };

  //Function to save the list in the database.
  const saveList = (table, obj) => {
    postRequest(`/save-list/list-name/${table}`, obj).then((data) => {
      if (data.message !== "success") {
        alert(data.message);
      }
    });
  };

  /**
   *
   * @param {*} array
   * @description this function will check and make sure that their isn't already an attendant with the same first and last name in the list.  If there is a duplicate, an alert will be displayed notifying the user.  Otherwise, the name will be added to the list and all of the attendant data will be stored in the listData.attendants array.  The showEdit function is also called to determine if the save and edit buttons should be displayed.
   */
  const addNewAttendant = (array) => {
    showEdit();

    let previousFirstLast = listData.firstLast.slice();
    let currentFirstLast = `${array[0].firstName}${array[0].lastName}`;

    if (previousFirstLast.indexOf(currentFirstLast) === -1) {
      const previousAttendants = listData.attendants.slice();
      setListData({
        ...listData,
        attendants: previousAttendants.concat(array),
        firstLast: previousFirstLast.concat([currentFirstLast]),
      });
      saveList(listData.title, array[0]);
    } else {
      alert(
        `${array[0].firstName} ${array[0].lastName} is already included in the current list.`
      );
    }
  };

  //function to handle the delete event
  const deleteAttendantFromList = (index) => {
    const previousAttendants = listData.attendants.slice();
    previousAttendants.splice(parseInt(index), 1);
    setListData({ ...listData, attendants: previousAttendants });
  };

  //Remove attendant from the database
  const deleteAttendantFromDatabase = (array, index, table) => {
    const indexOfSelected = parseInt(index);
    deleteRequest(
      `/remove-attendant/table/${table}`,
      array[indexOfSelected]
    ).then((data) => console.log(data));
  };

  const displayApplicants = (array) => {
    const layOutApplicants = array.map((x, y) => {
      return (
        <div key={`applciant_y`}>
          <p applicantNumber={y}>{`${y + 1}. ${x.lastName}, ${x.firstName}`}</p>
          <button
            id={y}
            style={editMode ? { display: "" } : { display: "none" }}
            onClick={(e) => {
              deleteAttendantFromList(e.target.id);
              deleteAttendantFromDatabase(
                listData.attendants,
                e.target.id,
                listData.title
              );
              setEditMode(false);
            }}
          >
            Delete
          </button>
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
      <div
        id="applicant_search_and_list"
        style={showApplicantBar ? { display: "" } : { display: "none" }}
      >
        <AllApplicantSearchBar
          handleChange={addNewAttendant}
          value="Add To List"
        />
        <h1>{listData.title}</h1>
        {displayApplicants(listData.attendants)}
        <button
          class="edit_button"
          type="button"
          style={displayEdit ? { display: "" } : { display: "none" }}
          onClick={() => setEditMode(true)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
