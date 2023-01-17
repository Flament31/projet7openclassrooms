const joi = require("@hapi/joi");

const userSchema = joi.object({
  email: joi.string().trim().email().required(),
  password: joi.string().trim().min(4).required(),
});
exports.user = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    res.status(422).json({ error: "email ou mot de passe invalide" });
  } else {
    next();
  }
};

const likeSchema = joi.object({
  userId: joi.string().trim().length(24).required(),
  like: joi.valid(-1, 0, 1).required(),
});
exports.like = (req, res, next) => {
  const { error, value } = likeSchema.validate(req.body);
  if (error) {
    res.status(422).json({ error: "Les données entrées sont invalides" });
  } else {
    next();
  }
};
