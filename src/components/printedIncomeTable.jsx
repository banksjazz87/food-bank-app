import React from "react";
import "../assets/styles/printedIncomeTable.scss";

export default function PrintedIncomeTable(props) {
  const allHeadings = props.headings.map((x, y) => {
    if (y === 0) {
      return <th className="income_headings">Circle One</th>;
    } else {
      return <th className="income_headings">{x}</th>;
    }
  });

  const allData = props.data.map((x, y) => {
    if (y === props.data.length - 1) {
      return (
        <tr key={`row_${y}`}>
          <td className="small_table_text">{x.size}</td>
          <td className="dollar_col">$</td>
          <td>{x.annual}</td>
          <td className="dollar_col">$</td>
          <td>{x.monthly}</td>
          <td className="dollar_col">$</td>
          <td>{x.weekly}</td>
          <td></td>
        </tr>
      );
    } else {
      return (
        <tr
          className={props.householdSize === x.size ? "circle_family_size" : ""}
          key={`row_${y}`}
        >
          <td>{x.size}</td>
          <td>$</td>
          <td>{x.annual}</td>
          <td>$</td>
          <td>{x.monthly}</td>
          <td>$</td>
          <td>{x.weekly}</td>
        </tr>
      );
    }
  });

  return (
    <table id="household_income_table">
      <caption>Total Household Income (based on 185% of Poverty)</caption>
      <tbody>
        <tr id="headings_top_row">
          <th>Household Size</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr id="headings_row">{allHeadings}</tr>
        {allData}
      </tbody>
    </table>
  );
}
