require("dotenv").config();
const mysql = require('mysql');

exports.loginAttempt =  (req, res, next) => {
  if (
    req.body.currentUser === process.env.CHAPEL_USER &&
    req.body.currentPassword === process.env.CHAPEL_PASSWORD
  ) {
    
    const Db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: process.env.MYSQL_PASSWORD,
        database: process.env.TESTING_DATABASE, 
    });
  

    Db.connect((err) => {
        err ? console.log(err) : console.log('you are connected to the database');
    })
    
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
};

