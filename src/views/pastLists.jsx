import React, {useState} from "react";
import FbListSearchBar from "../components/fbListSearchBar.jsx";
import deleteRequest from "../functions/deleteRequest.js";

export default function PastLists() {
    const [list, setList] = useState({Table_ID: "", title: "testing", DateCreated: ""});

    const selectedList = (array, index) => {
        setList({...list, 
            Table_ID: array[index].Table_ID,
            title: array[index].title, 
            DateCreated: array[index].DateCreated
            });
    }

    return (
        <div>
            <h1>All Past Lists</h1>
            <FbListSearchBar
            changeHandler={selectedList}
            selectedItem={list} 
            />

            <p>{`Current Selected List is ${list.title}`} </p>
            <button onClick={() => {
                deleteRequest('/delete-list', list)
                .then(data => alert(data.message));
            }}>Delete Table</button>
        </div>
    )
}