import React from "react";

export default function EditDeleteButtons(props) {
  return (
    <div
      id="edit_delete_wrapper"
      style={props.display ? { display: "" } : { display: "none" }}
    >
      <button type="button" onClick={props.editClick}>
        Edit
      </button>
      <button type="button" onClick={props.deleteClick}>
        Delete
      </button>
    </div>
  );
}
