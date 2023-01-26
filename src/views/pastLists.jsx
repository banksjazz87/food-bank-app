import React, { useEffect, useState } from "react";
import FbListSearchBar from "../components/fbListSearchBar.jsx";
import NavBar from "../components/navBar.jsx";
import DisplayFbList from "../components/displayFbList.jsx";
import DeleteAlert from "../components/deleteAlert.jsx";

export default function PastLists() {
  const [mobileScreen, setMobileScreen] = useState(false);
  const [listAttendants, setListAttendants] = useState([]);
  const [showList, setShowList] = useState(false);
  const [list, setList] = useState({
    Table_ID: "",
    title: "",
    DateCreated: "",
  });

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setMobileScreen(true);
    }
  }, []);

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 1024) {
      setMobileScreen(true);
    } else {
      setMobileScreen(false);
    }
  });

  const selectedList = (array, index) => {
    setList({
      ...list,
      Table_ID: array[index].Table_ID,
      title: array[index].title,
      DateCreated: array[index].DateCreated,
    });
    hideList();
  };

  const updateAttendants = (array) => {
    setListAttendants(array);
  };

  const displayList = () => {
    if (showList === false) {
      setShowList(true);
    }
  };

  const hideList = () => {
    if (showList) {
      setShowList(false);
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
        title="Past Lists"
      />

      <div
        id="display_list"
        style={showList ? { display: "" } : { display: "none" }}
      >
        <DisplayFbList
          allAttendants={listAttendants}
          title={list.title}
          dateModified={list.DateCreated}
          displayList={showList}
          mobileDevice={mobileScreen}
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
