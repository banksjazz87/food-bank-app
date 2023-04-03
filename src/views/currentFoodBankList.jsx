import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar.jsx";
import DisplayCurrentFoodBankList from "../components/displayCurrentFoodBankList";
import EditModuleForCurrentList from "../components/editModuleCurrentList.jsx";
import PrintFoodBankList from "../components/printFoodBankList.jsx";
import postRequest from "../functions/post.js";
import DeleteAlert from "../components/deleteAlert.jsx";
import EditPage from "../components/editDisplay.jsx";
import "../assets/styles/currentFoodBankList.scss";

//for development mode
//import DummyData from "../variables/dummyData.js";

export default function CurrentFoodBankList() {
  let initialApplicant = [{
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    city: "",
    state: "PA",
    zip: "",
    children: "",
    adults: "",
    seniors: "",
    totalOccupants: "",
    weeklyIncome: "",
    monthlyIncome: "",
    annualIncome: "",
    totalIncome: "",
    dateAltered: "",
  }
  ];

  const [tableInfo, setTableInfo] = useState({ title: "", dateCreated: "" });
  const [table, setTable] = useState([]);
  const [showRemoveButtons, setShowRemoveButtons] = useState(false);
  const [displayDeleteAlert, setDisplayDeleteAlert] = useState(false);
  const [selectedAttendant, setSelectedAttendant] = useState([]);
  const [showEditModule, setShowEditModule] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(initialApplicant);
  const [showEditPage, setShowEditPage] = useState(false);
  const [totalPresent, setTotalPresent] = useState(0);
  const [selectedRow, setSelectedRow] = useState(0);


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
          fetch(`/get-past-list/list-name/${final.allData.title}/get-all`)
            .then((data) => data.json())
            .then((result) => {
              setTable(result.allData);
              PresentCountMethods.presentCount(result.allData);
            });
        } else {
          alert(final.message);
        }
      });
  }, []);




  //This function will be used to just update the current table data, replacing it with a new array.
  const updateTable = (arr) => {
    setTable(arr);
  };

  //Used to update the selected applicant this will be passed to the edit page component.
  const updateSelectedApplicant = (arr) => {
    setSelectedApplicant(arr);
  }

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
    copyOfChosen[0].present = 'false';

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

  //Function used to remove an applicant from the list.
  const selectedForRemoval = (index, arr) => {
    const copyOfArr = arr.slice();
    const chosenFromArr = copyOfArr.slice(index, index + 1);
    setSelectedAttendant(chosenFromArr);
    setShowRemoveButtons(false);
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
    showEditHandler();
  };


  //This will be used to set the selected applicant that needs updated, and display the edit page.
  const setEditApplicant = (arr, index) => {
    clearSelectedApplicant();
    setSelectedApplicant([arr[index]]);
    setSelectedRow(index);
    setShowEditPage(true);

    setTimeout(() => {
      const editPage = document.getElementById("edit_form");
      editPage.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  //This will clear the previously selected applicant.
  const clearSelectedApplicant = () => {
    const editForm = document.getElementById('edit_form');
    editForm.reset();
    setSelectedApplicant(initialApplicant);
  }

  //This will update the current applicant's information, used if an applicant has missing information in their application.
  const updateInfo = (field, value) => {
    const currentDate = new Date();
    let currentApplicant = selectedApplicant.slice();

    currentApplicant[0][field] = value;
    currentApplicant[0]["dateAltered"] = currentDate.toLocaleDateString();

    setSelectedApplicant(currentApplicant);
  };

  //This will hide the eidt page after it has been submitted and then it will scroll back to the selected row.
  const hideEditPage = () => {
    setShowEditPage(false);

    setTimeout(() => {

      let currentRow = "";

      if (window.innerWidth > 1024) {
        currentRow = document.getElementById(`row_number_${selectedRow}`);
        currentRow.scrollIntoView({ behavior: "smooth" });
      } else {
        currentRow = document.getElementById(`mobile_row_number_${selectedRow}`);

      }

      currentRow.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  //This will return the number of applicants who have gone through the foodbank.
  const PresentCountMethods = {
    presentCount: function (arr) {
      let count = 0;

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].present === "true") {
          count = count + 1;
        }
      }
      return setTotalPresent(count);
    },

    incrementPresentCount: function (num) {
      return setTotalPresent(num + 1);
    },

    decrementPresentCount: function (num) {
      return setTotalPresent(num - 1);
    },
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
        editHandler={setEditApplicant}
        incrementHandler={PresentCountMethods.incrementPresentCount}
        decrementHandler={PresentCountMethods.decrementPresentCount}
        presentCount={totalPresent}
        progressText={`Foodbank Progress: ${totalPresent}/${table.length}`}
      />

      <PrintFoodBankList
        tableTitle={tableInfo.title}
        tableData={table}
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
          class="edit_button"
          type="button"
          onClick={() => window.print()}
        >
          Print
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
      <EditPage
        display={showEditPage}
        currentApplicant={selectedApplicant}
        handleChange={updateInfo}
        hidePage={hideEditPage}
        clearForm={clearSelectedApplicant}
        updateApplicant={updateSelectedApplicant}
      />
    </div>
  );
}
