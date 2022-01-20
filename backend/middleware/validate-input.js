const joi = require('@hapi/joi');

const userSchema = joi.object({
    name: joi.string().trim().min(1).required(),
    firstname: joi.string().trim().min(1).required(),
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
