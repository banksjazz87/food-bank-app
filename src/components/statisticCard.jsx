import React from "react";
import "../assets/styles/statisticCard.scss";

export default function StatisticCard(props) {
    return (
        <div className="statistic_card">
            <h3 className="statistic_title">{props.title}</h3>
            <p className="statistic_data">{props.data}</p>
        </div>
    )
}