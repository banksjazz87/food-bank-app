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

  
  const [showList, setShowList] = useState(false);
  const displayList = () => {
    if (showList === false) {
      setShowList(true);
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

    <div 
      id="display_list"
      style={showList ? {display: ""} : {display: "none"}}
      >
      <DisplayFbList
        allAttendants={listAttendants}
        title={list.title}
        dateModified={list.DateCreated}
        displayList={showList}
      />

      <button
        id="delete_table_button" 
        onClick={() => {
          setShowDeleteAlert(true);
        }}
      >
        Delete Table
      </button>
      </div>

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
