import React, {useState, useEffect} from "react";
import NavBar from "../components/navBar.jsx";
import DisplayCurrentFoodBankList from "../components/displayCurrentFoodBankList";
import EditModuleForCurrentList from "../components/editModuleCurrentList.jsx";

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

  //This function will be used to just update the current table data, replacing it with a new array.
  const updateTable = (arr) => {
    setTable(arr);
  }

  //This function will add an already existing applicant to the current foodbank list.
  const addApplicant = (arr, chosenName) => {
    let copyOfArr = arr.slice();
    let selectedName = chosenName.firstName + chosenName.lastName;
    
  
    let firstLast = copyOfArr.map((x, y) => {
      let first = x.firstName;
      let last = x.lastName;
      return first + last;
    });

    if (firstLast.indexOf(selectedName) > -1) {
      alert("This person is already included in this table");
    } else {
      alert('this person can be added to this table.')
    }
  }

  
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
        currentTableData={table}
        tableDetails={tableInfo}
        updateTableHandler={updateTable}
      />
      <EditModuleForCurrentList
      display={showEditModule}
      searchBarClick={addApplicant}

      />


      <button 
        class="edit_button"
        type="button" 
        onClick={showEditHandler
        }>Edit</button>
    </div>
  );
}
