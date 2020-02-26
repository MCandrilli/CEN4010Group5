const dotenv = require('./env');
const db = require('./db')
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const { apiRouter } = require('./routes');

const PORT = 5000;
const app = express();

app.use(bodyparser.json());
app.use(cors());

app.use('/', apiRouter);

app.listen(PORT, () => {
  console.log('server running');
})