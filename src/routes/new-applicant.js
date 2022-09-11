require("dotenv").config();
const mysql = require("mysql");



/*exports.createNewApplicant = (req, res, next) => {


    let checkForApplicant = new Promise((reject, resolve) => {
        const Db = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: process.env.MYSQL_PASSWORD,
            database: process.env.TESTING_DATABASE, 
        });

        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        let sql = `SELECT * FROM applicant WHERE firstName = "${firstName}" AND lastName = "${lastName}";`;

        Db.query(sql, (error, results) => {
            if (error) {
                return reject(error);
            } else {
                
            }
        });
    });

    if (req.body.annualIncome >= 200000) {

        return res.send({message: "Applicant does not qualify"});
    
    } else {

    }
     

        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        //const requiredData = [req.body.firstName, req.body.lastName, req.body.phone, req.body.street, req.body.city, req.body.state, req.body.zip, req.body.children, req.body.adults, req.body.seniors, req.body.totalOccupants, req.body.weeklyIncome, req.body.monthlyIncome, req.body.annualIncome, req.body.totalIncome, req.body.dateAltered];
    })
}*/