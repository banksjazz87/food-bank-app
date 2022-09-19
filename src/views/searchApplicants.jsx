import React, { useState } from "react";
import AllApplicantSearchBar from "../components/searchBar.jsx";

export default function SearchApplicants() {

    const [input, setInput] = useState({});

    function selectedItem(index, array){
        const itemIndex = index - 1;
        setInput((input) => ({
          ...input,
          key: array[itemIndex].ApplicantID,
          firstName: array[itemIndex].firstName,
          lastName: array[itemIndex].lastName,
        }));
        console.log(input); 
      };

      

    return (
        <div>
        <h1>This will be the search all section.</h1>
        <AllApplicantSearchBar 
            change={selectedItem}  
            first={input.firstName} 
            last={input.lastName} 
            key={input.key}/>
        
        </div>
    )
}