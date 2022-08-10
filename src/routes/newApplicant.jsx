import React, {useState} from "react";

export default function Applicant() {
  const dataPoints = [
      {value: "", type:"text", maxWidth: 25, name: "firstName", placeHolder: "First Name"}, 
      {value: "", type: "text", maxWidth: 25, name: "lastName", placeHolder: "Last Name"}, 
      {value: "", type: "tel", maxWidth: 15, name: "phone", placeHolder: "Phone Number"},
      {value: "", type: "text", maxWidth: 25, name: "address", placeHolder: "Address"}, 
      {value: 0, type: "number", maxWidth: 2, name: "numOfPeople", placeHolder: "Number of People In Household"}, 
      {value: 0, type: "number", maxWidth: 2, name: "numOfChildren", placeHolder: "Number of Children"}, 
      {value: 0, type: "number", maxWidth: 2, name: "numOfAdults", placeHolder: "Number of Adults"}, 
      {value: 0, type: "number", maxWidth: 2, name: "numOfSeniors", placeHolder: "Number of Senior Citizens"}, 
      {value: null, type: null, maxWidth: null, name: "totalIncome", placeHolder: "Total Household Income"}, 
      {value: 0, type: "number", maxWidth: 6, name: "monthlyIncome", placeHolder: "Monthly Income"}, 
      {value: 0, type: "number", maxWidth: 6, name: "annualIncome", placeHolder: "Anual Income"}, 
      {value: 0, type: "number", maxWidth: 6, name: "weeklyIncome", placeHolder: "Weekly Income"}
    ];

    const [field, setField] = useState([
        {
          firstName: "", 
          lastName: "", 
          phone: "", 
          address: "", 
          numOfPeople: "", 
          numOfChildren: "", 
          numOfAdults: "", 
          numOfSeniors: "", 
          monthlyIncome: "", 
          annualIncome: "", 
          weeklyIncome: ""
        }]);

    const fieldOnChange = (index, e) => {
      let newArr = [...field];
      newArr[index] = e.target.value;
      setField(newArr);
    }

    const returnFields = dataPoints.map((x, y) => {
      if (x.value === null) {
        return (
          <div className="input_pair">
            <label key={`label_${y}`} for={x.name}>{x.placeHolder}</label>
          </div>
        )
      } else {
      return (
      <div className="input_pair">
        <label key={`label_${y}`} for={x.name}>{x.placeHolder}</label>
        <input key={`input_${y}`} type={x.type} id={x.name} maxlength={x.maxWidth} name={x.name} min={x.type === "number" ? 0 : ""} onChange={(event) => fieldOnChange(y, event)}/>
        <p>{`The updated value is ${field[y]}`}</p>
      </div>
      )
      }
    });

    return (
      <div id="new_applicat_wrapper">
        <form action="/new_applicant" method="post">
          {returnFields}
          <input type="submit" value="submit" />
        </form>

      </div>
    );
  }