const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const transactionsRoutes = require('./routes/transactions');

const app = express();

mongoose.connect('mongodb+srv://trackr-wve5i.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// for bypassing CORS

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api/transactions', transactionsRoutes);

module.exports = app;
