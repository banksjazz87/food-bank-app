require("dotenv").config();
const mysql = require("mysql");


module.exports = class Database {

  constructor(dbName) {
    this.db = dbName;
  }


  //The database object
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: this.db,
  });


 //Connects to the database
  connectToDatabase () {
    this.connection.connect(function (err) {
      if (err) {
        throw err;
      } else {
        console.log("You have successfully connected to the database");
      }
    });
  }
}

  //Return all Applicants
 /* allApplicants() {
    
    let sql = "SELECT * FROM applicant";

    this.connection.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        return reject(err);
      } else {
        console.log(results);
        return resolve(results);
      }
    });



}
}*/


  /**
   *
   * @param {*} table
   * @param {*} first
   * @param {*} last
   * @returns all data that is found in the database relating to the search criteria.
   * @example findApplicant(applicant, Chris, Banks)  will return all data found in the applicant table, where the first name = Chris.
   */
  /*findApplicant(table, first, last) {
    new Promise((resolve, reject) => {
      let sql = `SELECT * FROM ${table} WHERE firstName = "${first}" AND lastName = "${last}";`;

      this.connection.query(sql, function (err, result) {
        if (err) {
          return reject({message: "failure", error: err});
        } else {
          return resolve({message: "succes", data: result});
        }
      });
    })
}
}

  /**
   *
   * @param {*} table
   * @param  {...any} args
   * @returns adds a new applicant to the applicant table, all fields must be present.
   */
  /*addApplicant: function (...args) {
    let sql = `INSERT INTO applicant (firstName, lastName, phone, street, city, state, zip, children, adults, seniors, totalOccupants, weeklyIncome, monthlyIncome, annualIncome, totalIncome, dateAltered) VALUES ?`;

    Database.connection.query(sql, [args], function (err, result) {
      if (err) {
        //throw err;
        return "error: " + err;
      } else {
        return "success"
      }
      //console.log("This item has been added", result);
      //return "success";
    });
  },

  //add method to update
  /**
   *
   * @param {*} obj
   * @param {*} key
   * @returns updates an applicant's data based on the currently selected applicant's key.  Takes on the key and the newly updated object that reflects the applicant's data.
   * @example UPDATE applicant (table) SET key = Object.values(obj) ... WHERE ApplicantID = key.
   */
 /* updateApplicant: function (obj, key) {
    let sql = `UPDATE applicant SET firstName = "${obj.firstName}", lastName = "${obj.lastName}", phone = "${obj.phone}", street = "${obj.street}", city = "${obj.city}", state = "${obj.state}", zip = "${obj.zip}", children = "${obj.children}", adults = "${obj.adults}", seniors = "${obj.seniors}", totalOccupants = "${obj.totalOccupants}", weeklyIncome = "${obj.weeklyIncome}", monthlyIncome = "${obj.monthlyIncome}", annualIncome = "${obj.annualIncome}", totalIncome = "${obj.totalIncome}"  WHERE ApplicantID = "${key}";`;

    Database.connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("This item has been updated", result);
      return result;
    });
  },

  /**
   *
   * @param {*} table
   * @param {*} first
   * @param {*} last
   * @param {*} key
   * @returns deletes an applicant from the specified table with a matching first name, last name, and applicant ID.
   */
  /*deleteApplicant: function (table, first, last, key) {
    let sql = `DELETE FROM ${table} WHERE firstName = "${first}" AND lastName = "${last}" AND ApplicantID = "${key}";`;

    Database.connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Item has been deleted", result);
    });
  },

};
*/



