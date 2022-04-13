require("dotenv").config();
module.exports = {
    authentication: {
        jwtSecret: 'RANDOM_TOKEN_SECRET' || 'secret',
    },

};