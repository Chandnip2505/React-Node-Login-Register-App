const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/getAll', userController.getUsers);
router.post('/authenticate', userController.authenticateUser);
router.post('/create', userController.createUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;