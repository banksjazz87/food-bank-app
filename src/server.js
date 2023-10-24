require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');
var cors = require("cors");
const app = express();
const path = require('node:path');
const port = process.env.PORT || 4600;
const mysql = require("mysql");

const Dummy = require("./variables/dummyData.js");


//Middleware instantiation
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//The static file that will be used on the server
app.use("/", express.static("build"));

//List of all of the react router paths.
const menuPaths = ['/dashboard', '/new_applicant', '/login', '/search', '/current-registered-list', '/foodbank-list-dashboard', '/create-foodbank-list', '/past-registered-list', '/printed-applicant-form'];

//Send the build index.html file back when the user is on a react router path, or refreshes the page.
app.get(menuPaths, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});


//Just a console.log statement to let you know that the server is up and running and the port number.
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});


//This will be used to create a database based on the cookies that are passed.
class Database {
    constructor(host, user, password, database) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
    }

    getDb() {
        let currentDb = {
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        }

        return currentDb;
    }
}


//Error message if something doesn't work in the sql query.
let sqlError = (obj) => {
    return {
        message: `The following error has occurred mySql code: ${obj.code} with sqlMessage: ${obj.sqlMessage}`,
    };
};

//Post request for the login.
app.post("/login-attempt", (req, res, next) => {
    if (
        req.body.currentUser === process.env.CHAPEL_USER &&
        req.body.currentPassword === process.env.CHAPEL_PASSWORD
    ) {

        let Db = new Database(process.env.CLEARDB_HOST, process.env.CLEARDB_USERNAME, process.env.CLEARDB_PASSWORD, process.env.CLEARDB_DATABASE);
        let selectedDb = mysql.createConnection(Db.getDb());

        selectedDb.connect((err) => {
            err ? console.log(err) : console.log("you are connected to the database");
        });

        res.cookie('account', 'Demo');
        res.cookie('host', process.env.CLEARDB_HOST, { httpOnly: true, sameSite: 'lax' });
        res.cookie('user', process.env.CLEARDB_USERNAME, { httpOnly: true, sameSite: 'lax' });
        res.cookie('database', process.env.CLEARDB_DATABASE, { httpOnly: true, sameSite: 'lax' });
        res.cookie('password', process.env.CLEARDB_PASSWORD, { httpOnly: true, sameSite: 'lax' });
        res.cookie('loggedIn', true);

        res.send({ message: "valid" });
        selectedDb.end((err) => err ? console.log(err) : console.log('end'));

    } else if (
        req.body.currentUser === process.env.DEMO_USER &&
        req.body.currentPassword === process.env.DEMO_PASSWORD
    ) {

        let Db = new Database(process.env.CRIMSON_HOST, process.env.CRIMSON_USERNAME, process.env.CRIMSON_PASSWORD, process.env.CRIMSON_DATABASE);
        let selectedDb = mysql.createConnection(Db.getDb());

        selectedDb.connect((err) => {
            err ? console.log(err) : console.log("you are connected to the database");
        });

        res.cookie('account', 'Demonstrator');
        res.cookie('host', process.env.CRIMSON_HOST, { httpOnly: true, sameSite: 'lax' });
        res.cookie('user', process.env.CRIMSON_USERNAME, { httpOnly: true, sameSite: 'lax' });
        res.cookie('database', process.env.CRIMSON_DATABASE, { httpOnly: true, sameSite: 'lax' });
        res.cookie('password', process.env.CRIMSON_PASSWORD, { httpOnly: true, sameSite: 'lax' });
        res.cookie('loggedIn', true);

        res.send({ message: "valid" });
        selectedDb.end((err) => err ? console.log(err) : console.log('end'));

    } else if (
        req.body.currentUser === process.env.TESTING_USER &&
        req.body.currentPassword === process.env.TESTING_PASSWORD) {

        let Db = new Database('localhost', 'tester', process.env.TESTING_PASSWORD, process.env.TESTING_DATABASE);
        let selectedDb = mysql.createConnection(Db.getDb());

        selectedDb.connect((err) => {
            err ? console.log(err) : console.log('you are connected to the testing database');
        });

        res.cookie('account', 'Tester');
        res.cookie('host', 'localhost', { httpOnly: true, sameSite: 'lax' });
        res.cookie('user', 'root', { httpOnly: true, sameSite: 'lax' });
        res.cookie('password', process.env.MYSQL_PASSWORD, { httpOnly: true, sameSite: 'lax' });
        res.cookie('database', process.env.TESTING_DATABASE, { httpOnly: true, sameSite: 'lax' });
        res.cookie('loggedIn', true)

        res.send({ message: "valid" });

        selectedDb.end((err) => err ? console.log(err) : console.log('end'));

    } else {
        res.send({ message: "invalid" });
        console.log({ message: "invalid" });
    }
    next();
});


