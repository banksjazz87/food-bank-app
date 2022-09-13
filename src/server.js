require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
const port = 4000;
const mysql = require('mysql');


const Dummy = require("./variables/dummyData.js");

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

//Database info 
let Db = {
  host: "localhost", 
  user: "root", 
  password: process.env.MYSQL_PASSWORD,
  database: ""

};

//app.get("/all-applicants", allApplicants.findAll);
app.post("/login-attempt", (req, res, next) => {
  if (
    req.body.currentUser === process.env.CHAPEL_USER &&
    req.body.currentPassword === process.env.CHAPEL_PASSWORD
  ) {
    
    Db.database = "testingFoodBank";
    
    let selectedDb = mysql.createConnection(Db);
    selectedDb.connect((err) => {
        err ? console.log(err) : console.log('you are connected to the database');
    });
    res.send({ message: "valid" });
    
  } else if (
    req.body.currentUser === process.env.TESTING_USER &&
    req.body.currentPassword === process.env.TESTING_PASSWORD
  ) {
    console.log({ message: "valid" });
    res.send({ message: "valid" });
  } else {
    res.send({ message: "invalid" });
    console.log({ message: "invalid" });
  }
  next();
});

//return all applicants from the selected database from the login.
app.get("/all-applicants", (req, res, next) => {
  let allApplicants = new Promise((resolve, reject) => {
    
    let currentDb = mysql.createConnection(Db);
    let sql = "SELECT * FROM applicant";
    
    currentDb.query(sql, (error, results) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(results);
      }
    });
  });

  allApplicants.then(data => res.send(data));
});

//post request for new Applicant
app.post("/new-applicant/", (req, res, next) => {
  
  const requiredData = [req.body.firstName, req.body.lastName, req.body.phone, req.body.street, req.body.city, req.body.state, req.body.zip, req.body.children, req.body.adults, req.body.seniors, req.body.totalOccupants, req.body.weeklyIncome, req.body.monthlyIncome, req.body.annualIncome, req.body.totalIncome, req.body.dateAltered];

  if (req.body.annualIncome <= 200000) {
    let createApplicant = new Promise((resolve, reject) => {
      let currentDb = mysql.createConnection(Db);
      let sql = `INSERT INTO applicant (firstName, lastName, phone, street, city, state, zip, children, adults, seniors, totalOccupants, weeklyIncome, monthlyIncome, annualIncome, totalIncome, dateAltered) VALUES (?)`;

      currentDb.query(sql, [requiredData], (err, results) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(results);
        }
      });
    });

    createApplicant.then((data) => {
        console.log(data); 
        if(data.insertId) { 
          res.send({message: `${req.body.firstName} ${req.body.lastName} has been entered into the database.`}); 
        } else {
          res.send({message: `There has been an error.`})
        }
        });
  }
    
});


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










