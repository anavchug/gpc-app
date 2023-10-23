const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
var applicationRouter = require('./routes/application');
var publicRouter = require('./routes/public');

const app = express();

app.use(express.json());
app.use('/', publicRouter);
app.use(express.static('public'));
// app.use('/', applicationRouter);
app.use(cors()); // Enable CORS

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
