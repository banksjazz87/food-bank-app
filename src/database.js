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

    //Creates a connection to the mysql database
    connection: mysql.createConnection({
      host: "localhost",
      user: "root",
      password: process.env.MYSQL_PASSWORD,
      database: process.env.TESTING_DATABASE 
    }), 

    //Creates a connnection to the database, and returns all fo the applicants.
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
  },
 
  /**
   * 
   * @param {*} table 
   * @param {*} field 
   * @param {*} input 
   * @returns all data that is found in the database relating to the search criteria.
   * @example findApplicant(applicant, firstName, Chris)  will return all data found in the applicant table, where the first name = Chris.
   */
  findApplicant: function(table,field, input) {
    Database.connection.connect(function(err) {
      if (err) {
        throw err;
      } else {
        console.log("Connected!");
        let sql = `SELECT * FROM ${table} WHERE ${field} = "${input}"`;
        Database.connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Searched Item = ", result);
          return result;
        })
      }
    })
  }

  }

  module.exports.variableName = Database;