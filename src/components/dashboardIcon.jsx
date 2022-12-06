import React from 'react';
import "../assets/styles/dashboardIcon.scss";

export default function DashboardIcon(props) {
    return (
        <button className="dashboard_icon"
            onClick={props.clickHandler}>
            {props.title}
        </button>
    )
}