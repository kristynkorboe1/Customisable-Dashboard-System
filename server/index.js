const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Middleware
app.use(bodyParser.json());

const patientData = require('./routes/api/patientData');

app.use('/api/patientData', patientData);


//Listen to the server
const port = 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));