import React from "react";
import deleteRequest from "../functions/deleteRequest.js";
import MathFunctions from "../functions/mathFunctions.js";

export default function DisplayList(props) {
  const displayAttendants = props.allAttendants.map((x, y) => {
    return (
      <div key={`attendant_${y}`}>
        <p id={`attendant_${y}`}>{`${y + 1}. ${x.lastName}, ${
          x.firstName
        } `}</p>
        <button
          id={`remove_${y}`}
          type="button"
          onClick={(e) => {
            let selectedItemIndex = parseInt(
              MathFunctions.returnNums(e.target.id)
            );

            deleteRequest(
              props.removeAttendantRoute,
              props.allAttendants[selectedItemIndex]
            );

            props.removeHandler(props.allAttendants, selectedItemIndex);
          }}
        >
          Delete
        </button>
      </div>
    );
  });
  return (
    <div style={props.displayList ? { display: "" } : { display: "none" }}>
      <h2>{props.title}</h2>
      <p>{`This table was last modified on ${props.dateModified}`}</p>
      <br></br>
      {displayAttendants}
    </div>
  );
}