//return all applicants from the selected database from the login.
app.get("/all-applicants", (req, res, next) => {

    let allApplicants = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = "SELECT * FROM applicant ORDER BY lastName";

        currentDb.query(sql, (error, results) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('ended'));
    });

    console.log(req.cookies.database);
    allApplicants.then((data) => res.send(data))
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

    function targetIncome(occupants) {
        if (occupants === 1) {
            return 25142;
        } else {
            let income = 25142 + (occupants - 1) * 8732;
            return income;
        }
    }

    if (req.body.totalIncome <= targetIncome(req.body.totalOccupants)) {

        let createApplicant = new Promise((resolve, reject) => {
            let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
            let currentDb = mysql.createConnection(Db.getDb());
            let sql = `INSERT INTO applicant (firstName, lastName, phone, street, city, state, zip, children, adults, seniors, totalOccupants, weeklyIncome, monthlyIncome, annualIncome, totalIncome, dateAltered) VALUES (?)`;

            currentDb.query(sql, [requiredData], (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(results);
                }
            });
            currentDb.end((err) => err ? console.log(err) : console.log('end'));
        });

        createApplicant.then((data) => {
                console.log(data);
                res.send({
                    status: "okay",
                    message: `This applicant qualifies for assistance and ${req.body.firstName} ${req.body.lastName} has been entered into the database.`,
                    id: `${data.insertId}`,
                });
            })
            .catch((e) => {
                console.log("error", e);
                res.send({
                    status: "not good",
                    message: `The following error has occurred mySql code: ${e.code} with sqlMessage: ${e.sqlMessage}`,
                });
            });
    } else {
        res.send({
            status: "not good",
            message: `The applicant's target income ($${req.body.totalIncome
				}) is more than the qualifying income ($${targetIncome(
					req.body.totalOccupants
				)}.00)`,
        });
    }
});

//The get method used to return the data about one applicant.
app.get(
    "/single-applicant/first/:firstName/last/:lastName/id/:ApplicantID",
    (req, res) => {
        let findApplicant = new Promise((resolve, reject) => {
            let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
            let currentDb = mysql.createConnection(Db.getDb());
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
            currentDb.end((err) => err ? console.log(err) : console.log('end'));
        });

        findApplicant.then((data) => res.send(data));
    }
);


//This will be used to check if a user is already in the database.
app.get('/single-applicant-check/first/:firstName/last/:lastName', (req, res) => {

    let checkApplicant = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `SELECT * FROM applicant WHERE firstName = "${req.params.firstName}" AND lastName = "${req.params.lastName}";`;

        currentDb.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return reject(err);
            } else {
                console.log(results);
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });

    checkApplicant.then((data) => {
        res.send(data);
        console.log(data);
    });
});


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
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `UPDATE applicant SET firstName = NULLIF("${req.body.firstName}", "null"), lastName = NULLIF("${req.body.lastName}", "null"), phone = NULLIF("${req.body.phone}", "null"), street = NULLIF("${req.body.street}", "null"), city = NULLIF("${req.body.city}", "null"), state = NULLIF("${req.body.state}", "null"), zip = NULLIF("${req.body.zip}", "null"), children = NULLIF("${req.body.children}", "null"), adults = NULLIF("${req.body.adults}", "null"), seniors = NULLIF("${req.body.seniors}", "null"), totalOccupants = NULLIF("${req.body.totalOccupants}", "null"), weeklyIncome = NULLIF("${req.body.weeklyIncome}", "null"), monthlyIncome = NULLIF("${req.body.monthlyIncome}", "null"), annualIncome = NULLIF("${req.body.annualIncome}", "null"), totalIncome = NULLIF("${req.body.totalIncome}", "null"), dateAltered = "${req.body.dateAltered}"  WHERE ApplicantID = "${req.body.ApplicantID}";`;

        currentDb.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return reject(err);
            } else {
                console.log(results);
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });

    updateApplicant
        .then((data) => {
            if (data.protocol41 === true) {
                res.send({
                    message: `Success ${req.body.firstName} ${req.body.lastName} has been updated`,
                });
            }
        })
        .catch((e) => res.send(sqlError(e)));
});

