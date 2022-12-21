import React, { useState } from "react";
import NavBar from "../components/navBar.jsx";
import postRequest from "../functions/post.js";
import SearchBar from "../components/searchBar.jsx";
import deleteRequest from "../functions/deleteRequest.js";
import "../assets/styles/createFBList.scss";

export default function CreateFoodBankList() {
  const [listName, setListName] = useState({ title: "" });
  const [listData, setListData] = useState({
    title: "",
    attendants: [],
    firstLast: [],
  });
  const [showListInput, setShowListInput] = useState(true);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showApplicantBar, setShowApplicantBar] = useState(false);

  //For Production
  //Function that is used when the submit button is pushed after creating the title.
  /* const submitListTitle = () => {
    postRequest("/new_foodbank_list", listName).then((data) => {
      if (data.message === "success") {
        setListData({ ...listData, title: data.title });
        setShowApplicantBar(true);
        setShowListInput(false);
      } else {
        alert(data.message);
      }
    });
  };*/

  //for development
  const submitListTitle = () => {
    setListData({ ...listData, title: listName.title });
    setShowApplicantBar(true);
    setShowListInput(false);
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

    //for development
    const previousAttendants = listData.attendants.slice();
    setListData({
      ...listData,
      attendants: previousAttendants.concat(array),
    });

    //For production
    /*let previousFirstLast = listData.firstLast.slice();
    let currentFirstLast = `${array[0].firstName}${array[0].lastName}`;


    if (previousFirstLast.indexOf(currentFirstLast) === -1) {
      const previousAttendants = listData.attendants.slice();
      setListData({
        ...listData,
        attendants: previousAttendants.concat(array),
        firstLast: previousFirstLast.concat([currentFirstLast]),
      });
      //production
      //saveList(listData.title, array[0]);
    } else {
      alert(
        `${array[0].firstName} ${array[0].lastName} is already included in the current list.`
      );
    }*/
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

  const displayAttendants = (array) => {
    const layOutApplicants = array.map((x, y) => {
      return (
        <tr applicantNumber={y} className="applicant_pair" key={`attendant_y`}>
          <td>{`${y + 1}.`}</td>
          <td>{`${x.lastName}`}</td>
          <td>{`${x.firstName}`}</td>
          <td>
            <button
              id={y}
              class="delete_button"
              style={editMode ? { display: "" } : { display: "none" }}
              onClick={(e) => {
                //For Production
                /*deleteAttendantFromList(e.target.id);
              deleteAttendantFromDatabase(
                listData.attendants,
                e.target.id,
                listData.title
              );*/
                setEditMode(false);
              }}
            >
              X
            </button>
          </td>
        </tr>
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
        style={showListInput ? { display: "" } : { display: "none" }}
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
          placeHolder="MonthYear"
          onChange={(e) => setListName({ ...listName, title: e.target.value })}
        />
        <input class="new_list_submit" type="submit" value="Submit" />
      </form>
      <div
        id="applicant_search_and_list"
        style={showApplicantBar ? { display: "" } : { display: "none" }}
      >
        <SearchBar
          handleChange={addNewAttendant}
          value="Add To List"
          route="/all-applicants"
          title="All Applicants"
          description="all-applicants"
          show={true}
        />
        <div id="fb_list_wrapper">
          <h1 className="table_heading">{listData.title}</h1>
          <table>
            <tr id="header_row">
              <th>ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th></th>
            </tr>

            {displayAttendants(listData.attendants)}
          </table>
          <div
            id="button_wrapper"
            style={displayEdit ? { display: "" } : { display: "none" }}
          >
            <button
              class="edit_button"
              type="button"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
            <button
              class="cancel_button"
              type="button"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
