const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Transaction = require('./models/transaction');

const app = express();

mongoose.connect('mongodb+srv://@trackr-wve5i.mongodb.net/node-angular?retryWrites=true&w=majority')
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
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/api/transactions', (req,res,next) => {
  const transaction = new Transaction({
    type: req.body.type,
    amount: req.body.amount
  });

  transaction.save().then(createdTransaction => {
    res.status(201).json({
      message: 'Trasaction added successfully',
      transactionId: createdTransaction.id
    });
  });
});

app.get('/api/transactions', (req,res,next) => {

  Transaction.find().then(documents => {
    res.status(200).json({
      message: "this is a message",
      transactions: documents
    });
  });
});

app.delete('/api/transactions/:id', (req,res,next) => {
  Transaction.deleteOne({_id: req.params.id}).then(result => {
    console.log(req.params.id);
    res.status(200).json({ message: "Transaction deleted!" });
  });
});

module.exports = app;
