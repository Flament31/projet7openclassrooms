const db = require("../models/index.js");
const Post = db.Post;
const User = db.User;

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

exports.likePost = (req, res, next) => {
  const idUser = req.body.idUser;
  const likes = req.body.likes;
  console.log(likes);
  const idPost = req.params.idPost;
  Post.findOne({ _id: idPost })
    .then((post) => {
      if (likes == 0) {
        if (post.usersLiked.includes(idUser)) {
          post.usersLiked.splice(post.usersLiked.indexOf(idUser), 1);
          post.likes -= 1;
        } else {
          post.usersDisliked.splice(post.usersDisliked.indexOf(idUser), 1);
          post.dislikes -= 1;
        }
      } else if (likes == -1 || likes == 1) {
        if (
          !post[likes == -1 ? "usersDisliked" : "usersLiked"].includes(idUser)
        ) {
          post[likes == -1 ? "usersDisliked" : "usersLiked"].push(idUser);
          post[likes == -1 ? "dislikes" : "likes"] += 1;
        } else {
          post[likes == -1 ? "usersLiked" : "usersDisliked"].splice(
            post[likes == -1 ? "usersLiked" : "usersDisliked"].indexOf(userId),
            1
          );
          post[likes == -1 ? "likes" : "dislikes"] -= 1;
        }
      }
      post
        .save()
        .then(() => {
          console.log({ message: "Like/Dislike envoyé !" });
          res.status(201).json({ message: "Like/Dislike envoyé !" });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};
