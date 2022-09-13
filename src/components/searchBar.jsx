import React, { useState, useEffect } from "react";

//This component creates a search bar for all of the applicants currently in the database.
export default function AllApplicantSearchBar() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/all-applicants")
        .then((response) => response.json())
        .then((final) => {setData(final);})
        .catch((e) => console.log('error', e));
    }, []);

    const allNames = (array) => {
        const renderOptions = array.map((x, y) => {
            return (
                <option key={`option_${y}`} id={`option_${array[y].ApplicantID}`}>{`${y+1}. ${array[y].firstName} ${array[y].lastName}`}</option>
            )
        });

        return renderOptions;
    }

    if (data.length === 0) {
        return (
            <div>
            <label for="applicants">Applicants</label>
            <select name="applicants" id="applicants">
                <option id="fetching">Fetching...</option>
            </select>
            </div>
        )
    } else {
        return (
            <div>
                <label for="applicants">Applicants</label>
                <select name="applicants" id="applicants">
                    {allNames(data)}
                </select>
            </div>
        )
    }
}