import React, { useEffect, useState } from "react";
import postRequest from "../functions/post.js";
import putRequest from "../functions/putRequest.js";
// import "../assets/styles/displayCurrentFoodBankList.scss";
import "../assets/styles/displayCurrentFoodBankCheckIn.scss";
import MathFunctions from "../functions/mathFunctions.js";
import LoadingIcon from "./loadingIcon.jsx";
import AlertModule from "./alertModule.jsx";

export default function DisplayCurrentFoodBankCheckIn(props) {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");

	//Update the attendant present status in the array that is holding the state.
	const checkInAttendant = (arr, index) => {
		const copyOfArr = arr.slice();
		const updatedArr = copyOfArr.map((x, y) => {
			if (y === index) {
				if (copyOfArr[index].checkedIn === 0) {
					let lastCheckedIn = props.checkedInTable[props.checkedInTable.length - 1].checkedInNum;
					return { ...x, checkedIn: 1, checkedInNum: parseInt(lastCheckedIn) + 1 };
				} else {
					return { ...x, checkedIn: 0, checkedInNum: 0 };
				}
			} else {
				return x;
			}
		});
		props.updateTableHandler(updatedArr);
	};

	//The actual put request for updating whether the attendant is present or not.
	const requestAttendantPresence = (tableName, firstName, lastName, id, presence, checkIn, checkInNum) => {
		let requestObj = {
			title: tableName,
			firstName: firstName,
			lastName: lastName,
			ApplicantID: id,
			present: presence,
			checkedIn: checkIn,
			checkedInNum: checkInNum,
		};

		putRequest("/check-attendant-in", requestObj).then((data) => {
			if (data.status === "Success") {
				setAlertMessage(data.message);
				setShowAlert(true);
				setTimeout(() => {
					setShowAlert(false);
					setAlertMessage(false);
					// window.location.reload();
				}, 1000);
			} else {
				alert(data.message);
			}
		});
	};

	//The following will be used to update the checked in list.
	/*const updateCheckedInList = (id, checked) => {
		if (checked === 1) {
			props.addToCheckedInHandler(arr, index, checkedInNum);
		}
	}*/

	//Check the current Present status in the database, according to the selected name, and then updates the database to reflect the adjustement.
	const updateAttendantPresentInDb = (arr, index, table) => {
		let tableName = table.title;
		let first = arr[index].firstName;
		let last = arr[index].lastName;
		let id = arr[index].ApplicantID;

		fetch(`/applicant-present-status/${tableName}/${first}/${last}/${id}`)
			.then((data) => data.json())
			.then((final) => {
				if (final.allData.checkedIn === 0) {
					let lastCheckedIn = props.checkedInTable[props.checkedInTable.length - 1].checkedInNum;
					let checkedInNum = parseInt(lastCheckedIn) + 1;
					requestAttendantPresence(tableName, first, last, id, "false", 1, checkedInNum);
					props.addToCheckedInHandler(arr, index, checkedInNum);
				} else {
					requestAttendantPresence(tableName, first, last, id, "false", 0, 0);
					props.removeFromCheckedInHandler(id);
				}
			});
	};

	//Simply checking the current data and determining if the "checked" attribute should be assigned.
	const alreadyChecked = (currentMember, index) => {
		if (currentMember["checkedIn"] === 1) {
			return (
				<button
					id="checked_in"
					className="check_in_button present_button"
					value={true}
					onClick={() => {
						checkInAttendant(props.currentTableData, index);
						updateAttendantPresentInDb(props.currentTableData, index, props.tableDetails);
					}}
				>
					√
				</button>
			);
		} else {
			return (
				<button
					id="checked_out"
					className="checked_out_button not_present_button"
					name="checkBox"
					value={false}
					onClick={() => {
						checkInAttendant(props.currentTableData, index);
						updateAttendantPresentInDb(props.currentTableData, index, props.tableDetails);
					}}
				>
					-
				</button>
			);
		}
	};

	//Function that takes an array and creates the data fields.
	const displayLargeScreenList = (array) => {
		const currentList = array;
		const renderNames = currentList.map((x, y) => {
			const currentValues = Object.values(x);
			return (
				<tr
					id={`row_number_${y}`}
					key={`rowNum${y}`}
				>
					<td
						id="name"
						className={currentValues.indexOf(null) > -1 ? "incomplete_data" : ""}
						onClick={() => props.editHandler(props.currentTableData, y)}
					>
						{`${x.lastName}, ${x.firstName}`}
					</td>
					<td className="phone">
						<a
							style={x.phone && x.phone.length > 5 ? { display: "" } : { display: "none" }}
							className="call_button"
							href={`tel: ${x.phone}`}
						>
							Call
						</a>
					</td>
					<td> {alreadyChecked(x, y)} </td>
				</tr>
			);
		});
		return renderNames;
	};

	//The main return section for this page.
	if (props.currentTableData.length === 0) {
		return <LoadingIcon />;
	} else {
		return (
			<div id="check_in_wrapper">
				<AlertModule
					showModule={showAlert}
					message={alertMessage}
				/>
				<h1 id="list_title"> {props.tableDetails.title} </h1>
				<form
					action="/foodBank_attendance/check_sheet"
					method="post"
					onSubmit={(e) => {
						e.preventDefault();
						postRequest("/foodBank_attendance/check_sheet", {
							updatedData: props.currentTableData,
						});
					}}
				>
					<table>
						<tbody>
							<tr>
								<td colspan="3">
									<h2 className="subheading">Check In</h2>
								</td>
							</tr>
							<tr id="header_row">
								<th> Name </th>
								<th> Phone Number </th>
								<th> Checked In </th>
							</tr>
							{displayLargeScreenList(props.currentTableData)}
						</tbody>
					</table>
				</form>
			</div>
		);
	}
}
