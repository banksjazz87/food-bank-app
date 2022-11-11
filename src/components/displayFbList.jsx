import React, { useState } from "react";

export default function DisplayList(props) {
  const displayAttendants = props.allAttendants.map((x, y) => {
    return (
      <p key={`attendant_${y}`} id={`attendant_y`}>{`${y + 1}. ${x.lastName}, ${
        x.firstName
      } `}</p>
    );
  });
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{`This table was last modified on ${props.dateModified}`}</p>
      <br></br>
      {displayAttendants}
    </div>
  );
}
