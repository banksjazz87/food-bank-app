import React, {useState, useEffect} from "react";

export default function FoodBankList() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/dummy_data")
            .then((response) => response.json())
            .then((final) => setData(data.push(final)))
            .catch((e) => console.log('error', e))
    })

    if (data.length === 0) {
        return (
            <h1>Data is Loading</h1>
        )
    } else {
    return (
        <div>
            <h1>This will be the current Food Bank List</h1>
            <p>Data has loaded</p>
        </div>
    )
}
}