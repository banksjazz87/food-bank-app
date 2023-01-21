import React from "react";
import PrintedPersonCount from "../components/printedPersonCount.jsx";
import PrintedInputPair from "../components/printedInputPair.jsx";
import PrintedIncomeTable from "../components/printedIncomeTable.jsx";
import Navbar from "../components/navBar.jsx";
import paLogo from "../assets/images/pa-logo.jpeg";
import redArrow from "../assets/images/red-arrow.png";

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
          <h2 className="tefap_text">
            The Emergency Food Assistance Program (TEFAP)
          </h2>
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
            The Emergency Food Assistance Program is operated in accordance with
            United States Department of Agriculture (USDA) policy, which
            prohibits discrimination on the basis of race, color, national
            origin, sex, age or disability. Eligibility is based upon the income
            guidelines listed below. The recipient circles the{" "}
            <u>entire line</u> that applies to their Household Size,
            understanding they must be at, or below, the income level indicated
            to be eligible for program benefits.
          </p>
        </div>

        <div id="house_hold_income_wrapper">
          <PrintedIncomeTable
            headings={[
              "Household Size Circle One",
              "",
              "Annual",
              "",
              "Monthly",
              "",
              "Weekly",
              "",
            ]}
            data={[
              { size: 1, annual: "25,142", monthly: "2,095", weekly: "484" },
              { size: 2, annual: "33,874", monthly: "2,823", weekly: "651" },
              { size: 3, annual: "42,606", monthly: "3,551", weekly: "819" },
              { size: 4, annual: "51,338", monthly: "4,278", weekly: "987" },
              { size: 5, annual: "60,070", monthly: "5,006", weekly: "1,155" },
              { size: 6, annual: "68,802", monthly: "5,734", weekly: "1,323" },
              { size: 7, annual: "77,534", monthly: "6,461", weekly: "1,491" },
              { size: 8, annual: "86,266", monthly: "7,189", weekly: "1,659" },
              {
                size: "For each additional family member add:",
                annual: "8,732",
                monthly: "728",
                weekly: "168",
              },
            ]}
          />
        </div>

        <div className="paragraph_wrapper">
          <p>
            I understand the household income limitations and hereby certify
            that my household size and income make me eligible for participation
            in the program. I also certify that, as of today, my household lives
            in the area served by Pennsylvania in The Emergency Food Assistance
            Program. This certification form is being completed in connection
            with the receipt of Federal assistance.
          </p>
        </div>

        <div id="all_caps_wrapper" className="paragraph_wrapper">
          <p className="all_caps">
            I UNDERSTAND THAT MAKING A FALSE STATEMENT MAY RESULT IN MY HAVING
            TO PAY FOR THE VALUE OF THE FOOD IMPROPERLY ISSUED TO ME AND MAY
            SUBJECT ME TO CRIMINAL PROSECUTION UNDER STATE AND FEDERAL LAW.
          </p>
        </div>

        <div id="recipient_signature">
          <div className="paragraph_wrapper">
            <p>Recipient Signature</p>
          </div>
          <div className="paragraph_wrapper">
            <p>Date</p>
          </div>
        </div>

        <div id="arrow_text">
          <img
            id="red_arrow"
            alt="Red arrow pointing to the right"
            src={redArrow}
          ></img>
          <p>
            Return completed form to your designated county agency. If you are
            unsure of the correct agency,<br></br> please call the Bureau at
            1-800-468-2433.
          </p>
        </div>

        <div id="red_text" className="paragraph_wrapper">
          <p>THIS FORM IS NOT TO BE ALTERED OR CHANGED IN ANY WAY.</p>
        </div>

        <div id="boxed_text" className="paragraph_wrapper">
          <p>
            PLEASE REFER TO THE REVERSE SIDE OF THIS DOCUMENT FOR AN IMPORTANT
            USDA NON-DISCRIMINATION STATEMENT
          </p>
        </div>

        <div className="paragraph_wrapper second_page_text">
          <center>
            <p>USDA Nondiscrimination Statement</p>
          </center>
        </div>

        <div className="paragraph_wrapper second_page_text">
          <p>
            In accordance with federal civil rights law and U.S. Department of
            Agriculture (USDA) civil rights regulations and policies, this
            institution is prohibited from discriminating on the basis of race,
            color, national origin, sex (including gender identity and sexual
            orientation), disability, age, or reprisal or retaliation for prior
            civil rights activity.
          </p>
        </div>

        <div className="paragraph_wrapper second_page_text">
          <p>
            Program information may be made available in languages other than
            English. Persons with disabilities who require alternative means of
            communication to obtain program information (e.g., Braille, large
            print, audiotape, American Sign Language), should contact the
            responsible state or local agency that administers the program or
            USDA's TARGET Center at (202) 720-2600 (voice and TTY) or contact
            USDA through the Federal Relay Service at (800) 877-8339.
          </p>
        </div>

        <div className="paragraph_wrapper second_page_text">
          <p>
            To file a program discrimination complaint, a Complainant should
            complete a Form AD-3027, USDA Program Discrimination Complaint Form
            which can be obtained online at:
            https://www.usda.gov/sites/default/files/documents/USDA-OASCR%20P-Complaint-Form-0508-0002-508-
            11-28-17Fax2Mail.pdf, from any USDA office, by calling (866)
            632-9992, or by writing a letter addressed to USDA. The letter must
            contain the complainant's name, address, telephone number, and a
            written description of the alleged discriminatory action in
            sufficient detail to inform the Assistant Secretary for Civil Rights
            (ASCR) about the nature and date of an alleged civil rights
            violation. The completed AD-3027 form or letter must be submitted to
            USDA by:
          </p>
        </div>

        <div id="contact_info" className="paragraph_wrapper second_page_text">
          <p>
            <span className="bold_p">1. mail:</span>
            <br />
            U.S. Department of Agriculture <br />
            Office of the Assistant Secretary for Civil Rights
            <br />
            1400 Independence Avenue, SW
            <br />
            Washington, D.C. 20250-9410; or
            <br />
            <span className="bold_p">2. fax:</span>
            <br />
            (833) 256-1665 or (202) 690-7442; or <br />
            <span className="bold_p">3. email:</span>
            <br />
            program.intake@usda.gov
          </p>
        </div>

        <div id="institution_wrapper" className="paragraph_wrapper second_page_text">
          <p>This institution is an equal opportunity provider.</p>
        </div>

        <div id="bottom_box_container">
          <div id="tefap_box" className="paragraph_wrapper bold">
            <p>
              The Emergency Food Assistance Program <br />
              Pennsylvania Tefap Proxy Form
            </p>
          </div>

          <div id="bottom_date" className="paragraph_wrapper bottom">
            <p>Date</p>
            <p id="date_line"></p>
          </div>

          <div id="authorize_bottom" className="paragraph_wrapper bottom">
            <div id="i_authorize" className="auth_row">
              <p>I</p>
              <p className="authorize_line"></p>
              <p>hereby authorize</p>
              <p className="authorize_line"></p>
              <p>to pick up my</p>
            </div>
            <div id="tefap_package" className="auth_row">
              <p>TEFAP Food Package and deliver it to me.</p>
            </div>
          </div>

          <div id="signatures_wrapper" className="paragraph_wrapper second_page_text bottom">
            <div id="client_sig" className="line_bottom_text">
              <p className="line"></p>
              <p className="signature marg_left">Client Signature</p>
            </div>
            <div id="checkbox"></div>
            <div className="line_bottom_text">
              <p id="proxy_sig_line" className="line"></p>
              <p className="signature">Proxy Signature</p>
            </div>
          </div>

          <div id="final_signatures_wrapper" className="paragraph_wrapper second_page_text bottom">
            <div className="line_bottom_text">
              <p className="line"></p>
              <p className="signature marg_left">Pantry Representative</p>
            </div>
            <div id="box_text">
              <div id="small_box"></div>
              <p className="signature">Proxy ID Verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
