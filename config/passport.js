const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const User = require('../models/user');
const fs = require('fs');
const publicKey = fs.readFileSync('./config/public_key.pem', 'utf8');

passport.use(
    new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: publicKey,
            algorithms: ["RS256"],
        },
        async (jwtPayload, done) => {
            const user = await User.findOne({id: jwtPayload.id});
            return user ? done(null, user) : done(null, false, {message: "User Not Found!"});

        })
);
module.exports = passport;