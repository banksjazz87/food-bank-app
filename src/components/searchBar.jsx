import React, { useState, useEffect } from "react";

//This component creates a search bar for all of the applicants currently in the database.
export default function AllApplicantSearchBar() {
  //Setting the initial applicant data.
  const [data, setData] = useState([]);
  const [input, setInput] = useState({});

  useEffect(() => {
    fetch("/all-applicants")
      .then((response) => response.json())
      .then((final) => {
        setData(final);
      })
      .catch((e) => console.log("error", e));
  }, []);

  const returnNums = (string) => {
    let num = "";

    for (let i = 0; i < string.length; i++) {
      let numCheck = parseInt(string[i]);
      if (!isNaN(numCheck)) {
        num = num + string[i];
      }
    }

    return num;
  };

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
        }. ${array[y].firstName} ${array[y].lastName}`}</option>
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
            console.log(input);
          }}
        >
          <label for="applicants">Applicants</label>
          <select
            name="applicants"
            id="applicants"
            onChange={(e) => {
              selectedItem(returnNums(e.target.value), data);
            }}
          >
            {allNames(data)}
          </select>
          <input 
            id="applicantSearchSubmit" 
            type="submit" 
            value="submit"
            />
        </form>
      </div>
    );
  }
}
