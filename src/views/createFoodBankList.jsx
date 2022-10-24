import React from "react";
import NavBar from "../components/navBar.jsx";

export default function CreateFoodBankList(props) {
  return (
    <div id="create_list_wrapper">
      <div class="header_wrapper">
        <h1>Create Foodbank List</h1>
      </div>
      <NavBar />
      <form
        action="/new_foodbank_list"
        method="post"
        onSubmit={(e) => e.preventDefault()}
      >
        <label for="food_bank_list_name">New List Name</label>
        <input
          id="food_bank_list_name"
          name="food_bank_list_name"
          type="text"
          placeHolder="new name"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
