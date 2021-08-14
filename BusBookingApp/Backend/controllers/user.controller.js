const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');

module.exports.register = async (req, res, next) => {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.mobileno = req.body.mobileno;
    user.password = req.body.password;
    user.dob = req.body.dob;
    user.gender=req.body.gender;
    await user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            //error handling

            if(err.code === 11000){
                res.status(422).send(["Email already exists"]);
            }
            else{
                return next(err);
            }
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(404).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(401).json(info);
    })(req, res);
}

