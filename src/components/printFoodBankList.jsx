import React from "react";
import "../assets/styles/printFoodBankList.scss";

export default function PrintFoodBankList(props) {

    const displayData = props.tableData.map((x, y) => {
        return (
            <tr key={`applicant_${y}`}>
                <td><div className="checkbox_div"></div></td>
                <td>{x.lastName}</td>
                <td>{x.firstName}</td>
                <td>{x.phone}</td>
            </tr>
        )
    });

    return (
        <div
            id="print_list_wrapper"
        >
            <div id="printable_attendance_sheet">
                <div className="list_name">
                    <h1>{props.tableTitle}</h1>
                </div>
                <div id="list_table_wrapper">
                    <table>
                        <tbody>
                            <tr className="header_row">
                                <th>Present</th>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Phone Number</th>
                            </tr>
                            {displayData}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}