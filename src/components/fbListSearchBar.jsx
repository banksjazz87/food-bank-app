import React, { useState, useEffect } from "react";

export default function FbListSearchBar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/all/food-bank-lists")
      .then((response) => response.json())
      .then((data) => {
        setData(data.allData);
        console.log(data);
      })
      .catch((error) => alert(`error, ${error} has occured`));
  }, []);

  const selectValues = (array) => {
    const returnValues = array.map((x, y) => {
      return (
        <option
          key={`foodBankList_${y}`}
          value={`${y + 1}. ${x.title}`}
          number={y}
        >{`${y + 1}. ${x.title}`}</option>
      );
    });

    return returnValues;
  };

  if (data.length > 0) {
    return (
      <form
        action="/table/selected"
        method="get"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <select id="table_select">
          <option>Select one...</option>
          {selectValues(data)}
        </select>
        <input id="table_select_submit" type="submit" value="submit"></input>
      </form>
    );
  } else {
    return <p id="fetching">Fetching Options</p>;
  }
}
