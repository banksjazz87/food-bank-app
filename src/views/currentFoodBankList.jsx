import React, {useState, useEffect} from "react";
import NavBar from "../components/navBar.jsx";

export default function CurrentFoodBankList() {

    const [table, setTable] = useState([]);
    const [tableInfo, setTableInfo] = useState({});


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
        </div>
    )
}