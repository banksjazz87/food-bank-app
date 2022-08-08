require('dotenv').config()
const express = require('express');
var cors = require('cors');
const app = express();
const port = 4000;

//Middleware instatiation
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//The static file that will be used on the server
app.use('/', express.static("build"));

//Just a console.log statement to let you know that the server is up and running and the port number.
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);

})

//Chapel user credentials
const Chapel = {
    user: process.env.CHAPEL_USER,
    password: process.env.CHAPEL_PASSWORD
}

//Tester credentials
const Tester = {
    user: process.env.TESTING_USER,
    password: process.env.TESTING_PASSWORD
}
//post request for the login
app.post('/login_attempt', (req, res, next) => {
    if (req.body.currentUser === Chapel.user && req.body.currentPassword === Chapel.password) {
        res.send({"message": 'Welcome Chapel'});
        
    } else if (req.body.currentUser === Tester.user && req.body.currentPassword === Tester.password) {
        res.send({"message": 'Welcome Tester'});
    } else {
        res.send({"message": "invalid credentials"});
    }
})
