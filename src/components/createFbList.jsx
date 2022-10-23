import React from "react";

export default function CreateFbList(props) {

    return (
        <div id="create_list_wrapper">
          <button 
            className="fb_dashboard_icon" type="button"
            onClick={props.clickHandler}>
            Create List</button>
          <form
            style={props.showForm ? {display: ''} : {display: 'none'}}
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
    )
}