const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user/:id', userCtrl.getOneUser);
router.put('/user/:id', userCtrl.updateUser);

module.exports = router;