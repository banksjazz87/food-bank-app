import React from "react";
import "../assets/styles/editDeleteButtons.scss";

export default function EditDeleteButtons(props) {
  return (
    <div
      id="edit_delete_wrapper"
      style={props.display ? { display: "" } : { display: "none" }}
    >
      <button className="edit_button" type="button" onClick={props.editClick}>
        Edit
      </button>
      <button className="print_button" type="button" onClick={props.deleteClick}>
        Print
      </button>
      <button className="delete_button" type="button" onClick={props.deleteClick}>
        Delete
      </button>
    </div>
  );
}
