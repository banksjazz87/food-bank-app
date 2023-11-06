import React from "react";
import "../assets/styles/printedPersonCount.scss";

export default function PrintedPersonCount(props) {
  const returnRows = props.tableContents.map((x, y) => {
    return (
      <tr key={`person_count_${y}`}>
        <td className="title">{x.title}</td>
        <td>
          <p className="count">{x.count}</p>
        </td>
      </tr>
    );
  });

  return (
    <table class="person_count_table">
      <tr>
        <th></th>
        <th></th>
      </tr>
      {returnRows}
    </table>
  );
}
