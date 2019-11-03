const express = require('express');

const Transaction = require('../models/transaction');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();


router.post('', checkAuth, (req,res,next) => {
  const transaction = new Transaction({
    _id: req.body.id,
    date: req.body.date,
    type: req.body.type,
    amount: req.body.amount,
    remark: req.body.remark,
    creator: req.userData.userId
  });
  transaction.save().then(createdTransaction => {
    res.status(201).json({
      message: 'Trasaction added successfully',
      transactionId: createdTransaction.id
    });
  }).catch(error => {
    res.status(500).json({
      message: 'Creating a transaction failed!'
    });
  });
});

router.put('/:id', checkAuth, (req,res,next) => {
  const transaction = new Transaction({
    _id: req.body.id,
    date: req.body.date,
    type: req.body.type,
    amount: req.body.amount,
    remark: req.body.remark,
    creator: req.userData.userId
  });
  Transaction.updateOne({ _id: req.params.id, creator: req.userData.userId }, transaction)
  .then(result => {
    if(result.nModified > 0) {
      res.status(200).json({ message: 'Update successful!' });
    } else {
      res.status(401).json({ message: 'Not Authorized!' });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Couldn\'t update post!'
    });
  });
});

router.get('', checkAuth, (req,res,next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = req.query.page;
  const transactionQuery = Transaction
  .find({creator: req.userData.userId})//, "$expr": { "$eq": [{"$month": date}, getMonth()]}})
  .sort({date: -1});

  let fetchedTransactions;

  if(pageSize && currentPage) {
    transactionQuery
      .skip(pageSize*(currentPage-1))
      .limit(pageSize);
  }

  transactionQuery.then(documents => {
    fetchedTransactions = documents;
    return Transaction.count({ creator: req.userData.userId });
  }).then(count => {
      res.status(200).json({
      message: "Transactions fetched succesfully!",
      transactions: fetchedTransactions,
      maxTransactions: count
    })
  })
  .catch(error => {
    res.status(500).json({
      message: 'Fetching transactions failed!'
    });
  });
});
/*
router.get('/month/:month', checkAuth, (req,res,next) => {

  const currentMonth = req.params.month;

  const transactionQuery = Transaction.aggregate
  ([
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          day: { $dayOfMonth: "$date" },
          year: { $year: "$date" }
        },
        totalPrice: { $sum: "$amount" },
        count: { $sum: 1 }
      }
    }
  ]);

  //.find({creator: req.userData.userId});//, "$expr": { "$eq": [{"$month": date}, getMonth()]}})
  // let fetchedTransactions;

  transactionQuery.then(documents => {
      res.status(200).json({
      message: "Transactions fetched succesfully!",
      transactions: documents
    })
  })
  .catch(error => {
    res.status(500).json({
      message: 'Fetching transactions failed!'
    });
  });
});
*/
router.get("/:id", checkAuth, (req,res,next) => {
  Transaction.findById(req.params.id).then(transaction => {
    if(transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ message: 'Transaction not found!' });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Fetching transaction failed!'
    });
  });
})

router.delete('/:id', checkAuth, (req,res,next) => {
  Transaction.deleteOne({ _id: req.params.id, creator: req.userData.userId })
  .then(result => {
    if(result.n > 0) {
      res.status(200).json({ message: 'Delete successful!' });
    } else {
      res.status(401).json({ message: 'Not Authorized!' });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Creating a transaction failed!'
    });
  });
});

module.exports = router;
