const express = require('express');

const Transaction = require('../models/transaction');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();


router.post('', checkAuth, (req,res,next) => {
  const transaction = new Transaction({
    _id: req.body.id,
    type: req.body.type,
    amount: req.body.amount,
    creator: req.userData.userId
  });
  transaction.save().then(createdTransaction => {
    res.status(201).json({
      message: 'Trasaction added successfully',
      transactionId: createdTransaction.id
    });
  });
});

router.put('/:id', checkAuth, (req,res,next) => {
  const transaction = new Transaction({
    _id: req.body.id,
    type: req.body.type,
    amount: req.body.amount,
    creator: req.userData.userId
  });
  Transaction.updateOne({ _id: req.params.id, creator: req.userData.userId }, transaction)
  .then(result => {
    if(result.nModified > 0) {
      res.status(200).json({ message: 'Update successful!' });
    } else {
      res.status(401).json({ message: 'Not Authorized!' });
    }
  });
});

router.get('', checkAuth, (req,res,next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = req.query.page;
  const transactionQuery = Transaction.find({creator: req.userData.userId});

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

router.get("/:id", checkAuth, (req,res,next) => {
  Transaction.findById(req.params.id).then(transaction => {
    if(transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ message: 'Transaction not found!' });
    }
  })
})

router.delete('/:id', checkAuth, (req,res,next) => {
  Transaction.deleteOne({ _id: req.params.id, creator: req.userData.userId })
  .then(result => {
    if(result.n > 0) {
      res.status(200).json({ message: 'Delete successful!' });
    } else {
      res.status(401).json({ message: 'Not Authorized!' });
    }
  });
});

module.exports = router;
