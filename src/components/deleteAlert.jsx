import React from "react";
import postRequest from "../functions/deleteRequest.js";

export default function DeleteAlert(props) {
  return (
    <div
      id="delete_alert_wrapper"
      style={props.display ? { display: "" } : { display: "none" }}
    >
      <p>
        Are you sure that you would like to permanently delete this applicant?
      </p>
      <div id="delete_alert_buttons">
        <button class="classic_button" onClick={() => {
            postRequest("/remove/applicant", props.currentApplicant[0])
            .then(data => alert(data.message))
            .then(props.handleClick)
            .catch(e => console.log("error has occurred", e));
        }
            }>
          Yes
        </button>
        <button class="classic_button" onClick={props.handleClick}>
          No
        </button>
      </div>
    </div>
  );
}
