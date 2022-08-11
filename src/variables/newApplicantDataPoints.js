//An array of objects that will be displayed as labels and inputs, for the application form.
const dataPoints = [
    {
      value: "",
      type: "text",
      maxWidth: 25,
      name: "firstName",
      placeHolder: "First Name",
    },
    {
      value: "",
      type: "text",
      maxWidth: 25,
      name: "lastName",
      placeHolder: "Last Name",
    },
    {
      value: "",
      type: "tel",
      maxWidth: 15,
      name: "phone",
      placeHolder: "Phone Number",
    },
    {
      value: "",
      type: "text",
      maxWidth: 25,
      name: "address",
      placeHolder: "Address",
    },
    {
      value: 0,
      type: "number",
      maxWidth: 2,
      name: "numOfPeople",
      placeHolder: "Number of People In Household",
    },
    {
      value: 0,
      type: "number",
      maxWidth: 2,
      name: "numOfChildren",
      placeHolder: "Number of Children",
    },
    {
      value: 0,
      type: "number",
      maxWidth: 2,
      name: "numOfAdults",
      placeHolder: "Number of Adults",
    },
    {
      value: 0,
      type: "number",
      maxWidth: 2,
      name: "numOfSeniors",
      placeHolder: "Number of Senior Citizens",
    },
    {
      value: null,
      type: null,
      maxWidth: null,
      name: "totalIncome",
      placeHolder: "Total Household Income",
    },
    {
      value: 0,
      type: "number",
      maxWidth: 6,
      name: "monthlyIncome",
      placeHolder: "Monthly Income",
    },
    {
      value: 0,
      type: "number",
      maxWidth: 6,
      name: "annualIncome",
      placeHolder: "Anual Income",
    },
    {
      value: 0,
      type: "number",
      maxWidth: 6,
      name: "weeklyIncome",
      placeHolder: "Weekly Income",
    },
  ];

  export default dataPoints;