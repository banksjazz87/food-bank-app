import React, { useEffect, useState } from "react";
import postRequest from "../functions/post.js";
import putRequest from "../functions/putRequest.js";
import "../assets/styles/displayCurrentFoodBankList.scss";
import MathFunctions from "../functions/mathFunctions.js";
import AlertModule from "../components/alertModule.jsx";

export default function DisplayCurrentFoodBankList(props) {
	const [mobileView, setMobileView] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");

	//Check if the user is on a mobile device, when the page loads.
	useEffect(() => {
		let currentScreenWidth = window.innerWidth;
		if (currentScreenWidth <= 1024) {
			setMobileView(true);
		}
	}, []);

	//Add eventlistener to check for mobile.
	window.addEventListener("resize", () => {
		let currentScreenWidth = window.innerWidth;
		if (currentScreenWidth <= 1024) {
			setMobileView(true);
		} else {
			setMobileView(false);
		}
	});

	//Update the attendant present status in the array that is holding the state.
	const attendantPresent = (arr, index) => {
		const copyOfArr = arr.slice();
		const updatedArr = copyOfArr.map((x, y) => {
			if (y === index) {
				if (copyOfArr[index].present === "false") {
					return { ...x, present: "true" };
				} else {
					return { ...x, present: "false" };
				}
			} else {
				return x;
			}
		});
		props.updateTableHandler(updatedArr);
	};

	//The actual put request for updating whether the attendant is present or not.
	const requestAttendantPresence = (tableName, firstName, lastName, id, presence) => {
		let requestObj = {
			title: tableName,
			firstName: firstName,
			lastName: lastName,
			ApplicantID: id,
			present: presence,
		};

		putRequest("/update-attendant-status", requestObj).then((data) => {
			setAlertMessage(data.message);
			setShowAlert(true);
			setTimeout(() => {
				setShowAlert(false);
				setAlertMessage(false);
			}, 1000);
		});
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
				if (final.allData.present === "false") {
					requestAttendantPresence(tableName, first, last, id, "true");
				} else {
					requestAttendantPresence(tableName, first, last, id, "false");
				}
			});
	};

	//Simply checking the current data and determining if the "checked" attribute should be assigned.
	const alreadyChecked = (currentMember, index) => {
		if (currentMember["present"] === "true") {
			return (
				<button
					id="present"
					className="present_button"
					value={true}
					onClick={() => {
						attendantPresent(props.currentTableData, index);
						updateAttendantPresentInDb(props.currentTableData, index, props.tableDetails);
						props.decrementHandler(props.presentCount);
					}}
				>
					√
				</button>
			);
		} else {
			return (
				<button
					id="attended"
					className="not_present_button"
					name="checkBox"
					value={false}
					onClick={() => {
						attendantPresent(props.currentTableData, index);
						updateAttendantPresentInDb(props.currentTableData, index, props.tableDetails);
						props.incrementHandler(props.presentCount);
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
					<td>{x.checkedInNum}</td>
					<td
						id="lastName"
						className={currentValues.indexOf(null) > -1 ? "incomplete_data" : ""}
						onClick={() => props.editHandler(props.currentTableData, y)}
					>
						{x.lastName}
					</td>
					<td id="firstName">{x.firstName}</td>
					<td id="phone">
						<a
							style={x.phone && x.phone.length > 5 ? { display: "" } : { display: "none" }}
							className="call_button"
							href={`tel: ${x.phone}`}
						>
							Call
						</a>
					</td>
					<td>{alreadyChecked(x, y)}</td>
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

	//This will be the display for mobile devices.
	const displayMobileList = (array) => {
		const currentList = array;
		const renderNames = currentList.map((x, y) => {
			let currentValues = Object.values(x);

			return (
				<tr
					id={`mobile_row_number_${y}`}
					key={`rowNum${y}`}
				>
					<td>{x.checkedInNum}</td>
					<td
						id="name"
						className={currentValues.indexOf(null) > -1 ? "incomplete_data" : ""}
						onClick={() => props.editHandler(props.currentTableData, y)}
					>
						{x.lastName}
						<br></br>
						{x.firstName}
					</td>
					<td id="phone">
						<a
							style={x.phone && x.phone.length > 5 ? { display: "" } : { display: "none" }}
							className="call_button"
							href={`tel: ${x.phone}`}
						>
							Call
						</a>
					</td>
					<td>{alreadyChecked(x, y)}</td>
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
	if (props.currentTableData.length === 0 && !props.tableLoadStatus) {
		return <div></div>;
	} else if (props.currentTableData.length === 0 && props.tableLoadStatus) {
		return (
			<div id="list_wrapper">
				<AlertModule
					showModule={showAlert}
					message={alertMessage}
				/>
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
							<tr className="no_border">
								<td colspan="4">
									<button
										type="button"
										className="refresh_button"
										onClick={() => window.location.reload()}
									>
										Refresh Page
									</button>
								</td>
								<td colspan="1"></td>
							</tr>
							<tr>
								<td colspan="4">
									<h2 className="subheading">Attendance Sheet</h2>
								</td>
								<td
									colspan="1"
									style={{ textAlign: "center", paddingLeft: "0" }}
								>
									<p>{props.progressText}</p>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		);
	} else {
		return (
			<div id="list_wrapper">
				<AlertModule
					showModule={showAlert}
					message={alertMessage}
				/>

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
					<table style={mobileView ? { display: "none" } : { display: "" }}>
						<tbody>
							<tr className="no_border">
								<td colspan="4">
									<button
										type="button"
										className="refresh_button"
										onClick={() => window.location.reload()}
									>
										Refresh Page
									</button>
								</td>
								<td colspan="1"></td>
							</tr>
							<tr>
								<td colspan="4">
									<h2 className="subheading">Attendance Sheet</h2>
								</td>
								<td
									colspan="1"
									style={{ textAlign: "center", paddingLeft: "0" }}
								>
									<p>{props.progressText}</p>
								</td>
							</tr>
							<tr id="header_row">
								<th>Order#</th>
								<th>Last Name</th>
								<th>First Name</th>
								<th>Phone Number</th>
								<th>Served</th>
							</tr>

							{displayLargeScreenList(props.currentTableData)}
						</tbody>
					</table>

					<table style={mobileView ? { display: "" } : { display: "none" }}>
						<tbody>
							<tr className="no_border">
								<td colspan="3">
									<button
										type="button"
										className="refresh_button"
										onClick={() => window.location.reload()}
									>
										Refresh Page
									</button>
								</td>
								<td colspan="1"></td>
							</tr>
							<tr>
								<td colspan="3">
									<h2 className="subheading">Attendance Sheet</h2>
								</td>
								<td
									colspan="1"
									style={{ textAlign: "center", paddingLeft: "0" }}
								>
									<p>{props.progressText}</p>
								</td>
							</tr>
							<tr id="header_row">
								<th>Order#</th>
								<th>Name</th>
								<th>Phone</th>
								<th>Served</th>
							</tr>
							{displayMobileList(props.currentTableData)}
						</tbody>
					</table>
				</form>
			</div>
		);
	}
}
