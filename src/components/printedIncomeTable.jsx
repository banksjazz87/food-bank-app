import React from "react";

export default function PrintedIncomeTable(props) {
  const allHeadings = props.headings.map((x, y) => {
    if (y === 0) {
      return (
        <th className="income_headings">
          Household Size <br></br> Circle One
        </th>
      );
    } else {
      return <th className="income_headings">{x}</th>;
    }
  });

  const allData = props.data.map((x, y) => {
    if(y !== props.data.length) {
      return (
        <tr key={`row_${y}`}>
          <td>{x.size}</td>
          <td>$</td>
          <td>{x.annual}</td>
          <td>$</td>
          <td>{x.monthly}</td>
          <td>$</td>
          <td>{x.weekly}</td>
        </tr>
      )
    } else {
      return (
        <tr key={`row_${y}`}>
        <td className="small_table_text">{x.size}</td>
        <td>$</td>
        <td>{x.annual}</td>
        <td>$</td>
        <td>{x.monthly}</td>
        <td>$</td>
        <td>{x.weekly}</td>
      </tr>
      )
    }
  })

  return (
    <table>
      <caption>Total Household Income (based on 185% of Poverty)</caption>
      <tr id="headings_row">{allHeadings}</tr>
      {allData}
    </table>
  );
}
