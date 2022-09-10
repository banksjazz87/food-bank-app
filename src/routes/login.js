require("dotenv").config();
const mysql = require("mysql");

exports.Db = {};

exports.loginAttempt = (req, res, next) => {
  if (
    req.body.currentUser === process.env.CHAPEL_USER &&
    req.body.currentPassword === process.env.CHAPEL_PASSWORD
  ) {
     let Db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: process.env.MYSQL_PASSWORD,
      database: process.env.TESTING_DATABASE,
    });

    Db.connect((err) => {
      if (err) {
        throw err;
      } else {
        console.log("You have successfully connected to the database.");
      }
    });

    res.send({ message: "valid" });
    console.log({ message: "valid", database: Db });
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
};
