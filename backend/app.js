const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const transactionsRoutes = require('./routes/transactions');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://abhay:' + process.env.MONGO_ATLAS_PW + '@trackr-wve5i.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'angular')));

// for bypassing CORS

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('/api/transactions', transactionsRoutes);
app.use('/api/user', userRoutes);
app.use((req,res,next) => {
  res.sendFile(path.join(__dirname, 'angular','index.html'));
});

module.exports = app;
