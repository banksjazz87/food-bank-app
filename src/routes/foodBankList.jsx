import React, { useState, useEffect } from "react";

export default function FoodBankList() {
  const [data, setData] = useState([]);

  useEffect(() => {
      fetch("/dummy_data")
        .then((response) => response.json())
        .then((final) => setData(data.push(final)))
        .catch((e) => console.log("error", e));
  });


  /*const testData = [
    {
      firstName: "Greg",
      lastName: "Coleman",
      annualIncome: "$20,000",
      attended: false,
    },
    {
      firstName: "George",
      lastName: "Fisher",
      annualIncome: "$60,000",
      attended: true,
    },
    {
      firstName: "Ryan",
      lastName: "Van",
      annualIncome: "$30,000",
      attended: true,
    },
    {
      firstName: "David",
      lastName: "Fredricks",
      annualIncome: "$10,000",
      attended: false,
    },
  ];

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

  /*const currentList = array;
  /*const renderNames = currentList.map((x, y) => {
    return (
      <tr id={`row_number_${y}`} key={`rowNum${y}`}>
        <td>{alreadyChecked(x)}</td>
        <td id="firstName">{x.firstName}</td>
        <td id="lastName">{x.lastName}</td>
      </tr>
    );
  });
  return renderNames;*/
  //console.log("this is the list", currentList[0]);
  //console.log(array.length);
//}

const returnData = (array) => console.log("data", array[0]);


  if (data.length === 0) {
    return <h1>Data is Loading</h1>;
  } else {
    return (
      /*<div id="list_wrapper">
        <form action="/foodBank_attendance" method="post">
          <table>
            <tr id="header_row">
              <th>Present</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </table>
        </form>
      </div>*/
      <>
        <h1>Data retrieved</h1>
        {returnData(data)}
      </>
    );
  }
}
