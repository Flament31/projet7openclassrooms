const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer");
const validate = require("../middleware/validate-input");

router.post("/", multer, postCtrl.createPost);
router.get("/", postCtrl.getAllPost);
router.get("/:id", postCtrl.getOnePost);
router.delete("/:id", postCtrl.deleteOnePost);
router.put("/:id", postCtrl.updateArticle);
router.post("/:id/like", postCtrl.likePost);

module.exports = router;
