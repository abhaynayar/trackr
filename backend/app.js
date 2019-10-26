const express = require('express');

const app = express();

app.use('/api/transactions',(req,res,next) => {
  const transactions =
  res.json();
});

module.exports = app;
