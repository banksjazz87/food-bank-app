import React, { useState } from "react";
import FbListSearchBar from "../components/fbListSearchBar.jsx";
import NavBar from "../components/navBar.jsx";
import DisplayFbList from "../components/displayFbList.jsx";
import DeleteAlert from "../components/deleteAlert.jsx";

export default function PastLists() {
  const [list, setList] = useState({
    Table_ID: "",
    title: "",
    DateCreated: "",
  });
  const selectedList = (array, index) => {
    setList({
      ...list,
      Table_ID: array[index].Table_ID,
      title: array[index].title,
      DateCreated: array[index].DateCreated,
    });
  };

  const [listAttendants, setListAttendants] = useState([]);
  const updateAttendants = (array) => {
    setListAttendants(array);
  };

  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showList, setShowList] = useState(false);
  const displayList = () => {
    if (showList === false) {
      setShowList(true);
      setShowDeleteButton(true);
    }
  };

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  return (
    <div id="past_lists-wrapper">
      <div className="header_wrapper">
        <h1>All Past Lists</h1>
      </div>
      <NavBar />
      <FbListSearchBar
        changeHandler={selectedList}
        selectedItem={list}
        updateAttendants={updateAttendants}
        displayListHandler={displayList}
      />

      <DisplayFbList
        allAttendants={listAttendants}
        title={list.title}
        dateModified={list.DateCreated}
        displayList={showList}
      />

      <button
        id="delete_table_button" 
        style={showDeleteButton ? {display: ""} : {display: "none"}}
        onClick={() => {
          setShowDeleteAlert(true);
        }}
      >
        Delete Table
      </button>

      <DeleteAlert
        noClickHandler={() => {
          setShowDeleteAlert(false);
        }}
        display={showDeleteAlert}
        routePath={"/delete-list"}
        selected={list}
      />
    </div>
  );
}
