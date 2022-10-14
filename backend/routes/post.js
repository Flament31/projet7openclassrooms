const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer");

router.post("/", multer, postCtrl.createPost);
router.get("/", postCtrl.getAllPost);
router.get("/:id", postCtrl.getOnePost);
router.delete("/:id", postCtrl.deleteOnePost);
router.put("/:id", postCtrl.updateArticle);

router.patch("/likeUnlike/:id", postCtrl.likeUnlike);
router.post("/postLikedByUser/:id", postCtrl.postLikedByUser);
router.get("/likeUnlike/:id", postCtrl.countLikes);
router.get("/likeUnlike", postCtrl.countAllLikes);
router.get("/likeUnlike/getOneLike/:id", postCtrl.getOneLike);

module.exports = router;
