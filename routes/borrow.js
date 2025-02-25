const express = require('express');
const router = express.Router();

const {borrow, topBorrower, topCategory} = require('../controller/borrowController');

const {isAdmin, isAuthenticated} = require('../middleware/auth')

router.post('/', isAuthenticated, borrow);
router.get('/top-borrower', isAdmin, topBorrower);
router.get('/top-category', isAdmin, topCategory);


module.exports = router;