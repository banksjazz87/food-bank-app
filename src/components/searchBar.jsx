import React, { useState, useEffect } from "react";
import "../assets/styles/searchBar.scss";
import MathFunctions from "../functions/mathFunctions.js";

//For Development only
//import DummyData from "../variables/dummyData.js";

//This component creates a search bar for all of the applicants currently in the database.
export default function SearchBar(props) {
  //Setting the initial applicant data.
  //use for production
  const [data, setData] = useState([]);

  //use for development
  //let data = DummyData;

  const [input, setInput] = useState({});

  useEffect(() => {
    fetch(props.route)
      .then((response) => response.json())
      .then((final) => {
        setData(final);
      })
      .catch((e) => console.log("error", e));
  }, []);

  /**
   *
   * @param {*} index
   * @param {*} array
   * updates the input object with the key, firstName, and lastName.
   */
  const selectedItem = (index, array) => {
    const itemIndex = index - 1;
    setInput((input) => ({
      ...input,
      key: array[itemIndex].ApplicantID,
      firstName: array[itemIndex].firstName,
      lastName: array[itemIndex].lastName,
    }));
  };

  const allNames = (array) => {
    const renderOptions = array.map((x, y) => {
      return (
        <option key={`option_${y}`} id={`option_${array[y].ApplicantID}`}>{`${
          y + 1
        }. ${array[y].lastName}, ${array[y].firstName}`}</option>
      );
    });

    return renderOptions;
  };

  if (data.length === 0) {
    return (
      <div>
        <label for="applicants">Applicants</label>
        <select name="applicants" id="applicants">
          <option id="fetching">Fetching...</option>
        </select>
      </div>
    );
  } else {
    return (
      <div>
        <form
          id="applicantSearch"
          onSubmit={(e) => {
            e.preventDefault();
            //used for production
            fetch(
              `/single-applicant/first/${input.firstName}/last/${input.lastName}/id/${input.key}`
            )
              .then((res) => res.json())
              .then((final) => props.handleChange(final));

            //used for development
            // props.handleChange([data[0]]);
          }}
        >
          <label for="applicants">Applicants</label>
          <select
            name="applicants"
            id="applicants"
            onChange={(e) =>
              selectedItem(MathFunctions.returnNums(e.target.value), data)
            }
          >
            <option>Choose from the following...</option>
            {allNames(data)}
          </select>
          <input id="applicantSearchSubmit" type="submit" value={props.value} />
        </form>
      </div>
    );
  }
}
