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
  },

  /**
   * 
   * @param {*} table 
   * @param  {...any} args 
   * @returns adds a new applicant to the applicant table, all fields must be present. 
   */
  addApplicant: function(...args) {
    Database.connection.connect(function(err) {
      if (err) {
        throw err;
      } else {
        console.log("Connected!");

        let sql = `INSERT INTO applicant (firstName, lastName, phone, street, city, state, zip, children, adults, seniors, totalOccupants, weeklyIncome, monthlyIncome, annualIncome, totalIncome) VALUES ?`;
      
        Database.connection.query(sql, [args], function(err, result) {
          if (err) throw err;
          console.log("This item has been added", result);
          return result;
        })
      }
    })
  },

  //add method to update 
  updateApplicant: function(object, id) {
    Database.connection.connect(function(err) { 
      if (err) {
        throw err;
      } else {
        console.log('Connected!');
        let sql = `UPDATE applicant SET ? WHERE ApplicantId = "${id}" `;
        const arrayOfKeys = Object.keys(object);
        const arrayOfValues = Object.values(object);
        let updates = [
          `firstName = "${arrayOfValues[arrayOfKeys.indexOf('firstName')]}"`, 
          /*`lastName = "${object.lastName}"`, 
          `phone = "${object.phone}"`, 
          `street = "${object.street}"`,
          `city = "${object.city}"`, 
          `state = "${object.state}"`, 
          `zip = "${object.zip}"`, 
          `children = "${object.children}`, 
          `adults = "${object.adults}"`, 
          `seniors = "${object.seniors}"`, 
          `totalOccupants = "${object.totalOccupants}"`, 
          `weeklyIncome = "${object.weeklyIncome}"`, 
          `monthlyIncome = "${object.monthlyIncome}"`, 
          `annualIncome = "${object.annualIncome}"`, 
          `totalIncome= "${object.totalIncome}"`*/
        ];

        Database.connection.query(sql, [updates], function(err, result) {
          if (err) throw err;
          console.log("This item has been updated", result);
          return result;
        })
      }
    })
  }
  //add method to delete

  }

  module.exports.variableName = Database;