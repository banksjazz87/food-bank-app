import React from 'react';
import "../assets/styles/loadingIcon.scss";

export default function LoadingIcon() {
    return (
        <div id="loading_wrapper">
            <div id="outer_circle">
                <div id="inner_circle"></div>
            </div>
        </div>
    )
}