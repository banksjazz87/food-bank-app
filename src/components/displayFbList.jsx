import React from "react";



export default function DisplayFbList(props) {
  const displayAttendants = props.allAttendants.map((x, y) => {
    return (
        <tr key={`attendant_${y}`}>
          <td>{x.lastName}</td>
          <td>{x.firstName}</td>
          <td><a className="phone_link" href={`tel:${x.phone}`}>Call</a></td>
          <td><p className={x.present === "true" ? "positive_symbol" : "negative_symbol"}>{x.present === "true" ? "√" : "-"}</p></td>
        </tr>   
    );
  });
  return (

    <table style={props.displayList ? { display: "" } : { display: "none" }}>
      <tr>
        <th id="table_heading" colspan="4">{props.title}</th>
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
