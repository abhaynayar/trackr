const express = require('express');
const Transaction = require('../models/transaction');

const router = express.Router();


router.post('', (req,res,next) => {
  const transaction = new Transaction({
    _id: req.body.id,
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

router.put('/:id',(req,res,next) => {
  const transaction = new Transaction({
    _id: req.body.id,
    type: req.body.type,
    amount: req.body.amount
  });
  Transaction.updateOne({_id: req.params.id}, transaction).then(result => {
    res.status(200).json({message: 'Update successful!'});
  });
});

router.get('', (req,res,next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = req.query.page;
  const transactionQuery = Transaction.find();

  let fetchedTransactions;

  if(pageSize && currentPage) {
    transactionQuery
      .skip(pageSize*(currentPage-1))
      .limit(pageSize);
  }

  transactionQuery.then(documents => {
    fetchedTransactions = documents;
    return Transaction.count();
  }).then(count => {
      res.status(200).json({
      message: "Transactions fetched succesfully!",
      transactions: fetchedTransactions,
      maxTransactions: count
    })
  });
});

router.get("/:id", (req,res,next)=> {
  Transaction.findById(req.params.id).then(transaction => {
    if(transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({message: 'Transaction not found!'});
    }
  })
})

router.delete('/:id', (req,res,next) => {
  Transaction.deleteOne({_id: req.params.id}).then(result => {
    console.log(req.params.id);
    res.status(200).json({ message: "Transaction deleted!" });
  });
});

module.exports = router;
