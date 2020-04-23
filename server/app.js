const express = require('express');
const app = express();

// const cors = require('cors');
// app.use(cors);

const router = require('./lib/routes/router');
app.use(router);



module.exports = app;
