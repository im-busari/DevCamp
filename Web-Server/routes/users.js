const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/', UserController.getAllUsers);
router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);

module.exports = router;
