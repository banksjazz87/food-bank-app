import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ZipCodeFunctions from "../functions/zipCodeFunctions.js";
import MathFunctions from "../functions/mathFunctions.js";
import putRequest from "../functions/putRequest.js";
import dataPoints from "../variables/newApplicantDataPoints.js";
import "../assets/styles/editDisplay.scss";

export default function EditPage(props) {
	const navigate = useNavigate();

	const [zipCodes, setZipCodes] = useState({});

	//Get all of the different zip codes.
	useEffect(() => {
		fetch("/get-city-zip")
			.then((data) => data.json())
			.then((final) => {
				if (final.length > 0) {
					let codes = ZipCodeFunctions.getZipCodePairs(final);
					setZipCodes(codes);
				}
			});
	}, []);

	useEffect(() => {
		if (props.display) {
			let copyOfApplicant = props.currentApplicant.slice();
			let firstIndex = copyOfApplicant[0];

			if (firstIndex.city) {
				copyOfApplicant[0].zip = ZipCodeFunctions.getZipCode(zipCodes, firstIndex.city, firstIndex.zip);

				copyOfApplicant[0].totalOccupants = MathFunctions.returnSum([firstIndex.children, firstIndex.adults, firstIndex.seniors]);

				props.updateApplicant(copyOfApplicant);
			} else {
				let copyOfApplicant = props.currentApplicant.slice();
				let firstIndex = copyOfApplicant[0];

				copyOfApplicant[0].totalOccupants = MathFunctions.returnSum([firstIndex.children, firstIndex.adults, firstIndex.seniors]);

				props.updateApplicant(copyOfApplicant);
			}
		}
	}, [props, zipCodes]);

	const returnInputs = dataPoints.map((x, y) => {
		if (x.type === null) {
			return (
				<p
					id={x.name}
					className="section_heading"
					key={`label_${y}`}
					for={x.name}
				>
					{x.placeHolder}
				</p>
			);
		} else if (x.name === "dateAltered") {
			return (
				<input
					key={`input_$y`}
					type={x.type}
					value={() => {
						const currentDate = new Date();
						return currentDate.toLocaleDateString();
					}}
					style={{ display: "none" }}
				/>
			);
		} else {
			return (
				<div
					className="input_pair"
					key={`input_${y}`}
				>
					<label
						key={`label_${y}`}
						htmlFor={x.name}
					>
						{x.placeHolder}
					</label>
					<br />
					<input
						key={`input_${y}`}
						type={x.type}
						id={x.name}
						value={props.currentApplicant[0][x.name]}
						className="new_applicant_input"
						maxLength={x.maxWidth}
						name={x.name}
						min={x.type === "number" ? 0 : ""}
						onChange={(e) => {
							props.handleChange([x.name], e.target.value);
						}}
					/>
				</div>
			);
		}
	});
	return (
		<div
			id="edit_applicant_wrapper"
			style={props.display ? { display: "" } : { display: "none" }}
		>
			<form
				id="edit_form"
				method="post"
				onSubmit={(e) => {
					e.preventDefault();

					if (props.currentApplicant[0].firstName.length > 0 && props.currentApplicant[0].lastName.length > 0) {
						//Get the current foodbank list table.
						let currentFoodBankList = "";

						fetch("/most-recent-fb-list")
							.then((data) => data.json())
							.then((final) => {
								currentFoodBankList = final.allData.title;

								fetch(`/find-user/table/${currentFoodBankList}/applicant/${props.currentApplicant[0].ApplicantID}`)
									.then((data) => data.json())
									.then((final) => {
										if (final.length > 0) {
											props.currentApplicant[0].tableName = currentFoodBankList;
											putRequest("/update-applicant/current-list", props.currentApplicant[0]).then((data) => {
												if (data.message.includes("Success")) {
													alert(data.message);

													const currentPath = window.location.pathname;

													if (currentPath === "/current-registered-list") {
														props.clearForm();
														props.hidePage();
													} else {
														navigate("/dashboard", { replace: true });
													}
												} else {
													alert(data.message);
												}
											});
										} else {
											putRequest("/applicant/update", props.currentApplicant[0]).then((data) => {
												if (data.message.includes("Success")) {
													alert(data.message);

													const currentPath = window.location.pathname;

													if (currentPath === "/current-registered-list") {
														props.clearForm();
														props.hidePage();
													} else {
														navigate("/dashboard", { replace: true });
													}
												} else {
													alert(data.message);
												}
											});
										}
									});
							});
					} else {
						alert("All applicants must have a first and last name");
					}
				}}
			>
				{returnInputs}
				<input
					class="input_button"
					type="submit"
					value="Submit"
				/>
			</form>
		</div>
	);
}
