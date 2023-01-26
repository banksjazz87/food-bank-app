import React from "react";

export default function DisplayFbList(props) {
  const displayAttendantsLargeScreen = props.allAttendants.map((x, y) => {
    return (
      <tr key={`attendant_${y}`}>
        <td>{x.lastName}</td>
        <td>{x.firstName}</td>
        <td>
          <a className="phone_link" href={`tel:${x.phone}`}>
            Call
          </a>
        </td>
        <td>
          <p
            className={
              x.present === "true" ? "positive_symbol" : "negative_symbol"
            }
          >
            {x.present === "true" ? "√" : "-"}
          </p>
        </td>
      </tr>
    );
  });

  const displayAttendantsSmallScreen = props.allAttendants.map((x, y) => {
    return (
      <tr key={`attendant_${y}`}>
        <td>
          {`${x.lastName},`}
          <br />
          {`${x.firstName}`}
        </td>
        <td>
          <a className="phone_link" href={`tel:${x.phone}`}>
            Call
          </a>
        </td>
        <td className="attended_row">
          <p
            className={
              x.present === "true" ? "positive_symbol" : "negative_symbol"
            }
          >
            {x.present === "true" ? "√" : "-"}
          </p>
        </td>
      </tr>
    );
  });

  if (props.mobileDevice) {
    return (
      <div>
        <h2 id="table_heading">{props.title}</h2>
        <table
          style={props.displayList ? { display: "" } : { display: "none" }}
        >
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th className="attended_row">Attended</th>
          </tr>
          {displayAttendantsSmallScreen}
        </table>
      </div>
    );
  }
  return (
    <div>
      <h2 id="table_heading">{props.title}</h2>
      <table style={props.displayList ? { display: "" } : { display: "none" }}>
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Phone Number</th>
          <th>Attended</th>
        </tr>
        {displayAttendantsLargeScreen}
      </table>
    </div>
  );
}
