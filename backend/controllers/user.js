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