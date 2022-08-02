const express = require('express');
var cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static("build"));

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);

})