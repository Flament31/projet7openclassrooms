const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const db = require('../models/index.js');
const token = require("../middleware/token");
const User = db.User


exports.signup = async (req, res) => {
    try {
        const user = await db.User.findOne({
            where: { email: req.body.email },
        });
        if (user !== null) {
            if (user.email === req.body.email) {
                return res.status(400).json({ error: "Cette email est déjà utilisé" });
            }
        } else {
            const hash = await bcrypt.hash(req.body.password, 10);
            const newUser = await db.User.create({
                email: req.body.email,
                name: req.body.name,
                firstname: req.body.firstname,
                password: hash,
            });

            const tokenObject = await token.issueJWT(newUser);
            res.status(201).send({
                user: newUser,
                token: tokenObject.token,
                expires: tokenObject.expiresIn,
                message: `Votre compte est bien créé ${newUser.email} !`,
            });
        }
    } catch (error) {
        return res.status(400).send({ error: "email déjà utilisé" });
    }
};

exports.logins = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    if (email == null || password == null) {
        res.status(400).json({
            message: 'Il manque un paramètre ! '
        });
    }
    User.findOne({ where: { email: email } })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (errBcrypt, resBcrypt) => {
                    if (resBcrypt) {
                        res.status(200).json({
                            userId: user.id,
                            token: jwt.sign(
                                { userId: user.id },
                                'RANDOM_TOKEN_SECRET',
                                {
                                    expiresIn: "24h",
                                },
                            ),
                        })
                    } else {
                        res.status(403).json({
                            error: 'invalid password ',
                            password: password,
                            user: user,
                            errBcrypt: errBcrypt,
                            resBcrypt: resBcrypt
                        });
                    };
                })
            } else {
                res.status(404).json({
                    'erreur': 'Cet utilisateur n\'existe pas'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        })
};

exports.login = (req, res, next) => {
    if (!req.body.password || !req.body.email) {
        return res.status(400).json({ error: "bad request" });
    }
    const email = req.body.email;
    User.findOne({ where: { email: email } })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: "identifiants incorrect !" });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    console.log(valid);
                    if (!valid) {
                        return res.status(404).json({ error: "identifiants incorrect !" });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            'RANDOM_TOKEN_SECRET',
                            {
                                expiresIn: "24h",
                            },

                        ),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};