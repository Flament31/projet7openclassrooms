const db = require('../models/index');
const Post = db.post;

exports.createPost = (req, res, next) => {
  Post.create({
    title: req.body.title,
    text: req.body.text,
    imageUrl: req.file
      ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      : null,
    idUser: req.body.idUser,
  })
    .then((res) =>

      res.status(201).send({
        data: res.dataValues
      })
    )
    .catch((error) => res.status(400).json({ error }));
}