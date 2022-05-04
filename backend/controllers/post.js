const db = require('../models/index.js');
const Post = db.Post;
const User = db.User;

exports.createPost = (req, res, next) => {



  const idUser = req.body.idUser;
  User.findOne({ where: { id: idUser } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "identifiants incorrect !" });
      }
      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.file
          ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          : null,
        idUser: idUser,
      });
      console.log(newPost);
      newPost.save()
        .then(() => res.status(201).send({ message: res.dataValues }))
        .catch(error => {
          console.log(error);
          res.status(400).json({ error });
        });
    });

};
