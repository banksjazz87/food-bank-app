import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar.jsx";
import AttendanceSubHeading from "../components/attendanceSubHeading.jsx";
import DisplayCurrentFoodBankList from "../components/displayCurrentFoodBankList";
import EditModuleForCurrentList from "../components/editModuleCurrentList.jsx";
import PrintFoodBankList from "../components/printFoodBankList.jsx";
import postRequest from "../functions/post.js";
import DeleteAlert from "../components/deleteAlert.jsx";
import EditPage from "../components/editDisplay.jsx";
import DisplayCurrentFoodBankCheckIn from "../components/displayCurrentFoodBankCheckIn.jsx";
import "../assets/styles/currentFoodBankList.scss";
import PhoneNumberCheck from "../functions/phoneNumberCheck.js";

//for development mode
//import DummyData from "../variables/dummyData.js";

export default function CurrentFoodBankList() {
	let initialApplicant = [
		{
			firstName: "",
			lastName: "",
			phone: "",
			street: "",
			city: "",
			state: "PA",
			zip: "",
			children: "",
			adults: "",
			seniors: "",
			totalOccupants: "",
			weeklyIncome: "",
			monthlyIncome: "",
			annualIncome: "",
			totalIncome: "",
			dateAltered: "",
		},
	];

	const [tableInfo, setTableInfo] = useState({ title: "", dateCreated: "" });
	const [table, setTable] = useState([]);
	const [tableLoaded, setTableLoaded] = useState(false);
	const [showRemoveButtons, setShowRemoveButtons] = useState(false);
	const [displayDeleteAlert, setDisplayDeleteAlert] = useState(false);
	const [selectedAttendant, setSelectedAttendant] = useState([]);
	const [showEditModule, setShowEditModule] = useState(false);
	const [selectedApplicant, setSelectedApplicant] = useState(initialApplicant);
	const [showEditPage, setShowEditPage] = useState(false);
	const [totalPresent, setTotalPresent] = useState(0);
	const [selectedRow, setSelectedRow] = useState(0);
	const [checkedInList, setCheckedInList] = useState([]);
	const [currentTable, setCurrentTable] = useState([]);

	///Comment out for development
	//Setting the tableInfo as well as the table data on the initial render.
	useEffect(() => {
		fetch("/most-recent-fb-list")
			.then((data) => data.json())
			.then((final) => {
				if (final.message === "success") {
					setTableInfo({
						...tableInfo,
						title: final.allData.title,
						dateCreated: final.allData.dateCreated,
					});

					fetch(`/get-past-list/list-name/${final.allData.title}/get-all`)
						.then((data) => data.json())
						.then((result) => {
							setTable(result.allData);
							setTableLoaded(true);
							PresentCountMethods.presentCount(result.allData);
						});
				} else {
					alert(final.message);
				}
			});
	}, []);

	//Get the checked in table.
	useEffect(() => {
		if (tableInfo.title.length > 0) {
			fetch(`/get-checked-in/${tableInfo.title}`)
				.then((data) => data.json())
				.then((result) => {
					if (result.message === "Success") {
						setCheckedInList(result.data);
					} else {
						alert(result);
					}
				});
		}
	}, [tableInfo]);


	//Get the session storage table item, to determine which table should be displayed.
	useEffect(() => {
		const neededTable = sessionStorage.getItem('tableView');

		if (neededTable) {
			setCurrentTable(neededTable);
		} else {
			setCurrentTable('check-in-table');
		}
	}, []);

	

	//This function will be used to just update the current table data, replacing it with a new array.
	const updateTable = (arr) => {
		setTable(arr);
	};

	//Used to updated the checked in list.
	const updateCheckedInList = (arr) => {
		setCheckedInList(arr);
	};

	//Used to update the selected applicant this will be passed to the edit page component.
	const updateSelectedApplicant = (arr) => {
		setSelectedApplicant(arr);
	};


	//Used to get the applicant from a certain table, this will only return the firstname.  Using this method as a check to verify that we can't add an attendant that already exists in the table.
	const getApplicant = async (table, first, last) => {
		try {
			const applicantRequest = await fetch(`/check-applicant-exists-in-table/${table}/${first}/${last}`);
			const applicantJSON = await applicantRequest.json();

			return applicantJSON;

		} catch(e) {
			return `The following error occurred, ${e}`;
		}
	}

	//Inserts an already existing applicant into the most recent table.
	const insertAlreadyExistingIntoTable = (arr) => {
		let applicantObj = {
			firstName: arr[0].firstName,
			lastName: arr[0].lastName,
			phone: arr[0].phone,
			ApplicantID: arr[0].ApplicantID,
		};

		postRequest(`/save-list/list-name/${tableInfo.title}`, applicantObj).then((data) => {
			if (data.message !== "success") {
				alert(data.message);
			}
		});
	};

	//This function will add an already existing applicant to the current foodbank list.
	const addApplicant = (chosenNameArr) => {
		let copyOfArr = table.slice();
		const firstName = chosenNameArr[0].firstName;
		const lastName = chosenNameArr[0].lastName;

		// //Make a copy of the chosenNameArr and then add the present field of false to it.
		let copyOfChosen = chosenNameArr.slice();
		copyOfChosen[0].present = "false";
		copyOfChosen[0].checkedIn = 0;
		copyOfChosen[0].checkedInNum = 0;


		getApplicant(tableInfo.title, firstName, lastName).then((data) => {
			if (data.data.length > 0) {
				alert("This person is already included in this table");
				setShowEditModule(false);
			} else {
				setTable(copyOfArr.concat(copyOfChosen));
				insertAlreadyExistingIntoTable(chosenNameArr);
				setShowEditModule(false);
			}
		}).catch((err) => {
			console.warn(err.message);
		});
	};

	const showEditHandler = () => {
		if (showEditModule) {
			setShowEditModule(false);
		} else {
			setShowEditModule(true);
		}
	};

	//Function used to remove an applicant from the list.
	const selectedForRemoval = (index, arr) => {
		const copyOfArr = arr.slice();
		const chosenFromArr = copyOfArr.slice(index, index + 1);
		setSelectedAttendant(chosenFromArr);
		setShowRemoveButtons(false);
	};

	//This is used for removing a selected Attendant from an array.  Primarily being used for the table array and the checkedInList array.
	const removeFromArray = (fullArr, selectedArr, setMethod) => {
		const allFirstLast = fullArr.map((x, y) => {
			let fullName = `${x.firstName}${x.lastName}`;
			return fullName;
		});

		const selectedFirstLast = `${selectedArr[0].firstName}${selectedArr[0].lastName}`;

		if (allFirstLast.indexOf(selectedFirstLast) > -1) {
			const copyOfFull = fullArr.slice();
			copyOfFull.splice(allFirstLast.indexOf(selectedFirstLast), 1);
			// return setTable(copyOfFull);
			setMethod(copyOfFull);
		}
	};

	//This will be use to add a brand new applicant to the table.
	const addNewToTable = (obj) => {
		const currentTable = table.slice();
		const arrayOfNeededFields = [
			{
				firstName: obj.firstName,
				lastName: obj.lastName,
				phone: obj.phone,
				present: obj.present,
				ApplicantID: obj.ApplicantID,
				checkedIn: 0,
				checkedInNum: 0,
			},
		];

		setTable(currentTable.concat(arrayOfNeededFields));
		showEditHandler();
	};

	//This will be used to set the selected applicant that needs updated, and display the edit page.
	const setEditApplicant = (arr, index) => {
		clearSelectedApplicant();
		setSelectedApplicant([arr[index]]);
		setSelectedRow(index);
		setShowEditPage(true);

		setTimeout(() => {
			const editPage = document.getElementById("edit_form");
			editPage.scrollIntoView({ behavior: "smooth" });
		}, 500);
	};

	//This will clear the previously selected applicant.
	const clearSelectedApplicant = () => {
		const editForm = document.getElementById("edit_form");
		editForm.reset();
		setSelectedApplicant(initialApplicant);
	};

	//This will update the current applicant's information, used if an applicant has missing information in their application.
	const updateInfo = (field, value) => {
		const currentDate = new Date();
		let currentApplicant = selectedApplicant.slice();

		if (field[0] === "phone") {
			PhoneNumberCheck.phoneNumberUpdate(field, value, currentApplicant, currentDate, setSelectedApplicant);
		} else {
			currentApplicant[0][field] = value;
			currentApplicant[0]["dateAltered"] = currentDate.toLocaleDateString();
			setSelectedApplicant(currentApplicant);
		}
	};

	//This will hide the eidt page after it has been submitted and then it will scroll back to the selected row.
	const hideEditPage = () => {
		setShowEditPage(false);

		setTimeout(() => {
			let currentRow = "";

			if (window.innerWidth > 1024) {
				currentRow = document.getElementById(`row_number_${selectedRow}`);
				currentRow.scrollIntoView({ behavior: "smooth" });
			} else {
				currentRow = document.getElementById(`mobile_row_number_${selectedRow}`);
			}

			currentRow.scrollIntoView({ behavior: "smooth" });
		}, 500);
	};

	//This will return the number of applicants who have gone through the foodbank.
	const PresentCountMethods = {
		presentCount: function (arr) {
			let count = 0;

			for (let i = 0; i < arr.length; i++) {
				if (arr[i].present === "true") {
					count = count + 1;
				}
			}
			return setTotalPresent(count);
		},

		incrementPresentCount: function (num) {
			return setTotalPresent(num + 1);
		},

		decrementPresentCount: function (num) {
			return setTotalPresent(num - 1);
		},
	};

	/**
	 *
	 * @param {*array} arr
	 * @param {*number} id
	 * @returns null or number
	 */
	const findAttendantIndexById = (arr, id) => {
		let targetIndex = null;
		let i = 0;

		while (targetIndex === null && i < arr.length) {
			if (arr[i].ApplicantID === id) {
				targetIndex = i;
			} else {
				i++;
			}
		}

		return targetIndex;
	};

	/**
	 *
	 * @param {*array} arrName
	 * @param {*number} indexNum
	 * @param {*number} checkInNum
	 * @returns void
	 * @description used to update the state of the attendant when they are checked in.
	 */
	const addToCheckedIn = (id, orderNum) => {
		const indexNum = findAttendantIndexById(table, id);
		const selected = table.slice(indexNum, indexNum + 1);
		selected[0].checkedInNum = orderNum;
		const copyOfCheckedIn = checkedInList.slice();
		const finalArr = copyOfCheckedIn.concat(selected);

		setCheckedInList(finalArr);
	};

	
	/**
	 * 
	 * @param {*} id the id of the user to be removed
	 * @param {*} array the array that will need to be updated, to update the state
	 * @param {*} updateMethod the method used to update the state
	 * @description updates the state of the designated array, after removing an attendant.
	 * @returns void
	 */
	const removeFromList= (id, array, updateMethod) => {
		let arrayCopy = array.slice();
		let targetIndex = findAttendantIndexById(array, id);
		arrayCopy.splice(targetIndex, 1);

		updateMethod(arrayCopy);
	}


	/**
	 * 
	 * @param {*} str string
	 * @returns void
	 * @description updatges the state of the current table that should be displayed, and also updates the session storage variable.
	 */
	const viewClickHandler = (str) => {
		setCurrentTable(str);
		sessionStorage.setItem('tableView', str);
	}

	return (
		<div id="current_fb_list">
			<div
				id="current_fb_list_header_wrapper"
				className="header_wrapper"
			>
				<h1 className="header"> Current Food Bank List </h1>
			</div>
			<NavBar />
			<AttendanceSubHeading currentCount={parseInt(table.length) - parseInt(totalPresent) + ` Remaining`} />

			<div id="table_name">
				<h1 id="list_title">{tableInfo.title}</h1>
			</div>

			<div className="table_toggle_buttons">
				<button
					type="button"
					onClick={() => viewClickHandler("check-in-table")}
					className={currentTable === "check-in-table" ? "selected_btn" : "non_selected_btn"}
				>
					Check In
				</button>
				<button
					type="button"
					onClick={() => viewClickHandler("check-out-table")}
					className={currentTable === "check-out-table" ? "selected_btn" : "non_selected_btn"}
				>
					Check Out
				</button>
			</div>

			<DisplayCurrentFoodBankCheckIn
				tableToDisplay={currentTable}
				tableName="check-in-table"
				currentTableData={table}
				loadStatus={tableLoaded}
				checkedInTable={checkedInList}
				tableDetails={tableInfo}
				updateTableHandler={updateTable}
				editHandler={setEditApplicant}
				addToCheckedInHandler={addToCheckedIn}
				removeFromCheckedInHandler={(id) => {
					removeFromList(id, checkedInList, setCheckedInList);
					removeFromList(id, currentTable, setCurrentTable);
				}}
				showRemoveBtns={showRemoveButtons}
				selectedRemovalHandler={selectedForRemoval}
				showDeleteAlertHandler={() => setDisplayDeleteAlert(true)}
			/>
			<div
				id="edit_cancel_button_wrapper"
				style={currentTable === "check-in-table" ? { display: "" } : { display: "none" }}
			>
				<button
					class="edit_button"
					type="button"
					onClick={showEditHandler}
				>
					Edit
				</button>
				<button
					class="edit_button"
					type="button"
					onClick={() => window.print()}
				>
					Print
				</button>
				<button
					class="cancel_button"
					type="button"
					style={showRemoveButtons ? { display: "" } : { display: "none" }}
					onClick={() => setShowRemoveButtons(false)}
				>
					Cancel
				</button>
			</div>
			<DisplayCurrentFoodBankList
				tableToDisplay={currentTable}
				tableName="check-out-table"
				currentTableData={checkedInList}
				tableDetails={tableInfo}
				updateTableHandler={updateCheckedInList}
				showRemoveBtns={showRemoveButtons}
				selectedRemovalHandler={selectedForRemoval}
				showDeleteAlertHandler={() => setDisplayDeleteAlert(true)}
				editHandler={setEditApplicant}
				incrementHandler={PresentCountMethods.incrementPresentCount}
				decrementHandler={PresentCountMethods.decrementPresentCount}
				presentCount={totalPresent}
				progressText={`${totalPresent}/${table.length} Served`}
				tableLoadStatus={tableLoaded}
			/>
			<PrintFoodBankList
				tableTitle={tableInfo.title}
				tableData={table}
			/>
			<EditModuleForCurrentList
				display={showEditModule}
				searchBarClick={addApplicant}
				tableDetails={tableInfo}
				allTableData={table}
				showRemoveHandler={() => {
					setShowRemoveButtons(true);
					setShowEditModule(false);
				}}
				hideModuleHandler={() => setShowEditModule(false)}
				addNewHandler={addNewToTable}
			/>
			<DeleteAlert
				display={displayDeleteAlert}
				routePath={`/remove-attendant/table/${tableInfo.title}`}
				selected={selectedAttendant[0]}
				warningMessage={selectedAttendant.length > 0 ? `Are you sure that you would like to remove ${selectedAttendant[0].firstName} ${selectedAttendant[0].lastName} from the current foodbank list?` : ""}
				noClickHandler={() => {
					setDisplayDeleteAlert(false);
				}}
				yesClickHandler={() => {
					removeFromArray(table, selectedAttendant, setTable);
					removeFromArray(checkedInList, selectedAttendant, setCheckedInList);
					setDisplayDeleteAlert(false);
				}}
			/>
			<EditPage
				display={showEditPage}
				currentApplicant={selectedApplicant}
				handleChange={updateInfo}
				hidePage={hideEditPage}
				clearForm={clearSelectedApplicant}
				updateApplicant={updateSelectedApplicant}
			/>
		</div>
	);
}