//Endpoint for removing an applicant from the database.
app.delete("/remove/applicant", (req, res) => {
    let deleteApplicant = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `DELETE FROM applicant WHERE firstName = "${req.body.firstName}" AND lastName = "${req.body.lastName}" AND ApplicantID = "${req.body.ApplicantID}";`;

        currentDb.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
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
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `INSERT INTO FoodBankList (title) VALUES (?);`;

        currentDb.query(sql, [requiredData], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });

    let createNewTable = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `CREATE TABLE ${req.body.title} (firstName VARCHAR(20), lastName VARCHAR(20), phone VARCHAR(15), present VARCHAR(10), checkedIn TINYINT DEFAULT 0, checkedInNum SMALLINT DEFAULT 0, ApplicantID INT);`;

        currentDb.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });

    Promise.all([saveNewTableName, createNewTable])
        .then(() => res.send({ message: "success", title: req.body.title }))
        .catch((e) => {
            res.send(sqlError(e));
            console.log("error", e);
        });
});

//This will create an insert method for a new attendant for the list.
app.post("/save-list/list-name/:listName", (req, res) => {
    let requestDataValues = [
        req.body.firstName,
        req.body.lastName,
        req.body.phone,
        "false",
        req.body.ApplicantID,
    ];

    let insertApplicants = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `INSERT INTO ${req.params.listName} (firstName, lastName, phone, present, ApplicantID) VALUES (?);`;

        currentDb.query(sql, [requestDataValues], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });

    insertApplicants
        .then((data) => {
            if (data.protocol41 === true) {
                res.send({ message: "success" });
                console.log("Success", data);
            }
        })
        .catch((e) => {
            res.send(sqlError(e));
            console.log("error", e);
        });
});

//Method used to remove an attendant from a foodbank list.
app.delete("/remove-attendant/table/:tableName", (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let id = req.body.ApplicantID;
    let table = req.params.tableName;

    let removeAttendant = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `DELETE FROM ${table} WHERE firstName = "${firstName}" AND lastName = "${lastName}" AND ApplicantID = "${id}";`;

        currentDb.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });

    removeAttendant
        .then((data) => console.log("Success", data))
        .catch((err) => console.log("failure", err));
});

//This will be used to return all tables from the database.
app.get("/all/food-bank-lists", (req, res) => {
    let retrieveAllLists = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `SELECT * FROM FoodBankList`;

        currentDb.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });

    retrieveAllLists
        .then((data) => {
            console.log("success");
            res.send({ message: "success", allData: data });
        })
        .catch((err) => {
            console.log("error", err);
            res.send(sqlError(err));
        });
});

//This will be used to return a specific list from the database.
app.get("/get-past-list/list-name/:listName/", (req, res) => {
    let retrieveTable = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `SELECT * FROM ${req.params.listName};`;

        currentDb.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });

    retrieveTable
        .then((data) => {
            res.send({ message: "Success", allData: data });
            console.log("success", data);
        })
        .catch((e) => {
            res.send(sqlError(e));
            console.log("error", e);
        });
});

//This will be used to return a list and all of the data for each applicant in the foodbank list.
app.get("/get-past-list/list-name/:listName/get-all", (req, res) => {
    let retrieveTable = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `SELECT * FROM ${req.params.listName} LEFT JOIN applicant ON applicant.ApplicantID = ${req.params.listName}.ApplicantID ORDER BY ${req.params.listName}.lastName;`;

        currentDb.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });

    retrieveTable
        .then((data) => {
            res.send({ message: "Success", allData: data })
        })
        .catch((e) => {
            res.send(sqlError(e));
            console.log("error", e)
        });
});

//this function will be used to delete a list from the database and it also removes the list from the table that holds all of the list names.
app.delete("/delete-list/", (req, res) => {
    let removeFromList = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `DELETE FROM FoodBankList WHERE Table_ID = ${req.body.Table_ID} AND title = "${req.body.title}";`;

        currentDb.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });

    let removeTable = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `DROP TABLE ${req.body.title};`;

        currentDb.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });

    Promise.all([removeFromList, removeTable])
        .then((data) => {
            res.send({
                message: `${req.body.title} has been successfully removed from the database`,
            });
        })
        .catch((e) => {
            res.send(sqlError(e));
        });
});

