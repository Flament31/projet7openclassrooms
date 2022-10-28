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

exports.likes = (req, res, next) => {
  //find the likes of the post with the user id
  Like.findOne({ where: { id: req.body.id, IdUser: req.body.idUser } })
    .then((Like) => {
      //if the user has already liked the post, destroy the like
      if (Like) {
        Like.destroy({
          where: { likes: -1, id: req.body.id, IdUser: req.body.idUser },
        })
          .then(() => res.status(205).json({ message: "Like supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        //if the user has not liked the post, create a new like with the post id and user id
        Like.create({
          IdUser: req.params.id,
          IdUser: req.body.id,
        })
          .then(() => res.status(201).json({ message: "Like créé !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
