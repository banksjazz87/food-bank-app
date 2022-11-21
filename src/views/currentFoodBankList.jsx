import React, {useState, useEffect} from "react";
import NavBar from "../components/navBar.jsx";
import DisplayCurrentFoodBankList from "../components/displayCurrentFoodBankList";
import EditModuleForCurrentList from "../components/editModuleCurrentList.jsx";
import putRequest from "../functions/putRequest.js";

export default function CurrentFoodBankList() {

  //This will hold the value for the table title and date created.
  const [tableInfo, setTableInfo] = useState({});

  //This will hold all of the values of the most recent table.
  const [table, setTable] = useState([]);

  //Setting the tableInfo as well as the table data on the initial render.
  useEffect(() => {
    fetch("/most-recent-fb-list")
      .then((data) => data.json())
      .then((final) => {
        if (final.message === "success") {
          setTableInfo({
            ...tableInfo,
            title: final.allData.title,
            dateCreated: final.allData.dateCreated,
          });
          fetch(`/get-past-list/list-name/${final.allData.title}`)
            .then((data) => data.json())
            .then((result) => setTable(result.allData));
        } else {
          alert(final.message);
        }
      });
  }, []);

  const updateTable = (arr) => {
    setTable(arr);
  }

  

  //The actual put request for updating whether the attendant is present or not.
  const requestAttendantPresence = (
    tableName,
    firstName,
    lastName,
    id,
    presence
  ) => {
    let requestObj = {
      title: tableName,
      firstName: firstName,
      lastName: lastName,
      ApplicantID: id,
      present: presence,
    };

    putRequest("/update-attendant-status", requestObj).then((data) =>
      alert(data.message)
    );
  };

  //Update the attendant Present status in the database.
  const updateAttendantPresentInDb = (arr, index) => {
    let currentTable = tableInfo.title;
    let first = arr[index].firstName;
    let last = arr[index].lastName;
    let id = arr[index].ApplicantID;
    let present = arr[index].present;

    if (present === "false") {
      requestAttendantPresence(currentTable, first, last, id, "true");
    } else {
      requestAttendantPresence(currentTable, first, last, id, "false");
    }
  };
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
      <DisplayCurrentFoodBankList
        currentData={table}
        updateTableHandler={updateTable}
      />
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