//Retrieve the most recent food bank list title.
app.get("/most-recent-fb-list", (req, res) => {
    let getFoodBankLists = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = "SELECT * FROM FoodBankList ORDER BY DateCreated DESC";

        currentDb.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });

    getFoodBankLists
        .then((data) => {
            res.send({ message: "success", allData: data[0] });
            console.log("Success in getting data");
        })
        .catch((error) => {
            res.send(sqlError(error));
            console.log("Failure in getting data");
        });
});

//This is going to be the api endpoint used to update an attendant's status of being present or not present.
app.put("/update-attendant-status", (req, res) => {
    let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
    let currentDb = mysql.createConnection(Db.getDb());
    let sql = `UPDATE ${req.body.title} SET present = "${req.body.present}" WHERE firstName = "${req.body.firstName}" AND lastName = "${req.body.lastName}" AND ApplicantID = "${req.body.ApplicantID}";`;

    let updateAttendantPresent = new Promise((resolve, reject) => {
        currentDb.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });

    updateAttendantPresent
        .then((data) => {
            res.send({
                status: "success",
                message: `${req.body.firstName} ${req.body.lastName
					} is ${req.body.present === "true" ? "PRESENT" : "NOT PRESENT"
					}.`,
            });
        })
        .catch((err) => {
            res.send(sqlError(err));
            console.log("Error!", err);
        });
});

//This will be used to check an applicant in upon arrival.
app.put("/check-attendant-in", (req, res) => {
    let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
    let currentDb = mysql.createConnection(Db.getDb());
    let sql = `UPDATE ${req.body.title} SET checkedIn = "${req.body.checkedIn}",  WHERE firstName = "${req.body.firstName}" AND lastName = "${req.body.lastName}" AND ApplicantID = "${req.body.ApplicantID}";`;

    let updateAttendantCheckedIn = new Promise((resolve, reject) => {
        currentDb.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });

    updateAttendantCheckedIn
        .then((data) => {
            res.send({
                status: "success",
                message: `${req.body.firstName} ${req.body.lastName
					} is ${req.body.checkedIn === 1 ? "Checked In" : "NOT Checked In"
					}.`,
            });
        })
        .catch((err) => {
            res.send(sqlError(err));
            console.log("Error!", err);
        });
});

//This is going to be a get request that will return the current status of an applicant on the current list
app.get(
    "/applicant-present-status/:tableName/:firstName/:lastName/:ApplicantID",
    (req, res) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `SELECT * FROM ${req.params.tableName} WHERE firstName = "${req.params.firstName}" AND lastName = "${req.params.lastName}" AND ApplicantID = "${req.params.ApplicantID}";`;

        let findApplicantPresentStatus = new Promise((resolve, reject) => {
            currentDb.query(sql, (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(results);
                }
            });
            currentDb.end((err) => err ? console.log(err) : console.log('end'));
        });

        findApplicantPresentStatus
            .then((data) => {
                res.send({ status: "Success", allData: data[0] });
                console.log("Success!!!!", data);
            })
            .catch((err) => {
                res.send({ status: "Failure", allData: err });
                console.log("Failure", err);
            });
    }
);

//Retrieve all applicants who have incomplete application forms
app.get("/all-applicants/partial-forms", (req, res) => {
    let getPartialForms = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql =
            "SELECT * FROM applicant WHERE firstName IS NULL OR lastName IS NULL OR phone IS NULL OR street IS NULL OR city IS NULL OR state is NULL OR zip IS NULL OR children IS NULL OR  adults IS NULL OR seniors IS NULL OR totalOccupants IS NULL OR weeklyIncome IS NULL OR monthlyIncome IS NULL OR annualIncome IS NULL OR totalIncome IS NULL;";

        currentDb.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });

    getPartialForms.then((data) => res.send(data)).catch((err) => res.send(err));
});

