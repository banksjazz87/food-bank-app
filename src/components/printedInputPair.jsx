import React from "react";
import "../assets/styles/printedInputPair.scss";

export default function PrintedInuptPair(props) {
  const returnValues = props.pairArray.map((x, y) => {
    return <p className="value">{x.value}</p>;
  });

  const returnLabels = props.pairArray.map((x, y) => {
    return <p className="label">{x.label}</p>;
  });

  return (
    <div className="input_pair">
      <div className="all_values">{returnValues}</div>
      <div className="all_labels">{returnLabels}</div>
    </div>
  );
}
