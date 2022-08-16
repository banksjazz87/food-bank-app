require("dotenv").config();
const mysql = require('mysql');

//Connect to the database 
const testConnection = mysql.createConnection({
    host: "localhost", 
    user: "chris",
    password: "jazz123"
  });
  
  testConnection.connect((error) => {
    if (error) {
      throw error;
    } else {
      console.log("Connected");
    }
  });

  testConnection.connect(function(err) {
    if (err) {
      throw err;
    } else {
    console.log("Connected!");
    testConnection.query("CREATE DATABASE mydb", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  }
  });