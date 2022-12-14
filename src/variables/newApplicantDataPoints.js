//An array of objects that will be displayed as labels and inputs, for the application form.
const dataPoints = [
  {
    value: null,
    type: null,
    maxWidth: null,
    name: null,
    placeHolder: "Contact Information",
  },
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
      value: null,
      type: null,
      maxWidth: null,
      name: "contact_address",
      placeHolder: "Address Information",
    },
    {
      value: "",
      type: "text",
      maxWidth: 25,
      name: "street",
      placeHolder: "Street",
    },
    {
      value: "",
      type: "text",
      maxWidth: 25,
      name: "city",
      placeHolder: "City",
    },
    {
      value: "",
      type: "text",
      maxWidth: 25,
      name: "state",
      placeHolder: "State",
    },
    {
      value: "",
      type: "text",
      maxWidth: 25,
      name: "zip",
      placeHolder: "Zip Code",
    },
    {
      value: null,
      type: null,
      maxWidth: null,
      name: "numOfPeople",
      placeHolder: "Number of People In Household",
    },
    {
      value: 0,
      type: "number",
      maxWidth: 2,
      name: "children",
      placeHolder: "Number of Children",
    },
    {
      value: 0,
      type: "number",
      maxWidth: 2,
      name: "adults",
      placeHolder: "Number of Adults",
    },
    {
      value: 0,
      type: "number",
      maxWidth: 2,
      name: "seniors",
      placeHolder: "Number of Senior Citizens",
    },
    {
      value: 0,
      type: "number",
      maxWidth: 2,
      name: "totalOccupants",
      placeHolder: "Total Occupants"
    },
    {
      value: null,
      type: null,
      maxWidth: null,
      name: null,
      placeHolder: "Household Income",
    },
    {
      value: 0,
      type: "number",
      maxWidth: 6,
      name: "weeklyIncome",
      placeHolder: "Weekly Income",
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
      name: "totalIncome",
      placeHolder: "Total Income",
    },
    {
      value: function() {
        const currentDate = new Date();
        return currentDate.toLocaleDateString();
      }, 
      type: "date", 
      style: "hidden", 
      name: "dateAltered", 
      placeHolder: "Revision Date"
    }
  ];

  export default dataPoints;