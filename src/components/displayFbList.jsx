import React from "react";


export default function DisplayList(props) {
  const displayAttendants = props.allAttendants.map((x, y) => {
    return (
        <tr key={`attendant_${y}`}>
          <td>{x.lastName}</td>
          <td>{x.firstName}</td>
          <td>{x.phone}</td>
          <td>{x.present}</td>
        </tr>   
    );
  });
  return (
    <table style={props.displayList ? { display: "" } : { display: "none" }}>
      <tr>
        <th>{props.title}</th>
      </tr>
      <tr>
        <th>{`This table was modified on ${props.dateModified}`}</th>
      </tr>
      <tr>
        <th>Last Name</th>
        <th>First Name</th>
        <th>Phone Number</th>
        <th>Attended</th>
      </tr>
      {displayAttendants}
    </table>
  );

}
