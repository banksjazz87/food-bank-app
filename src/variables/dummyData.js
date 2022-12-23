//This dummy data is being exported to the server.js file
const DummyData =  [
  {
    firstName: "Greg",
    lastName: "Coleman",
    annualIncome: "$20,000",
    attended: false
  },
  {
    firstName: "George",
    lastName: "Fisher",
    annualIncome: "$60,000",
    attended: true
  },
  {
    firstName: "Ryan",
    lastName: "Van",
    annualIncome: "$30,000",
    attended: true
  },
  {
    firstName: "David",
    lastName: "Fredricks",
    annualIncome: "$10,000",
    attended: false
  },
];

//export default DummyData;
module.exports.variableName = DummyData;