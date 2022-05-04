const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

router.post('/', multer, postCtrl.createPost);

module.exports = router;