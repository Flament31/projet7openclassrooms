const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const validate = require('../middleware/validate-input');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;