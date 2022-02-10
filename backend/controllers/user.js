const bcrypt = require('bcrypt');
const models = require('../models');


const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*,])(?=.{8,})/;

exports.signup = (req, res, next) => {
    if (
        req.body.email == "" ||
        req.body.name == "" ||
        req.body.firstname == "" ||
        req.body.password == ""
    ) {
        return res
            .status(400)
            .json({ error: "Merci de remplir tous les champs !" });
    }
    if (!EMAIL_REGEX.test(req.body.email)) {
        return res.status(400).json({ error: "Email incorrect !" });
    }
    if (!PASSWORD_REGEX.test(req.body.password)) {
        return res.status(401).json({
            error:
                "Minimum: 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère (!.@#$%^&*)",
        });
    } else {
        bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
                const user = models.User.create({
                    email: req.body.email,
                    name: req.body.name,
                    firstname: req.body.firstname,
                    password: hash,
                })
                    .then((user) => {
                        res.status(201).json({
                            userId: user,
                        });
                    })
                    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                    .catch((error) => res.status(400).json({ error: error }));
            })
            .catch((error) => res.status(500).json({ error: error }));
    }


};