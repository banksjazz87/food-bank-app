import React from "react"
import dataPoints from "../variables/newApplicantDataPoints.js";

export default function DisplayApplicant(props){

    const displayFields = dataPoints.map((x, y) => {
        if (x.name === "dateAltered") {
            return (
                <p key={`date`} className="date_altered">{`Date Altered: ${props.currentApplicant[0][x.name]}`}</p>
            )
        } else if (x.value === null) {
            return (
                <h1 key={`header_${y}`}>{x.placeHolder}</h1>
            )
        } else {
        return (
        <>
            <p key={`description_${y}`}>{`${x.placeHolder}: ${props.currentApplicant[0][x.name]}`}</p>
        </>
        )
        }
    });


    return (
        <div 
            id="display_applicant_wrapper"
            style={props.display ? {display: "flex"} : {display: "none"}}
        >
        {displayFields}
        </div>
    )
}