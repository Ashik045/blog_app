// external import
const bcrypt = require('bcrypt');

// internal import
const User = require('../models/user');

const regController = async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);

        // create a new user and save it
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });
        newUser.save();

        res.status(200).json({
            message: 'signup successfull',
        });
    } catch (err) {
        res.status(500).json({
            error: 'Authentication failed',
        });
    }
};

const loginController = async (req, res) => {
    try {
        // find the user
        const user = await User.findOne({ email: req.body.email });

        const conPass = await bcrypt.compare(req.body.password, user.password);

        if (conPass) {
            res.status(200).json({
                message: user,
            });
        } else {
            res.status(500).json({
                error: 'Authentication failed!',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: 'Authentication failed!!',
        });
    }
};

module.exports = {
    regController,
    loginController,
};
