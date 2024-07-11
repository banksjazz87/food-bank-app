import React, { useEffect, useState } from "react";
import dataPoints from "../variables/newApplicantDataPoints.js";
import MathFunctions from "../functions/mathFunctions.js";
import ZipCodeFunctions from "../functions/zipCodeFunctions.js";
import PhoneNumberCheck from "../functions/phoneNumberCheck.js";
import "../assets/styles/newApplicantForm.scss";

export default function NewApplicantForm(props) {
	//React Hook that will be used to update the state of each input, will initialize the state with the dateAltered field.
	const currentDate = new Date();

	const initialFormState = {
		firstName: "",
		lastName: "",
		phone: null,
		street: null,
		city: null,
		state: "PA",
		zip: null,
		children: 0,
		adults: 0,
		seniors: 0,
		totalOccupants: 0,
		weeklyIncome: null,
		monthlyIncome: null,
		annualIncome: null,
		totalIncome: null,
		dateAltered: currentDate.toLocaleDateString(),
	};

	const [field, setField] = useState(initialFormState);
	const [zipCodes, setZipCodes] = useState({});

	//This is used to update the zip code if a zip code exists for the entered city, and also updates the total occupants.
	useEffect(() => {
		if (field.city) {
			setField({
				...field,
				zip: ZipCodeFunctions.getZipCode(zipCodes, field.city, field.zip),
				totalOccupants: MathFunctions.returnSum([field.children, field.adults, field.seniors]),
			});
		} else {
			setField({
				...field,
				totalOccupants: MathFunctions.returnSum([field.children, field.adults, field.seniors]),
			});
		}
	}, [zipCodes, field]);

	//Sets the zipCodes object to be used when checking to see if a zip code exists for a city.
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

	const returnFields = dataPoints.map((x, y) => {
		if (x.value === null) {
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
		} else if (x.style === "hidden") {
			return (
				<input
					key={`input_${y}`}
					type={x.type}
					id={x.name}
					style={{ display: "none" }}
					value={x.value()}
				/>
			);
		} else {
			return (
				<div
					className="input_pair"
					key={`input_${y}`}
				>
					<label
						className="new_applicant_label"
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
						value={field[x.name]}
						className="new_applicant_input"
						maxLength={x.maxWidth}
						name={x.name}
						min={x.type === "number" ? 0 : ""}
						onChange={(e) => {
							if (x.currency === true) {
								setField({ ...field, [x.name]: parseInt(e.target.value) });
							} else if (x.name === "phone") {
								setField({ ...field, [x.name]: PhoneNumberCheck.returnUpdatedPhoneNumber(e.target.value, field) });
							} else {
								setField({ ...field, [x.name]: e.target.value });
							}
						}}
						onBlur={(e) => {
							if (x.currency === true) {
								setField({...field, [x.name]: parseFloat(field[x.name]).toFixed(2)})
							}
						}}
						onWheel={(e) => {
							e.target.blur();
						}}
					/>
				</div>
			);
		}
	});

	return (
		<div id="applicant_form_wrapper">
			<button
				id="close_form_x"
				type="button"
				style={window.location.pathname === "/current-registered-list" ? { display: "" } : { display: "none" }}
				onClick={() => {
					props.cancel();
					setField(initialFormState);
				}}
			>
				X
			</button>
			<form
				id="applicant_form"
				className="shadow_form"
				action={props.route}
				method="post"
				onSubmit={(e) => {
					e.preventDefault();
					const currentForm = document.getElementById("applicant_form");

					if (field.firstName.length > 0 && field.lastName.length > 0) {
						fetch(`/single-applicant-check/first/${field.firstName}/last/${field.lastName}`)
							.then((results) => results.json())
							.then((data) => {
								if (data.length === 0) {
									props.submissionHandler(field);
									setField(initialFormState);
									currentForm.reset();
								} else {
									alert(`An applicant by the name of ${field.firstName} ${field.lastName} is already in the database.`);
									setField(initialFormState);
									currentForm.reset();
									currentForm.scrollIntoView({ behavior: "smooth" });
								}
							});
					} else {
						alert("First Name and Last Name are required.");
						currentForm.scrollIntoView({ behavior: "smooth" });
					}
				}}
			>
				{returnFields}
				<input
					id="new_applicant_submit"
					type="submit"
					value="Submit"
				/>
			</form>
		</div>
	);
}
