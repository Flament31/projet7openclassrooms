const db = require("../models/index.js");
const Post = db.Post;
const User = db.User;
const Like = db.Like;

exports.createPost = (req, res, next) => {
  const idUser = req.body.idUser;
  User.findOne({ where: { id: idUser } }).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "identifiants incorrect !" });
    }
    const newPost = new Post({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.file
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : null,
      idUser: idUser,
    });
    console.log(newPost);
    newPost
      .save()
      .then(() => res.status(201).send({ message: res.dataValues }))
      .catch((error) => {
        console.log(error);
        res.status(400).json({ error });
      });
  });
};

exports.getAllPost = (req, res, next) => {
  Post.findAll()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find post with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving post with id=" + id,
      });
    });
};

exports.deleteOnePost = (req, res) => {
  Post.destroy({
    where: {
      id: req.body.idPost,
    },
  })
    .then(() => res.status(200).json({ message: "Article supprimé " }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateArticle = async (req, res) => {
  try {
    const postUpdate = await Post.update(
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.file
          ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          : null,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    res
      .status(201)
      .send({ post: postUpdate, message: `L'article a bien été modifié !` });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

exports.likeUnlike = (req, res, next) => {
  const userID = req.body.liker_id;
  const postID = req.params.id;
  const sqlSelect = `SELECT * FROM likes WHERE liker_id=? AND postLiked_id=?`;
  Like.query(sqlSelect, [userID, postID], (err, result) => {
    if (err) {
      res.status(400).json({ err });
    } else {
      if (result.length != 0) {
        const sqlDelete = `DELETE FROM likes WHERE liker_id=? AND postLiked_id=?`;
        Like.query(sqlDelete, [userID, postID], (err, result) => {
          if (err) {
            res.status(400).json({ err });
          } else {
            res.status(200).json(result);
          }
        });
      } else {
        const sqlInsert = `INSERT INTO likes (liker_id, postLiked_id) VALUES (?, ?)`;
        Like.query(sqlInsert, [userID, postID], (err, result) => {
          if (err) {
            res.status(400).json({ err });
          } else {
            res.status(200).json(result);
          }
        });
      }
    }
  });
};

exports.postLikedByUser = (req, res, next) => {
  const userID = req.body.user;
  const postID = req.params.id;
  const sql = `SELECT * FROM likes WHERE liker_id=? AND postLiked_id=?`;
  Like.query(sql, [userID, postID], (err, result) => {
    if (err) {
      res.status(400).json({ err });
    } else {
      res.status(200).json(result);
    }
  });
};

exports.countLikes = (req, res, next) => {
  Like.findAll();
  if (err) {
    res.status(400).json({ err });
  } else {
    res.status(200).json(result);
  }
};

exports.countAllLikes = (req, res, next) => {
  Like.findAll();
  if (err) {
    res.status(400).json({ err });
  } else {
    res.status(200).json(result);
  }
};

exports.getOneLike = (req, res, next) => {
  const likeId = req.params.id;
  const sql = `SELECT * FROM likes WHERE id=?`;
  Like.query(sql, [likeId], (err, result) => {
    if (err) {
      res.status(400).json({ err });
    } else {
      res.status(200).json(result);
    }
  });
};
