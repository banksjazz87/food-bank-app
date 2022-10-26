import React, {useState} from "react";
import NavBar from "../components/navBar.jsx";
import postRequest from "../functions/post.js";

export default function CreateFoodBankList(props) {

  const [listName, setListName] = useState({title: ""});

  return (
    <div id="create_list_wrapper">
      <div class="header_wrapper">
        <h1>Create Foodbank List</h1>
      </div>
      <NavBar />
      <form
        action="/new_foodbank_list"
        method="post"
        onSubmit={(e) => { e.preventDefault(); 
        postRequest('/new_foodbank_list', listName);}
        }
      >
        <label for="food_bank_list_name">New List Name</label>
        <input
          id="food_bank_list_name"
          name="food_bank_list_name"
          type="text"
          placeHolder="new name"
          onChange={(e) =>  setListName({...listName, title: e.target.value})}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
