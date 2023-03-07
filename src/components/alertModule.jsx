import React from "react";
import '../assets/styles/alertModule.scss';

export default function AlertModule(props) {
    return (
        <div id="custom_alert_overlay"
            style={props.showModule ? {display: ""} : {display: 'none'}}>
        <div id="custom_alert">
            <p>{props.message}</p>
        </div>
        </div>
    )
}