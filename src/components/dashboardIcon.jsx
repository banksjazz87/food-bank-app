import React from 'react';
import "../assets/styles/fbDashboardIcon.scss";

export default function FBDashboardIcon(props) {
    return (
        <div className="fb_dashboard_icon">
            <h2>{props.title}</h2>
        </div>
    )
}