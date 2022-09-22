import React from "react"
import dataPoints from "../variables/newApplicantDataPoints.js";

export default function DisplayApplicant(props){
    const displayFields = dataPoints.map((x, y) => {
        if (x.name === "dateAltered") {
            return (
                <p key={`date`}>{props.currentValue[0][x.name]}</p>
            )
        }
        if (x.name === null) {
            return (
                <h1 key={`header_${y}`}>{x.placeHolder}</h1>
            )
        } else {
        return (
        <>
            <p key={`description_${y}`}>{`${x.placeHolder}: `}</p>
            <p key={`value_${y}`}>{props.currentValue[0][x.name]}</p>
        </>
        )
        }
    });
    return (
        {displayFields}
    )
}