const bcrypt = require('bcrypt');
const db = require('../models/index.js');
console.log(Object.keys(db));

exports.signup = (req, res, next) => {
    const User = db.User;

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                name: req.body.name,
                firstname: req.body.firstname,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({
                    message: 'Utilisateur crée'
                }))
                .catch(error => res.status(500).json({
                    message: 'Cette adresse mail et\\ou ce nom d\'utilisateur semble être déjà utilisé'
                }));
        })
        .catch(error => console.log(error) || res.status(500).json({
            error: "erreur signup"
        }));
};