require("dotenv").config();
module.exports = {
    authentification: {
        jwtSecret: 'RANDOM_TOKEN_SECRET' || 'secret',
    },

};