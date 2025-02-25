const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    loginUser,
    getOneUser,
    updateUser,
    deleteUser,
    registerUser
} = require('../controller/userController');

const {isAdmin, isAuthenticated} = require('../middleware/auth')

router.get('/', isAuthenticated, getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', isAuthenticated, getOneUser);
router.post('/:id', isAdmin, updateUser);
router.delete('/:id', isAdmin, deleteUser);


module.exports = router;