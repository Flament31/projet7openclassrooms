const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer");

router.post("/", multer, postCtrl.createPost);
router.get("/", postCtrl.getAllPost);
router.get("/:id", postCtrl.getOnePost);
router.delete("/:id", postCtrl.deleteOnePost);
router.put("/:id", postCtrl.updateArticle);

router.post("/like/:id", postCtrl.likes);

module.exports = router;
