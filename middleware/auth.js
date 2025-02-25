const passport = require('passport');

const authenticate = (role = []) => (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(!err ? 401 : 500).json({
                message: err ? err.message : "Unauthorized",
            })
        }
        if (role.length && role.includes(user.role)) {
            return res.status(403).json({message: "Forbidden"});
        }
        res.user = user;
        return next();
    })(req, res, next);
}

const isAuthenticated = authenticate();
const isAdmin = authenticate(["admin"]);

module.exports = {isAuthenticated, isAdmin};