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

  const updateTable = (arr) => {
    setTable(arr);
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

      />


      <button 
        class="edit_button"
        type="button" 
        onClick={showEditHandler}>Edit</button>
    </div>
  );
}
