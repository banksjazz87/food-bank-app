import React, { useState, useEffect } from "react";

export default function FoodBankList() {
  const [data, setData] = useState([]);

  useEffect(() => {
      fetch("/dummy_data")
        .then((response) => response.json())
        .then((final) => setData(final))
        .catch((e) => console.log("error", e));

  }, []);

  const alreadyChecked = (currentMember) => {
    if (currentMember["attended"]) {
      return (
        <input
          type="checkbox"
          id="attended"
          name="checkBox"
          value={true}
          onClick={() => {
            alert("checkBox Selected");
          }}
          checked
        />
      );
    } else {
      return (
        <input
          type="checkbox"
          id="attended"
          name="checkBox"
          value={true}
          onClick={() => {
            alert("checkBox Selected");
          }}
        />
      );
    }
  };

  //Function that will take an array that contains another array, the most recent array will be used.
  const displayList = (array) => {

  const currentList = array;
  const renderNames = currentList.map((x, y) => {
    return (
      <tr id={`row_number_${y}`} key={`rowNum${y}`}>
        <td>{alreadyChecked(x)}</td>
        <td id="firstName">{x.firstName}</td>
        <td id="lastName">{x.lastName}</td>
      </tr>
    );
  });
  console.log(array);
  return renderNames;
  }



  if (data.length === 0) {
    return <h1>Data is Loading</h1>;
  } else {
    return (
      <div id="list_wrapper">
        <form action="/foodBank_attendance" method="post">
          <table>
            <tr id="header_row">
              <th>Present</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>

            {displayList(data)}
          </table>
        </form>
      </div>
    );
  }
}
