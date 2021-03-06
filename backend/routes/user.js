const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/user/:id', userCtrl.updateUser);
router.delete('/user/:id', userCtrl.deleteOneUser);

module.exports = router;