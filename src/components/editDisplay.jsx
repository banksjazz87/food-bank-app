import React from "react";

export default function EditPage(props) {
    return (
        <h1 style={props.display ? {display: ""} : {display: "none"}}>This Will be the edit page</h1>
    )
}