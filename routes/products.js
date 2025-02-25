const express = require('express');

const router = express.Router();
const {isAdmin, isAuthenticated} = require('../middleware/auth');
const {
    getOneProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    createProduct
} = require('../controller/productController');


router.get('/', isAuthenticated, getAllProduct);
router.post('/', isAdmin, createProduct);
router.get('/:id', isAuthenticated, getOneProduct);
router.put('/:id', isAdmin, updateProduct);
router.delete('/:id', isAdmin, deleteProduct);


module.exports = router;