require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
const port = 4000;
const mysql = require("mysql");

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
  database: "",
};

//Error message if something doesn't work in the sql query.
let sqlError = (obj) => {
  return {
    message: `The following error has occurred mySql code: ${obj.code} with sqlMessage: ${obj.sqlMessage}`,
  };
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
      err ? console.log(err) : console.log("you are connected to the database");
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
    let sql = "SELECT * FROM applicant ORDER BY lastName";

    currentDb.query(sql, (error, results) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(results);
      }
    });
  });

  allApplicants.then((data) => res.send(data));
});

//post request for new Applicant
app.post("/new-applicant/", (req, res, next) => {
  const requiredData = [
    req.body.firstName,
    req.body.lastName,
    req.body.phone,
    req.body.street,
    req.body.city,
    req.body.state,
    req.body.zip,
    req.body.children,
    req.body.adults,
    req.body.seniors,
    req.body.totalOccupants,
    req.body.weeklyIncome,
    req.body.monthlyIncome,
    req.body.annualIncome,
    req.body.totalIncome,
    req.body.dateAltered,
  ];

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

    createApplicant
      .then((data) => {
        console.log(data);
        if (data.insertId) {
          res.send({
            status: "okay",
            message: `${req.body.firstName} ${req.body.lastName} has been entered into the database.`,
          });
        }
      })
      .catch((e) => {
        res.send({
          status: "not good",
          message: `The following error has occurred mySql code: ${e.code} with sqlMessage: ${e.sqlMessage}`,
        });
      });
  }
});

//The get method used to return the data about one applicant.
app.get(
  "/single-applicant/first/:firstName/last/:lastName/id/:ApplicantID",
  (req, res) => {
    let findApplicant = new Promise((resolve, reject) => {
      let currentDb = mysql.createConnection(Db);
      let sql = `SELECT * FROM applicant WHERE firstName = "${req.params.firstName}" AND lastName = "${req.params.lastName}" AND ApplicantID = ${req.params.ApplicantID};`;

      currentDb.query(sql, (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        } else {
          console.log(results);
          return resolve(results);
        }
      });
    });

    findApplicant.then((data) => res.send(data));
  }
);

//get request for dummyData
app.get("/dummy_data", (req, res, next) => {
  const convertedData = JSON.stringify(Dummy.variableName);
  res.send(convertedData);
  console.log(Dummy.variableName);
  next();
});

let currentFoodBankAttendanceList = [];

//post request for updated foodbank attendence check sheet
app.post("/foodBank_attendance/check_sheet", (req, res, next) => {
  currentFoodBankAttendanceList = req.body.updatedData;
  res.send(req.body.updatedData);
  console.log(req.body);
  next();
});

//get request sends back the updated attendance check sheet
app.get("/foodBank_attendance/check_sheet", (req, res, next) => {
  res.send(currentFoodBankAttendanceList);
  next();
});

//put request to update an applicant's info
app.put("/applicant/update", (req, res, next) => {
  let updateApplicant = new Promise((resolve, reject) => {
    let currentDb = mysql.createConnection(Db);
    let sql = `UPDATE applicant SET firstName = "${req.body.firstName}", lastName = "${req.body.lastName}", phone = "${req.body.phone}", street = "${req.body.street}", city = "${req.body.city}", state = "${req.body.state}", zip = "${req.body.zip}", children = "${req.body.children}", adults = "${req.body.adults}", seniors = "${req.body.seniors}", totalOccupants = "${req.body.totalOccupants}", weeklyIncome = "${req.body.weeklyIncome}", monthlyIncome = "${req.body.monthlyIncome}", annualIncome = "${req.body.annualIncome}", totalIncome = "${req.body.totalIncome}", dateAltered = "${req.body.dateAltered}"  WHERE ApplicantID = "${req.body.ApplicantID}";`;

    currentDb.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        return reject(err);
      } else {
        console.log(results);
        return resolve(results);
      }
    });
  });

  updateApplicant
    .then((data) => {
      if (data.protocol41 === true) {
        res.send({
          message: `${req.body.firstName} ${req.body.lastName} has been updated`,
        });
      }
    })
    .catch((e) => res.send(sqlError(e)));
});

//Endpoint for removing an applicant from the database.
app.delete("/remove/applicant", (req, res) => {
  let deleteApplicant = new Promise((resolve, reject) => {
    let currentDb = mysql.createConnection(Db);
    let sql = `DELETE FROM applicant WHERE firstName = "${req.body.firstName}" AND lastName = "${req.body.lastName}" AND ApplicantID = "${req.body.ApplicantID}";`;

    currentDb.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(results);
      }
    });
  });

  deleteApplicant
    .then((data) => {
      if (data.protocol41 && data.affectedRows === 1) {
        res.send({
          message: `${req.body.firstName} ${req.body.lastName} has been removed from the database`,
        });
      }
    })
    .catch((e) => res.send(sqlError(e)));
});

//Post request for handling a new foodbank list
app.post("/new_foodbank_list", (req, res, next) => {
  let requiredData = [req.body.title];

  let saveNewTableName = new Promise((resolve, reject) => {
    let currentDb = mysql.createConnection(Db);
    let sql = `INSERT INTO FoodBankList (title) VALUES (?);`;

    currentDb.query(sql, [requiredData], (err, results) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(results);
      }
    });
  });

  let createNewTable = new Promise((resolve, reject) => {
    let currentDb = mysql.createConnection(Db);
    let sql = `CREATE TABLE ${req.body.title} (firstName VARCHAR(20), lastName VARCHAR(20), phone VARCHAR(15), present VARCHAR(10), ApplicantID INT);`;

    currentDb.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(results);
      }
    });
  });

  Promise.all([saveNewTableName, createNewTable])
    .then(() => res.send({ message: "success", title: req.body.title }))
    .catch((e) => {
      res.send(sqlError(e));
      console.log("error", e);
    });
});

//This will be used to return a specific list from the database.
app.get("get-past-list/list-name/:listName/list-id/:listID", (req, res) => {
  let retrieveTable = new Promise((resolve, reject) => {
    let currentDb = mysql.createConnection(Db);
    let sql = `SELECT * FROM ${req.params.listName};`;

    currentDb.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(results);
      }
    });
  });

  retrieveTable.then((data) => {
    res.send(data);
  });
});

//This will create an insert method when a new list is saved.
app.post("/save-list/list-name/:listName", (req, res) => {
  let requestDataValues = [req.body.firstName, req.body.lastName, req.body.phone, "false", req.body.ApplicantID];

  let insertApplicants = new Promise((resolve, reject) => {
    let currentDb = mysql.createConnection(Db);
    let sql = `INSERT INTO ${req.params.listName} (firstName, lastName, phone, present, ApplicantID) VALUES (?);`;

    currentDb.query(sql, [requestDataValues], (err, results) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(results);
      }
    });
  });

  insertApplicants.then((data) => {
    if (data.protocol41 === true) {
      res.send({message: "success"})
    }
  }).catch((e) => {
    res.send(sqlError(e));
    console.log('error', e);
  })
});

app.delete('/remove-attendant/table/:tableName', (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let id = req.body.ApplicantID;
  let table = req.params.tableName;

  let removeAttendant = new Promise((resolve, reject) => {
    let currentDb = mysql.createConnection(Db);
    let sql = `DELETE FROM ${table} WHERE firstName = "${firstName}" AND lastName = "${lastName}" AND ApplicantID = "${id}";`;

    currentDb.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(results);
      }
    });
  });

  removeAttendant
    .then(data => console.log("Success", data))
    .catch(err => console.log('failure', err))
});
