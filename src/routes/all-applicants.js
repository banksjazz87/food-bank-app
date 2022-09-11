require("dotenv").config();
const mysql = require("mysql");


exports.findAll = (req, res, next) => {
    let getData = new Promise((resolve, reject) => {
        const Db = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: process.env.MYSQL_PASSWORD,
            database: process.env.TESTING_DATABASE, 
        });
      

        let sql = "SELECT * FROM applicant";
        Db.query(sql, (error, results) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(results);
            }
        });
    });
    getData.then(data => res.send(data));
}