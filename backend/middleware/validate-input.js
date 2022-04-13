const joi = require('@hapi/joi');

const userSchema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(4).required()
});
exports.user = (req, res, next) => {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
        res.status(422).json({ error: "email ou mot de passe invalide" });
    } else {
        next();
    }
};


const sauceSchema = joi.object({
    userId: joi.string().trim().length(24).required(),
    title: joi.string().trim(),
    file: joi.string().trim(),
    text: joi.string().trim(),
});

exports.sauce = (req, res, next) => {
    let sauce;
    if (req.file) {
        sauce = JSON.parse(req.body.sauce);
    } else {
        sauce = req.body;
    }

    const { error, value } = sauceSchema.validate(sauce);
    if (error) {
        res.status(422).json({ error: "Les données entrées sont invalides" });
    } else {
        next();
    }
};