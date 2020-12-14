const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
var objectID = require("mongodb").objectID;
const user = require("../models/users_schema");
const validLogin = require("../Validation/login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require('../config/config');

router.get("/allUsers", (req,res) => {
    user.find().then((result) => {
        if (!result){
            return res.status(404).json({Error:"User not found"});
        }
        res.status(200).json(result);
    })
    .catch((e) => res.status(404).json({Error:"User not found"}));
});

router.post("/register", (req,res) => {
    const newUser = new user({
        username: req.body.username,
        password: req.body.password,
        userType: req.body.userType,
    });
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then((s) => res.status(201).json(s))
            .catch((err) => console.log(err));
        });
    });
});

router.post("/addUser", (req,res) => {
    var newUser = new user({
        username: req.body.username,
        password: req.body.password,
        userType: req.body.userType,
    });
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then((s) => res.status(201).json(s))
            .catch((err) => console.log(err));
        });
    });
});

router.post("/login", (req,res) => {
    const {errors, isValid} = validLogin(req.body);
    if (!isValid){
        return res.status(400).json(errors);
    }
    const username = req.body.username;
    const password = req.body.password;
    
    user.findOne({username}).then((user) => {
        if (!user){
            errors.username = "Username not found";
            return res.status(404).json(errors);
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch){
                const payLoad = {
                    id: user.id,
                    username: user.username,
                    userType: user.userType,
                };
                jwt.sign(
                    payLoad,
                    key.secretKey,
                    {expiresIn: 60},
                    (err, token) =>
                     {
                        res.json({
                            success:true,
                            token: "Token Data " + token, 
                        });
                    }
                );
            } else {
                errors.password = "Password is invalid.";
                return res.status(400).json(errors);
            }
        });
    }).catch();
});

module.exports = router;