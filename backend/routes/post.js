const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer');

router.post('/', multer, postCtrl.createPost);
router.get('/', postCtrl.getAllPost);
router.get('/:id', postCtrl.findOnePost);
router.delete('/:id', postCtrl.deleteOnePost);

module.exports = router;