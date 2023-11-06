import React, { useEffect, useState } from "react";
import PrintedPersonCount from "../components/printedPersonCount.jsx";
import PrintedInputPair from "../components/printedInputPair.jsx";
import PrintedIncomeTable from "../components/printedIncomeTable.jsx";
import LoadingIcon from "../components/loadingIcon.jsx";
import Navbar from "../components/navBar.jsx";
import paLogo from "../assets/images/pa-logo.jpeg";
import redArrow from "../assets/images/red-arrow.png";

export default function PrintedApplicantForm() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    let applicant = JSON.parse(sessionStorage.getItem("currentApplicant"));

    fetch(`/single-applicant/first/${applicant.first}/last/${applicant.last}/id/${applicant.id}`)
      .then((data) => data.json())
      .then((final) => {
        setUserData(final);
      })
      .catch((err) => alert("error", err));
  }, []);

  if (userData.length === 0) {
    return (
      <LoadingIcon />
    );
  } else {
    return (
      <div id="page_wrapper">
        <div className="header_wrapper">
          <h1> Applicant Form </h1>
        </div>
        <Navbar />
        <div id="printed_form_wrapper">
          <div id="logo_individuals_wrapper">
            <img
              src={paLogo}
              alt="Logo of Pennsylvania Department of Agriculture"
              id="pa_logo"
            ></img>
            <div id="phone_number_wrapper">
             <p className="no_margin">{userData[0].phone}</p>
             <p className="top_border">Phone Number</p>
            </div>
            <div id="person_count_wrapper">
              <PrintedPersonCount
                tableContents={[
                  {
                    title: "Children (0-17)",
                    count: userData[0].children === null ? 0 : userData[0].children,
                  },
                  {
                    title: "Adults",
                    count: userData[0].adults === null ? 0 : userData[0].adults,
                  },
                  {
                    title: "Seniors (60 and up)",
                    count: userData[0].seniors === null ? 0 : userData[0].seniors,
                  },
                ]}
              />
            </div>
          </div>
          <div id="top_heading">
            <h2> Bureau of Food Assistance </h2> <h2 className="tefap_text">The Emergency Food Assistance Program(TEFAP) </h2> <h4> "Self Declaration of Need" </h4> <h3> Effective July 1, 2023 to June 30, 2024 </h3>
          </div>
          <div id="fields">
            <div
              id="field_block_1"
              className="field_block"
            >
              <PrintedInputPair
                pairArray={[
                  {
                    value: `${userData[0].firstName} ${userData[0].lastName}`,
                    label: "Recipient Name",
                  },
                ]}
              />
              <PrintedInputPair pairArray={[{ value: userData[0].street, label: "Street Address" }]} />
              <PrintedInputPair
                pairArray={[
                  { value: userData[0].city, label: "City" },
                  { value: userData[0].state, label: "State" },
                  { value: userData[0].zip, label: "Zip" },
                ]}
              />
            </div>
            <div
              id="field_block_2"
              className="field_block"
            >
              <PrintedInputPair
                pairArray={[
                  {
                    value: "",
                    label: "Agency Representative Signature",
                  },
                  { value: '', label: "Date" },
                ]}
              />
              <PrintedInputPair
                pairArray={[
                  { value: "", label: "Distribution Site Name" },
                  { value: "", label: "Number" },
                ]}
              />
              <PrintedInputPair pairArray={[{ value: "", label: "Distribution Site Location" }]} />
            </div>
          </div>
          <div className="paragraph_wrapper">
            <p>
              The Emergency Food Assistance Program is operated in accordance with United States Department of Agriculture(USDA) policy, which prohibits discrimination on the basis of race, color, national origin, sex, age or disability.Eligibility
              is based upon the income guidelines listed below.The recipient circles the <u> entire line </u> that applies to their Household Size, understanding they must be at, or below, the income level indicated to be eligible for program
              benefits.
            </p>
          </div>
          <div id="house_hold_income_wrapper">
            <PrintedIncomeTable
              headings={["Household Size Circle One", "", "Annual", "", "Monthly", "", "Weekly", ""]}
              data={[
                { size: 1, annual: "26,973", monthly: "2,248", weekly: "519" },
                { size: 2, annual: "36,482", monthly: "3,040", weekly: "702" },
                { size: 3, annual: "45,991", monthly: "3,833", weekly: "884" },
                { size: 4, annual: "55,500", monthly: "4,625", weekly: "1,067" },
                {
                  size: 5,
                  annual: "65,009",
                  monthly: "5,417",
                  weekly: "1,250",
                },
                {
                  size: 6,
                  annual: "74,518",
                  monthly: "6,210",
                  weekly: "1,433",
                },
                {
                  size: 7,
                  annual: "84,027",
                  monthly: "7,002",
                  weekly: "1,616",
                },
                {
                  size: 8,
                  annual: "93,536",
                  monthly: "7,795",
                  weekly: "1,799",
                },
                {
                  size: "For each additional family member add:",
                  annual: "9,509",
                  monthly: "792",
                  weekly: "183",
                },
              ]}
              householdSize={userData[0].totalOccupants}
            />
          </div>
          <div className="paragraph_wrapper">
            <p>
              I understand the household income limitations and hereby certify that my household size and income make me eligible for participation in the program.I also certify that, as of today, my household lives in the area served by Pennsylvania
              in The Emergency Food Assistance Program.  This certification form is being completed in connection with the receipt of Federal assistance.
            </p>
          </div>
          <div
            id="all_caps_wrapper"
            className="paragraph_wrapper"
          >
            <p className="all_caps">I UNDERSTAND THAT MAKING A FALSE STATEMENT MAY RESULT IN MY HAVING TO PAY FOR THE VALUE OF THE FOOD IMPROPERLY ISSUED TO ME AND MAY SUBJECT ME TO CRIMINAL PROSECUTION UNDER STATE AND FEDERAL LAW. </p>
          </div>
          <div id="recipient_signature">
            <div className="paragraph_wrapper">
              <p> Recipient Signature </p>
            </div>
            <div className="paragraph_wrapper">
              <p> Date </p>
            </div>
          </div>
          <div id="arrow_text">
            <img
              id="red_arrow"
              alt="Red arrow pointing to the right"
              src={redArrow}
            ></img>
            <p>
              Return completed form to your designated county agency.If you are unsure of the correct agency, <br/> please call the Bureau at 1 - 800 - 468 - 2433.
            </p>
          </div>
          <div
            id="red_text"
            className="paragraph_wrapper"
          >
            <p> THIS FORM IS NOT TO BE ALTERED OR CHANGED IN ANY WAY. </p>
          </div>
          <div
            id="boxed_text"
            className="paragraph_wrapper"
          >
            <p>PLEASE REFER TO THE REVERSE SIDE OF THIS DOCUMENT FOR AN IMPORTANT USDA NON - DISCRIMINATION STATEMENT </p>
          </div>
          <div className="paragraph_wrapper second_page_text">
            <center>
              <p> USDA Nondiscrimination Statement </p>
            </center>
          </div>
          <div className="paragraph_wrapper second_page_text">
            <p>
              In accordance with federal civil rights law and U.S.Department of Agriculture(USDA) civil rights regulations and policies, this institution is prohibited from discriminating on the basis of race, color, national origin, sex(including
              gender identity and sexual orientation), disability, age, or reprisal or retaliation for prior civil rights activity.
            </p>
          </div>
          <div className="paragraph_wrapper second_page_text">
            <p>
              Program information may be made available in languages other than English.  Persons with disabilities who require alternative means of communication to obtain program information(e.g., Braille, large print, audiotape, American Sign
              Language), should contact the responsible state or local agency that administers the program or USDA 's TARGET Center at (202) 720-2600 (voice and TTY) or contact USDA through the Federal Relay Service at(800) 877-8339.
            </p>
          </div>
          <div className="paragraph_wrapper second_page_text">
            <p>
            To file a program discrimination complaint, a Complainant should complete a Form AD-3027, USDA Program Discrimination Complaint Form which can be obtained online at: https://www.usda.gov/sites/default/files/documents/USDA-OASCR%20P-Complaint-Form-0508-0002-508-11-28-17Fax2Mail.pdf, from any USDA office, by calling (866) 632-9992, or by writing a letter addressed to USDA. The letter must contain the complainant’s name, address, telephone number, and a written description of the alleged discriminatory action in sufficient detail to inform the Assistant Secretary for Civil Rights (ASCR) about the nature and date of an alleged civil rights violation. The completed AD-3027 form or letter must be submitted to USDA by:
            </p>
          </div>
          <div
            id="contact_info"
            className="paragraph_wrapper second_page_text"
          >
            <p>
              <span className="bold_p"> 1. mail: </span> <br />
              U.S.Department of Agriculture <br />
              Office of the Assistant Secretary for Civil Rights <br />
              1400 Independence Avenue, SW <br />
              Washington, D.C. 20250 - 9410; or <br />
              <span className="bold_p"> 2. fax: </span> <br />
              (833) 256 - 1665 or(202) 690 - 7442; or <br />
              <span className="bold_p"> 3. email: </span> <br />
              program.intake@usda.gov
            </p>
          </div>
          <div
            id="institution_wrapper"
            className="paragraph_wrapper second_page_text"
          >
            <p> This institution is an equal opportunity provider. </p>
          </div>
          <div id="bottom_box_container">
            <div
              id="tefap_box"
              className="paragraph_wrapper bold"
            >
              <p>
                The Emergency Food Assistance Program <br />
                Pennsylvania Tefap Proxy Form
              </p>
            </div>
            <div
              id="bottom_date"
              className="paragraph_wrapper bottom"
            >
              <p> Date </p> <p id="date_line"> </p>
            </div>
            <div
              id="authorize_bottom"
              className="paragraph_wrapper bottom"
            >
              <div
                id="i_authorize"
                className="auth_row"
              >
                <p> I </p> <p className="authorize_line"> </p> <p> hereby authorize </p> <p className="authorize_line"> </p> <p> to pick up my </p>
              </div>
              <div
                id="tefap_package"
                className="auth_row"
              >
                <p> TEFAP Food Package and deliver it to me. </p>
              </div>
            </div>
            <div
              id="signatures_wrapper"
              className="paragraph_wrapper second_page_text bottom"
            >
              <div
                id="client_sig"
                className="line_bottom_text"
              >
                <p className="line"> </p> <p className="signature marg_left"> Client Signature </p>
              </div>
              <div id="checkbox"> </div>
              <div className="line_bottom_text">
                <p
                  id="proxy_sig_line"
                  className="line"
                >
                  
                </p>
                <p className="signature"> Proxy Signature </p>
              </div>
            </div>
            <div
              id="final_signatures_wrapper"
              className="paragraph_wrapper second_page_text bottom"
            >
              <div className="line_bottom_text">
                <p className="line"> </p> <p className="signature marg_left"> Pantry Representative </p>
              </div>
              <div id="box_text">
                <div id="small_box"> </div> <p className="signature"> Proxy ID Verified </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="print_button"
          type="button"
          onClick={() => {
            window.print();
          }}
        >
          Print
        </button>
      </div>
    );
  }
}
