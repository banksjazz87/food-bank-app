import React from "react";
import deleteRequest from "../functions/deleteRequest.js";
import "../assets/styles/deleteAlert.scss";

export default function DeleteAlert(props) {
  return (
    <div 
      id="delete_alert_overlay"
      style={props.display ? { display: "" } : { display: "none" }}
    >
    <div
      id="delete_alert_wrapper"
    >
      <p>
        {props.warningMessage}
      </p>
      <div id="delete_alert_buttons">
        <button
          className="delete_button"
          onClick={() => {
              deleteRequest(props.routePath, props.selected)
              .then((data) => alert(data.message))
              .then(props.yesClickHandler())
              .catch((e) => alert("error has occurred", e));
          }
          }>
          Yes
        </button>
        <button onClick={props.noClickHandler}>No</button>
      </div>
    </div>
  </div>
  );
}
