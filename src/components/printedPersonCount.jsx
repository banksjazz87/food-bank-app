import React from "react";

export default function PrintedPersonCount(props){
    return (
        <div className="person_count">
            <p>{props.title}</p>
            <div className="person_quantity">
                {props.count}
            </div>
        </div>
    )
}