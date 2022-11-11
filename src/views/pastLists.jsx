import React, { useState } from "react";
import FbListSearchBar from "../components/fbListSearchBar.jsx";
import deleteRequest from "../functions/deleteRequest.js";
import NavBar from "../components/navBar.jsx";
import DisplayList from "../components/displayFbList.jsx";

export default function PastLists() {
  const [list, setList] = useState({
    Table_ID: "",
    title: "testing",
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
  return (
    <div id="past_lists-wrapper">
      <h1>All Past Lists</h1>
      <NavBar />
      <FbListSearchBar
        changeHandler={selectedList}
        selectedItem={list}
        updateAttendants={updateAttendants}
      />

      <p>{`Current Selected List is ${list.title}`} </p>
      <button
        onClick={() => {
          deleteRequest("/delete-list", list).then((data) =>
            alert(data.message)
          );
        }}
      >
        Delete Table
      </button>
      <DisplayList
        allAttendants={listAttendants}
        title={list.title}
        dateModified={list.DateCreated}
      />

    <button
        onClick={() => {
          deleteRequest("/delete-list", list).then((data) =>
            alert(data.message)
          );
        }}
      >
        Delete Table
      </button>
    </div>
  );
}
