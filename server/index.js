const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const patientData = require('./routes/api/patientData');

app.use('/api/patientData', patientData);

const port = 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));