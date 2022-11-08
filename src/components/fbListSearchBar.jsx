import React, { useState, useEffect } from "react";
import MathFunctions from "../functions/mathFunctions.js";

export default function FbListSearchBar(props) {
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

  

  //Display the options.
  const selectValues = (array) => {
    const returnValues = array.map((x, y) => {
      return (
        <option
          key={`foodBankList_${y}`}
          value={`${y + 1}. ${x.title}`}
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
          fetch(`/get-past-list/list-name/${props.selectedItem.title}`)
            .then(res => res.json())
            .then((tableData) => {
                if (tableData.allData.length > 0) {
                    alert('this table has data');
                } else {
                    alert('delete this, no data')
                }
            });

        }}
      >
        <select 
            id="table_select"
            onChange={(e) => {
                let indexValue = MathFunctions.returnFirstNumbers(e.target.value) - 1;
                props.changeHandler(data, indexValue);
            }}>
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
