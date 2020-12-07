const express = require('express');
const router = express.Router();

const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactions-controller');


// router.get('/', (req, res) => res.send('Hello'));
// to this below


//add/post do not need id so at same route '/'(endpoint)
router.route('/').get(getTransactions).post(addTransaction);

//delete requires id so new route
router.route('/:id').delete(deleteTransaction);


module.exports = router;