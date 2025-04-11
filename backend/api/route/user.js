const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
// const navigate = require('Navigate');

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                password: hash,
                email: req.body.email
            })

            user.save()
                .then(result => {
                    res.status(200).json({
                        new_user: result
                    })
                    // navigate('/login')
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });
        }
    })
})

router.post('/login', (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    msg: "user not found"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                    return res.status(401).json({
                        msg: "password matching failed"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        username: user[0].username,
                        email: user[0].email
                    }, 'this is secret key', 
                    {
                        expiresIn:"24h"
                    }
                    );
                    res.status(200).json({
                        username:user[0].username,
                        email: user[0].email,
                        token: token
                    })
                }
            })
        })
        .catch(err=>{
            res.status(500).json({
                err:err
            })
        })
        
})
module.exports = router;