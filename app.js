const express = require('express');
const fetch = require('node-fetch');
const app = express();
const cors = require('cors');

app.use(express.json());
var publicRouter = require('./routes/public');
app.use('/', publicRouter);
app.use(cors()); // Enable CORS

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