//Retrieve all of seniors.
app.get("/dashboard-statistics/:table", (req, res) => {
    let retrieveAll = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `SELECT SUM(children) AS totalChildren, SUM(adults) AS totalAdults, SUM(seniors) AS totalSeniors, SUM(totalOccupants) AS totalPeople, COUNT(*) AS totalFamilies FROM ${req.params.table} LEFT JOIN applicant ON ${req.params.table}.ApplicantID = applicant.ApplicantID WHERE present = "true";`;

        currentDb.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });

    retrieveAll
        .then((data) => {
            res.send({
                message: "success",
                allData: data[0],
            });
        })
        .catch((err) => res.send(sqlError(err)));
});

//This query will be used to return all families who have registered this month.
app.get("/dashboard-statistics-unique/:table", (req, res) => {
    let retrieveUnique = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `SELECT SUM(children) AS totalChildren, SUM(adults) AS totalAdults, SUM(seniors) AS totalSeniors, SUM(totalOccupants) AS totalPeople, COUNT(*) AS totalFamilies FROM ${req.params.table} LEFT JOIN applicant ON ${req.params.table}.ApplicantID = applicant.ApplicantID WHERE present = "true" AND MONTH(OriginalInsertion) = MONTH(SYSDATE()) AND YEAR(OriginalInsertion) = YEAR(SYSDATE());`;

        currentDb.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });
    retrieveUnique
        .then((data) => {
            res.send({
                message: "success",
                allData: data[0],
            });
        })
        .catch((err) => res.send(sqlError(err)));
});


//This query will be used to find an applicant by applicant ID in the current foodbank list.
app.get('/find-user/table/:table/applicant/:id', (req, res) => {
    let retrieveApplicant = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `SELECT * FROM ${req.params.table} WHERE ApplicantID = "${req.params.id}";`;

        currentDb.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });

    retrieveApplicant.then((data) => {
        res.send(data)
        console.log(data);
    }).catch(err => console.log(err));
})


//Used to update an applicant's information only in the current foodbank list.
app.put('/update-applicant/current-list', (req, res) => {
    let updateTableApplicant = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `UPDATE ${req.body.tableName} SET firstName = "${req.body.firstName}", lastName = "${req.body.lastName}", phone = NULLIF("${req.body.phone}", "null") WHERE ApplicantID = "${req.body.ApplicantID}";`;

        currentDb.query(sql, (err, results) => {
            if (err) {
                console.log('ERRROR', err);
                return reject(err);
            } else {
                console.log(results);
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });


    let updateApplicant = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `UPDATE applicant SET firstName = NULLIF("${req.body.firstName}", "null"), lastName = NULLIF("${req.body.lastName}", "null"), phone = NULLIF("${req.body.phone}", "null"), street = NULLIF("${req.body.street}", "null"), city = NULLIF("${req.body.city}", "null"), state = NULLIF("${req.body.state}", "null"), zip = NULLIF("${req.body.zip}", "null"), children = NULLIF("${req.body.children}", "null"), adults = NULLIF("${req.body.adults}", "null"), seniors = NULLIF("${req.body.seniors}", "null"), totalOccupants = NULLIF("${req.body.totalOccupants}", "null"), weeklyIncome = NULLIF("${req.body.weeklyIncome}", "null"), monthlyIncome = NULLIF("${req.body.monthlyIncome}", "null"), annualIncome = NULLIF("${req.body.annualIncome}", "null"), totalIncome = NULLIF("${req.body.totalIncome}", "null"), dateAltered = "${req.body.dateAltered}"  WHERE ApplicantID = "${req.body.ApplicantID}";`;

        currentDb.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return reject(err);
            } else {
                console.log(results);
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });


    Promise.all([updateTableApplicant, updateApplicant])
        .then((data) => res.send({ message: "Success", allData: data }))
        .catch(err => res.send(sqlError(err)));

});

//This will be an endpoint used to retrieve the city and zipcode pairs.
app.get('/get-city-zip', (req, res) => {
    let getCityZip = new Promise((resolve, reject) => {
        let Db = new Database(req.cookies.host, req.cookies.user, req.cookies.password, req.cookies.database);
        let currentDb = mysql.createConnection(Db.getDb());
        let sql = `SELECT DISTINCT zip, city FROM applicant;`;

        currentDb.query(sql, (err, results) => {
            if (err) {
                console.log('ERRROR', err);
                return reject(err);
            } else {
                console.log(results);
                return resolve(results);
            }
        });
        currentDb.end((err) => err ? console.log(err) : console.log('end'));
    });

    getCityZip.then((data) => {
        console.log(data);
        res.send(data)
    }).catch((err) => console.log(err));
});