import React from 'react';
import "../assets/styles/fbDashboardIcon.scss";

export default function FBDashboardIcon(props) {
    return (
        <button className="fb_dashboard_icon"
            onClick={props.clickHandler}>
            {props.title}
        </button>
    )
}