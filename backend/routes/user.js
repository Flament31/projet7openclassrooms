const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const validate = require('../middleware/validate-input');

router.post('/signup', validate.user, userCtrl.signup);

module.exports = router;