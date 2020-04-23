const express = require('express');
const app = express();

const router = require('./lib/routes/router');
app.use(router);



module.exports = app;
