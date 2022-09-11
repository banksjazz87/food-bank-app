require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
const port = 4000;

const Dummy = require("./variables/dummyData.js");
const allApplicants = require("./routes/all-applicants.js");
const login = require("./routes/login.js");

//Middleware instatiation
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//The static file that will be used on the server
app.use("/", express.static("build"));

//Just a console.log statement to let you know that the server is up and running and the port number.
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});


app.get("/all-applicants", allApplicants.findAll);
app.post("/login-attempt", login.loginAttempt);

console.log(login.Db);

//post request for new Applicant
/*app.post("/new_applicant", (req, res, next) => {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  //const requiredData = [req.body.firstName, req.body.lastName, req.body.phone, req.body.street, req.body.city, req.body.state, req.body.zip, req.body.children, req.body.adults, req.body.seniors, req.body.totalOccupants, req.body.weeklyIncome, req.body.monthlyIncome, req.body.annualIncome, req.body.totalIncome, req.body.dateAltered];

  if (req.body.annualIncome <= 200000) {
    let findApplicantSql = `SELECT * FROM applicant WHERE firstName = "${firstName}" AND lastName = "${lastName}";`;

    Data.variableName.connection.query(findApplicantSql, function(req, res, err, result) {
      if (err) {
        res.send({message: "This applicant was not found in the database"});
      } else {
        res.send({message: "applicant found" + result[0].firstName});
      }
    })
    if (Data.variableName.findApplicant("applicant", firstName, lastName)) {
      res.send({message: "This applicant already exists in the database."}) 
      
    } else {
      Data.variableName.addApplicant(requiredData);
    }
    
  } else {
    res.send({ message: "Applicant does not qualify" });
    console.log(req.body);
  }
  next();
});*/


//get request for dummyData
app.get('/dummy_data', (req, res, next) => {    const convertedData = JSON.stringify(Dummy.variableName);
    res.send(convertedData);
    console.log(Dummy.variableName);
    next();
});


let currentFoodBankAttendanceList = [];

//post request for updated foodbank attendence check sheet
app.post('/foodBank_attendance/check_sheet', (req, res, next) => {
  currentFoodBankAttendanceList = req.body.updatedData;
  res.send(req.body.updatedData);
  console.log(req.body);
  next();
});

//get request sends back the updated attendance check sheet
app.get('/foodBank_attendance/check_sheet', (req, res, next) => {
  res.send(currentFoodBankAttendanceList);
  next();
});








