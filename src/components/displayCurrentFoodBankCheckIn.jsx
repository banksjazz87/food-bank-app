import React, { useState } from "react";
import postRequest from "../functions/post.js";
import putRequest from "../functions/putRequest.js";
import "../assets/styles/displayCurrentFoodBankCheckIn.scss";
import LoadingIcon from "./loadingIcon.jsx";
import AlertModule from "./alertModule.jsx";
import MathFunctions from "../functions/mathFunctions.js";

export default function DisplayCurrentFoodBankCheckIn(props) {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");

	//Update the attendant present status in the array that is holding the state.
	const checkInAttendant = (arr, index) => {
		const copyOfArr = arr.slice();
		const updatedArr = copyOfArr.map((x, y) => {
			if (y === index) {
				if (copyOfArr[index].checkedIn === 0 && props.checkedInTable.length === 0) {
					return { ...x, checkedIn: 1, checkedInNum: 1 };
				} else if (copyOfArr[index].checkedIn === 0 && props.checkedInTable.length > 0) {
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
				updateCheckedInList(id, checkIn, checkInNum);
				setTimeout(() => {
					setShowAlert(false);
					setAlertMessage(false);
				}, 1000);
			} else {
				alert(data.message);
			}
		});
	};

	//The following will be used to update the checked in list.
	const updateCheckedInList = (id, checked, num) => {
		if (checked === 1) {
			props.addToCheckedInHandler(id, num);
		} else {
			props.removeFromCheckedInHandler(id);
		}
	};

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
					if (props.checkedInTable.length === 0) {
						requestAttendantPresence(tableName, first, last, id, "false", 1, 1);
					} else {
						let lastCheckedIn = props.checkedInTable[props.checkedInTable.length - 1].checkedInNum;
						let checkedInNum = parseInt(lastCheckedIn) + 1;
						requestAttendantPresence(tableName, first, last, id, "false", 1, checkedInNum);
					}
				} else {
					requestAttendantPresence(tableName, first, last, id, "false", 0, 0);
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
					<td className="checked_in_data"> {alreadyChecked(x, y)} </td>
					<td style={props.showRemoveBtns ? { display: "" } : { display: "none" }}>
						<button
							id={`remove_attendant_${y}`}
							className="remove_button"
							type="button"
							onClick={(e) => {
								props.selectedRemovalHandler(parseInt(MathFunctions.returnNums(e.target.id)), props.currentTableData);

								props.showDeleteAlertHandler();
							}}
						>
							X
						</button>
					</td>
				</tr>
			);
		});
		return renderNames;
	};

	//The main return section for this page.
	if (props.loadStatus && props.currentTableData.length === 0) {
		return (
			<div
				id="no_entries_wrapper"
				style={props.tableToDisplay === props.tableName ? { display: "" } : { display: "none" }}
			>
				<div>
					<h2> No entries found for this table currently. </h2>
				</div>
			</div>
		);
	} else if (!props.loadStatus && props.currentTableData.length === 0) {
		return (
			<div style={props.tableToDisplay === props.tableName ? { display: "" } : { display: "none" }}>
				<LoadingIcon />
			</div>
		);
	} else {
		return (
			<div
				id="check_in_wrapper"
				style={props.tableToDisplay === props.tableName ? { display: "" } : { display: "none" }}
			>
				<AlertModule
					showModule={showAlert}
					message={alertMessage}
				/>
				<form
					id="check_in_form"
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
									<h2 className="subheading"> Check In </h2>
								</td>
							</tr>
							<tr id="header_row">
								<th> Name </th> <th> Phone Number </th> <th> Checked In </th>
							</tr>
							{displayLargeScreenList(props.currentTableData)}
						</tbody>
					</table>
				</form>
			</div>
		);
	}
}
