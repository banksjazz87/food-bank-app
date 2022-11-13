import React, { useState } from "react";
import FbListSearchBar from "../components/fbListSearchBar.jsx";
import deleteRequest from "../functions/deleteRequest.js";
import NavBar from "../components/navBar.jsx";
import DisplayList from "../components/displayFbList.jsx";
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
  }

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  return (
    <div id="past_lists-wrapper">
      <h1>All Past Lists</h1>
      <NavBar />
      <FbListSearchBar
        changeHandler={selectedList}
        selectedItem={list}
        updateAttendants={updateAttendants}
        displayListHandler={displayList}
      />
     
      <DisplayList
        allAttendants={listAttendants}
        title={list.title}
        dateModified={list.DateCreated}
        displayList={showList}
      />

    <button
        onClick={() => {
          setShowDeleteAlert(true);
        }}
      >
        Delete Table
      </button>

      <DeleteAlert 
        noClickHandler={() => {setShowDeleteAlert(false)}}
        display={showDeleteAlert}
        routePath={"/delete-list"}
        selected={list}
    />
    </div>
  );
}
