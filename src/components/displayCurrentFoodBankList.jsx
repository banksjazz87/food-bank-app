import React, { useState, useEffect } from "react";
import postRequest from "../functions/post.js";
import "../assets/styles/displayFoodBankList.scss";

export default function DisplayCurrentFoodBankList() {

   //This will hold the value for the table title and date created.
   const [tableInfo, setTableInfo] = useState({});

   //This will hold all of the values of the most recent table.
   const [table, setTable] = useState([]);
 
   //Setting the tableInfo as well as the table data on the initial render.
   useEffect(() => {
     fetch("/most-recent-fb-list")
       .then((data) => data.json())
       .then((final) => {
         if (final.message === "success") {
           setTableInfo({
             ...tableInfo,
             title: final.allData.title,
             dateCreated: final.allData.dateCreated,
           });
           fetch(`/get-past-list/list-name/${final.allData.title}`)
             .then((data) => data.json())
             .then((result) => setTable(result.allData));
         } else {
           alert(final.message);
         }
       });
   }, []);
 
   const attendantPresent = (arr, index) => {
     const updatedArr = arr.map((x, y) => {
       if (y === index) {
         if (arr[index].present === false) {
           return { ...x, present: "true" };
         } else {
           return { ...x, present: "true" };
         }
       } else {
         return x;
       }
     });
     setTable(updatedArr);
   };

   /*const updateAttendantDb = (arr, index) => {
    const changedAttendant = arr[index];

    if (arr[index].present === false) {

    }
   }*/

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
            attendantPresent(table, currentMember);
            alert(Object.values(table[currentMember]));
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
            attendantPresent(table, currentMember);
            alert(Object.values(table[currentMember]));
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
          <td>{alreadyChecked(y)}</td>
        </tr>
      );
    });
    return renderNames;
  };

  //The main return section for this page.
  if (table.length === 0) {
    return <h1>Data is Loading</h1>;
  } else {
    return (
      <div id="list_wrapper">
      <h1>{`${tableInfo.title}`}</h1>
      <h1>Attendance Sheet</h1>
        <form
          action='/foodBank_attendance/check_sheet'
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            postRequest("/foodBank_attendance/check_sheet", {updatedData: table});
          }}
        >
          <table>
            <tr id="header_row">
              <th>Last Name</th>
              <th>First Name</th>
              <th>Present</th>
            </tr>

            {displayList(table)}
          </table>
        </form>
      </div>
    );
  }
}
