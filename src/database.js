require("dotenv").config();
const mysql = require('mysql');

/*
//Connect to the database 
var con= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "jazz123456",
    database: "testingFoodBank" 
  });
  
  con.connect(function(err) {
    if (err) {
      throw err;
    } else {
    console.log("Connected!");
    let sql = "SELECT * FROM applicant";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Current Applicants", result);
    });
  }
  });*/

  const Database = {
    connection: mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "jazz123456",
      database: "testingFoodBank" 
    }), 

    allApplicants: function() {
      Database.connection.connect(function(err) {
      if (err) {
        throw err;
      } else {
        console.log("Connected!");
        let sql = "SELECT * FROM applicant";
        Database.connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Current Applicants", result);
        })
      }
    })
  }

  }

  module.exports.variableName = Database;