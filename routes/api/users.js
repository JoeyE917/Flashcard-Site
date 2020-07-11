const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Files to validate login/registration info
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// User Schema
const User = require("../../models/User");

// Register user
router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // If info isn't valid, return errors
    if(!isValid){
        return res.status(400).json(errors);
    }

    // Check if an user is already registered with provided email.
    // If so, return error.
    // If not, create new user
    User.findOne({ email: req.body.email }).then(user => {
        if(user){
            // Return error if email already exists
            return res.status(400).json({ email: "Email already exists" });
        } else{
            // Create User
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password and then save user into database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(err => console.log(err));
                });
            });
        }
    });
});

// Login user
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if(!user){
            return res.status(404).json({ emailnotfound: "Email not found"});
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                const payload = {
                    id: user.id,
                    name: user.name
                };

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 86400
                    },
                    (err, token) =>{
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else{
                return res.status(400).json({ passwordincorrect: "Password incorrect"});
            }
        });
    });
});

module.exports = router;