import React, { useState, useEffect } from "react";
import postRequest from "../functions/post.js";
import "../assets/styles/foodBankList.scss";

export default function FoodBankList() {

  //This hook will be updating the state of the current attendance for the people already enrolled in the food bank.
  const [data, setData] = useState([]);

  //This hook will be keeping track of when the user clicks a check box and will also trigger a module with a submit button to appear.
  const [clickedBox, setClickedBox] = useState(false);

  //Get the current food bank list and update the data state.
  useEffect(() => {
    fetch("/dummy_data")
      .then((response) => response.json())
      .then((final) => setData(final))
      .catch((e) => console.log("error", e));
  }, []);

  //A function just to execute two functions when a checkbox is selected.
  const clicked = (array) => {
    setData(array);
    setClickedBox(true);
  };

  /**
   *
   * @param {*} current
   * @description makes a copy of the current data and then updates the index of the 'current' clicked value.
   * @returns updates both the data and the clickedBox states
   */
  const memberClicked = (current) => {
    let copyOfData = [...data];
    let index = copyOfData.indexOf(current);

    if (current["attended"]) {
      copyOfData[index]["attended"] = false;
      return clicked(copyOfData);
    } else {
      copyOfData[index]["attended"] = true;
      return clicked(copyOfData);
    }
  };

  //Simply checking the current data and determining if the "checked" attribute should be assigned.
  const alreadyChecked = (currentMember) => {
    if (currentMember["attended"]) {
      return (
        <input
          type="checkbox"
          id="attended"
          name="checkBox"
          value={true}
          onClick={() => {
            memberClicked(currentMember);
            console.log("this is the current data", data);
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
            memberClicked(currentMember);
            console.log("this is the current data", data);
          }}
        />
      );
    }
  };

  //Function that takes an array and creates the data fields.
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
    return renderNames;
  };

  //The main return section for this page.
  if (data.length === 0) {
    return <h1>Data is Loading</h1>;
  } else {
    return (
      <div id="list_wrapper">
      <h1>Food Bank Attendance Sheet</h1>
        <form
          action='/foodBank_attendance/check_sheet'
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            setClickedBox(false);
            postRequest("/foodBank_attendance/check_sheet", {updatedData: data});
          }}
        >
          <table>
            <tr id="header_row">
              <th>Present</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>

            {displayList(data)}
          </table>
          <div id="input_module" style={clickedBox === true ? { display: "" } : { display: "none" }}>
            <input
              id="foodBank_Submit"
              name="foodBank_submit"
              type="submit"
              value="Save"
            />
          </div>
        </form>
      </div>
    );
  }
}
