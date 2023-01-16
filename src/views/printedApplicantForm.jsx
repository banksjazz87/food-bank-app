import React from "react";
import PrintedPersonCount from "../components/printedPersonCount.jsx";
import PrintedInputPair from "../components/printedInputPair.jsx";
import PrintedIncomeTable from "../components/printedIncomeTable.jsx";
import Navbar from "../components/navBar.jsx";
import paLogo from "../assets/images/pa-logo.jpeg";

export default function PrintedApplicantForm() {
  return (
    <div id="page_wrapper">
      <div className="header_wrapper">
        <h1>Applicant Form</h1>
      </div>
      <Navbar />
      <div id="printed_form_wrapper">
        <div id="logo_individuals_wrapper">
          <img
            src={paLogo}
            alt="Logo of Pennsylvania Department of Agriculture"
            id="pa_logo"
          ></img>
          <div id="person_count_wrapper">
            <PrintedPersonCount
              tableContents={[
                { title: "Children (0-17)", count: 1 },
                { title: "Adults", count: 2 },
                { title: "Seniors (60 and up)", count: 1 },
              ]}
            />
          </div>
        </div>
        <div id="top_heading">
          <h2>Bureau of Food Assistance</h2>
          <h2>The Emergency Food Assistance Program (TEFAP)</h2>
          <h4>"Self Declaration of Need"</h4>
          <h3>Effective July 1, 2022 to June 30, 2023</h3>
        </div>

        <div id="fields">
          <div id="field_block_1" className="field_block">
            <PrintedInputPair
              pairArray={[{ value: "Name", label: "Recipient Name" }]}
            />
            <PrintedInputPair
              pairArray={[{ value: "402 Myrtle", label: "Street Address" }]}
            />
            <PrintedInputPair
              pairArray={[
                { value: "Emlenton", label: "City" },
                { value: "PA", label: "State" },
                { value: 16373, label: "Zip" },
              ]}
            />
          </div>

          <div id="field_block_2" className="field_block">
            <PrintedInputPair
              pairArray={[
                {
                  value: "signature",
                  label: "Agency Representative Signature",
                },
                { value: "1/15/2023", label: "Date" },
              ]}
            />
            <PrintedInputPair
              pairArray={[
                { value: "Toadstool", label: "Distribution Site Name" },
                { value: 42, label: "Number" },
              ]}
            />
            <PrintedInputPair
              pairArray={[
                { value: "Hershey", label: "Distribution Site Location" },
              ]}
            />
          </div>
        </div>

        <div className="paragraph_wrapper">
            <p>
              The Emergency Food Assistance Program is operated in accordance
              with United States Department of Agriculture (USDA) policy, which
              prohibits discrimination on the basis of race, color, national
              origin, sex, age or disability. Eligibility is based upon the
              income guidelines listed below. The recipient circles the entire
              line that applies to their Household Size, understanding they must
              be at, or below, the income level indicated to be eligible for
              program benefits.
            </p>
          </div>
      </div>

      <div id="house_hold_income_wrapper">
        <PrintedIncomeTable 
          headings={["Household Size Circle One", "", "Annual", "", "Monthly", "", "Weekly"]}
          data={[ 
              {size: 1, annual: "25,142", monthly: "2,095", weekly: "484"}, 
              {size: 2, annual: "33,874", monthly: "2,823", weekly: "651"}, 
              {size: 3, annual: "42,606", monthly: "3,551", weekly: "819"}, 
              {size: 4, annual: "51,338", monthly: "4,278", weekly: "987"}, 
              {size: 5, annual: "60,070", monthly: "5,006", weekly: "1,155"}, 
              {size: 6, annual: "68,802", monthly: "5,734", weekly: "1,323"}, 
              {size: 7, annual: "77,534", monthly: "6,461", weekly: "1,491"}, 
              {size: 8, annual: "86,266", monthly: "7,189", weekly: "1,659"}, 
              {size: "For each additional family member add:", annual: "8,732", monthly: "728", weekly: "168"}
          ]}
        />
      </div>
    </div>
  );
}
