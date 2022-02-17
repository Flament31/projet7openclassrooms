const bcrypt = require('bcrypt');
const db = require('../models');
const token = require("../middleware/token");

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

exports.login = async (req, res) => {
    try {
        const user = await db.User.findOne({
            where: { email: req.body.email },
        }); // on vérifie que l'adresse mail figure bien dan la bdd
        if (user === null) {
            return res.status(403).send({ error: "Connexion échouée" });
        } else {
            const hash = await bcrypt.compare(req.body.password, user.password); // on compare les mots de passes
            if (!hash) {
                return res.status(401).send({ error: "Mot de passe incorrect !" });
            } else {
                const tokenObject = await token.issueJWT(user);
                res.status(200).send({
                    // on renvoie le user et le token
                    user: user,
                    token: tokenObject.token,
                    sub: tokenObject.sub,
                    expires: tokenObject.expiresIn,
                    message: "Bonjour " + user.firstname + " !",
                });
            }
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};