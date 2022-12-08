import React from "react";
import postRequest from "../functions/post.js";
import putRequest from "../functions/putRequest.js";
import "../assets/styles/displayFbList.scss";
import MathFunctions from "../functions/mathFunctions.js";

export default function DisplayCurrentFoodBankList(props) {
  //Update the attendant present status in the array that is holding the state.
  const attendantPresent = (arr, index) => {
    const copyOfArr = arr.slice();
    const updatedArr = copyOfArr.map((x, y) => {
      if (y === index) {
        if (copyOfArr[index].present === false) {
          return { ...x, present: "true" };
        } else {
          return { ...x, present: "false" };
        }
      } else {
        return x;
      }
    });
    props.updateTableHandler(updatedArr);
  };

  //The actual put request for updating whether the attendant is present or not.
  const requestAttendantPresence = (
    tableName,
    firstName,
    lastName,
    id,
    presence
  ) => {
    let requestObj = {
      title: tableName,
      firstName: firstName,
      lastName: lastName,
      ApplicantID: id,
      present: presence,
    };

    putRequest("/update-attendant-status", requestObj).then((data) =>
      alert(data.message)
    );
  };

  //Check the current Present status in the database, according to the selected name, and then updates the database to reflect the adjustement.
  const updateAttendantPresentInDb = (arr, index, table) => {
    let tableName = table.title;
    let first = arr[index].firstName;
    let last = arr[index].lastName;
    let id = arr[index].ApplicantID;

    fetch(`/applicant-present-status/${tableName}/${first}/${last}/${id}`)
      .then((data) => data.json())
      .then((final) => {
        if (final.allData.present === "false") {
          requestAttendantPresence(tableName, first, last, id, "true");
        } else {
          requestAttendantPresence(tableName, first, last, id, "false");
        }
      });
  };

  //Simply checking the current data and determining if the "checked" attribute should be assigned.
  const alreadyChecked = (currentMember, index) => {
    if (currentMember["present"] === "true") {
      return (
        <input
          type="checkbox"
          id="attended"
          name="checkBox"
          value={true}
          onClick={() => {
            attendantPresent(props.currentTableData, index);
            updateAttendantPresentInDb(
              props.currentTableData,
              index,
              props.tableDetails
            );
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
          value={false}
          onClick={() => {
            attendantPresent(props.currentTableData, index);
            updateAttendantPresentInDb(
              props.currentTableData,
              index,
              props.tableDetails
            );
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
          <td id="lastName">{x.lastName}</td>
          <td id="firstName">{x.firstName}</td>
          <td id="phone">
            <a href={`tel: ${x.phone}`}>{x.phone}</a>
          </td>
          <td>{alreadyChecked(x, y)}</td>
          <td>
            <button 
              style={props.showRemoveBtns ? {display: ""} : {display: "none"}} 
              id={`remove_attendant_${y}`} 
              type="button"
              onClick={(e) => {
                props.selectedRemovalHandler(parseInt(MathFunctions.returnNums(e.target.id)), props.currentTableData);

                props.showDeleteAlertHandler();
              }}
            >
              Remove
            </button>
          </td>
        </tr>
      );
    });
    return renderNames;
  };

  //The main return section for this page.
  if (props.currentTableData.length === 0) {
    return <h1>Data is Loading</h1>;
  } else {
    return (
      <div id="list_wrapper">
        <h1>{`${props.tableDetails.title}`}</h1>
        <h1>Attendance Sheet</h1>
        <form
          action="/foodBank_attendance/check_sheet"
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            postRequest("/foodBank_attendance/check_sheet", {
              updatedData: props.currentTableData,
            });
          }}
        >
          <table>
          <tbody>
            <tr id="header_row">
              <th>Last Name</th>
              <th>First Name</th>
              <th>Phone Number</th>
              <th>Present</th>
            </tr>

            {displayList(props.currentTableData)}
          </tbody>
          </table>
        </form>
      </div>
    );
  }
}
