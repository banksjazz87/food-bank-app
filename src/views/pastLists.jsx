import React, {useState} from "react";
import FbListSearchBar from "../components/fbListSearchBar.jsx";

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
            />

            <p>{`Current Selected List is ${list.title}`} </p>
        </div>
    )
}