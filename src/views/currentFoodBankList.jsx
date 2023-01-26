import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar.jsx";
import DisplayCurrentFoodBankList from "../components/displayCurrentFoodBankList";
import EditModuleForCurrentList from "../components/editModuleCurrentList.jsx";
import postRequest from "../functions/post.js";
import DeleteAlert from "../components/deleteAlert.jsx";
import "../assets/styles/currentFoodBankList.scss";

//for development mode
//import DummyData from "../variables/dummyData.js";

export default function CurrentFoodBankList() {
  const [tableInfo, setTableInfo] = useState({ title: "", dateCreated: "" });
  const [table, setTable] = useState([]);
  const [showRemoveButtons, setShowRemoveButtons] = useState(false);
  const [displayDeleteAlert, setDisplayDeleteAlert] = useState(false);
  const [selectedAttendant, setSelectedAttendant] = useState([]);
  const [showEditModule, setShowEditModule] = useState(false);

  ///Comment out for development
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

  //This function will be used to just update the current table data, replacing it with a new array.
  const updateTable = (arr) => {
    setTable(arr);
  };

  //Inserts an already existing applicant into the most recent table.
  const insertAlreadyExistingIntoTable = (arr) => {
    let applicantObj = {
      firstName: arr[0].firstName,
      lastName: arr[0].lastName,
      phone: arr[0].phone,
      ApplicantID: arr[0].ApplicantID,
    };

    postRequest(`/save-list/list-name/${tableInfo.title}`, applicantObj).then(
      (data) => {
        if (data.message !== "success") {
          alert(data.message);
        }
      }
    );
  };

  //This function will add an already existing applicant to the current foodbank list.
  const addApplicant = (chosenNameArr) => {
    let copyOfArr = table.slice();
    let selectedName = `${chosenNameArr[0].firstName}${chosenNameArr[0].lastName}`;

    //Make a copy of the chosenNameArr and then add the present field of false to it.
    let copyOfChosen = chosenNameArr.slice();
    copyOfChosen[0].present = "false";

    let firstLast = copyOfArr.map((x, y) => {
      let first = x.firstName;
      let last = x.lastName;
      return first + last;
    });

    if (firstLast.indexOf(selectedName) > -1) {
      alert("This person is already included in this table");
      setShowEditModule(false);
    } else {
      setTable(copyOfArr.concat(copyOfChosen));
      insertAlreadyExistingIntoTable(chosenNameArr);
      setShowEditModule(false);
    }
  };

  const showEditHandler = () => {
    if (showEditModule) {
      setShowEditModule(false);
    } else {
      setShowEditModule(true);
    }
  };

  const selectedForRemoval = (index, arr) => {
    const copyOfArr = arr.slice();
    const chosenFromArr = copyOfArr.slice(index, index + 1);
    setSelectedAttendant(chosenFromArr);
  };

  const removeFromArray = (fullArr, selectedArr) => {
    const allFirstLast = fullArr.map((x, y) => {
      let fullName = `${x.firstName}${x.lastName}`;
      return fullName;
    });

    const selectedFirstLast = `${selectedArr[0].firstName}${selectedArr[0].lastName}`;

    if (allFirstLast.indexOf(selectedFirstLast) > -1) {
      const copyOfFull = fullArr.slice();
      copyOfFull.splice(allFirstLast.indexOf(selectedFirstLast), 1);
      return setTable(copyOfFull);
    }
  };

  //This will be use to add a brand new applicant to the table.
  const addNewToTable = (obj) => {
    const currentTable = table.slice();
    const arrayOfNeededFields = [
      {
        firstName: obj.firstName,
        lastName: obj.lastName,
        phone: obj.phone,
        present: obj.present,
        ApplicantID: obj.ApplicantID,
      },
    ];

    setTable(currentTable.concat(arrayOfNeededFields));
  };

  return (
    <div id="current_fb_list">
      <div className="header_wrapper">
        <h1 className="header">Current Food Bank List</h1>
      </div>

      <NavBar />
      <DisplayCurrentFoodBankList
        //Conditional currentTableData is only for developement
        currentTableData={table}
        tableDetails={tableInfo}
        updateTableHandler={updateTable}
        showRemoveBtns={showRemoveButtons}
        selectedRemovalHandler={selectedForRemoval}
        showDeleteAlertHandler={() => setDisplayDeleteAlert(true)}
      />
      <EditModuleForCurrentList
        display={showEditModule}
        searchBarClick={addApplicant}
        tableDetails={tableInfo}
        allTableData={table}
        showRemoveHandler={() => {
          setShowRemoveButtons(true);
          setShowEditModule(false);
        }}
        hideModuleHandler={() => setShowEditModule(false)}
        addNewHandler={addNewToTable}
      />

      <DeleteAlert
        display={displayDeleteAlert}
        routePath={`/remove-attendant/table/${tableInfo.title}`}
        selected={selectedAttendant[0]}
        warningMessage={
          selectedAttendant.length > 0
            ? `Are you sure that you would like to remove ${selectedAttendant[0].firstName} ${selectedAttendant[0].lastName} from the current foodbank list?`
            : ""
        }
        noClickHandler={() => {
          setDisplayDeleteAlert(false);
        }}
        yesClickHandler={() => {
          removeFromArray(table, selectedAttendant);
          setDisplayDeleteAlert(false);
        }}
      />

      <div id="edit_cancel_button_wrapper">
        <button class="edit_button" type="button" onClick={showEditHandler}>
          Edit
        </button>

        <button
          class="cancel_button"
          type="button"
          style={showRemoveButtons ? { display: "" } : { display: "none" }}
          onClick={() => setShowRemoveButtons(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
