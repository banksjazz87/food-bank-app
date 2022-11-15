import React, {useState, useEffect} from "react";
import NavBar from "../components/navBar.jsx";
import DisplayCurrentFoodBankList from "../components/displayCurrentFoodBankList";

export default function CurrentFoodBankList() {

    //This will hold the value for the table title and date created.
    const [tableInfo, setTableInfo] = useState({});

    //This will hold all of the values of the most recent table.
    const [table, setTable] = useState([]);
    
    //Setting the tableInfo as well as the table data on the initial render.
    useEffect(() => {
        fetch('/most-recent-fb-list')
            .then((data) => data.json())
            .then((final) => {
                if (final.message === "success") {
                    setTableInfo({...tableInfo, 
                        title: final.allData.title, 
                        dateCreated: final.allData.dateCreated});
                    fetch(`/get-past-list/list-name/${final.allData.title}`)
                    .then((data) => data.json())
                    .then((result) => setTable(result.allData));
                } else {
                alert(final.message);
                }
            });
    }, []);

    return (
        <div id="current_fb_list">
        <h1>This will be the current foodbank list{tableInfo.title ? tableInfo.title : "waiting"}</h1>
        
        <NavBar />

        <DisplayCurrentFoodBankList
            tableData={table}
            title={tableInfo.title}
         />
        </div>
    )
}