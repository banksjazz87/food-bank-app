import React from "react";
import "../assets/styles/statisticCard.scss";

export default function StatisticCard(props) {

    const returnStats = props.dataArray.map((x, y) => {
        return (
            <div key={`statistic_card_${y}`} className="statistic_card">
                <h3 className="statistic_title">{x.title}</h3>
                <p className="statistic_data">{x.data}</p>
            </div>
        )
    })
    return (
       <div className="content_wrapper">
            <div className="statistic_header_wrapper">
            <h2 className="statistic_type_header">{props.heading}</h2>
            </div>
          <div className="statistic_wrapper">
            {returnStats}
          </div>
       </div>
    )
}