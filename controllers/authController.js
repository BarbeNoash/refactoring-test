var fs = require("fs");
var constants = fs.readFileSync('./config/constants.json');

exports.isAuth = (req, res, next) => {
    next();
}