import React, {useState, useEffect} from "react";
import NavBar from "../components/navBar.jsx";

export default function CurrentFoodBankList() {
    const [table, setTable] = useState([]);

    useEffect(() => {
        fetch('/most-recent-fb-list')
            .then((data) => data.json())
            .then((final) => {
                alert(final.message);
            })
    }, []);
    return (
        <div id="current_fb_list">
        <h1>This will be the current foodbank list</h1>
        <NavBar />
        </div>
    )
}