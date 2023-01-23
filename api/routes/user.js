const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');

const UserController = require('../controllers/users');

router.post('/signup', UserController.create_user);

//login functionality
router.post('/login', UserController.user_login);

router.delete('/:userId', auth, UserController.user_delete);

module.exports = router;