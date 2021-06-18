const express = require('express')
const userRouter = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

userRouter.use(express.json())

userRouter.post('/signup', (req, res, next) =>{
    User.find({username: req.body.username})
        .exec()
        .then(user =>{
            if(user.length >= 1){
                return res.status(409).json({
                    message: 'The username has been used!!'
                })
            }
            else{
                bcrypt.hash(req.body.password, 10, (err, hash) =>{
                    if(err){
                        return res.status(500).json({err})
                    }
                    else{
                        const user = new User({
                            username: req.body.username,
                            password: hash
                        })
                        user.save().then(result =>{
                            console.log(result)
                            res.status(201).json({
                                message: 'Your account has been successfully registered'
                            })
                        })
                        .catch(err =>{
                            console.log(err)
                            res.status(500).json({err})
                        })
                    }
                })
            }
        })
})

userRouter.post('/login', (req, res, next) =>{
    User.find({username: req.body.username})
        .exec()
        .then(user =>{
            if(user.length <1){
                return res.status(401).json({
                    message: 'Login failed!!'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
                if(err){
                    return res.status(401).json({
                        message: 'Login failed!!'
                    }) 
                }
                if(result){
                    const token = jwt.sign(
                    {
                        username: user[0].username,
                        userId: user[0]._id
                    }, '1234', 
                    {
                        expiresIn: "1h"   
                    }
                    )
                    return res.status(200).json({
                        message: 'login successful',
                        token: token
                    })
                }
                res.status(401).json({
                    message: 'Login failed!!'
                })
            })
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({err})
        })
})

userRouter.delete('/:userId', (req, res, next) =>{
    User.remove({ _id: req.params.userId})
        .exec()
        .then(result =>{
            res.status(200).json({
                message: 'The user account has been deleted'
            })
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({err})
        })
})

module.exports = userRouter