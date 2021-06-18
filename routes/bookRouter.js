const express = require('express')
const bookRouter = express.Router()
const Book = require('../models/book')
const checkAuth = require('../auth')

bookRouter.use(express.json())
bookRouter.route('/')

.get(async (req, res, next) =>{
    try{
        
        const findResult = await Book.find({})
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(findResult)
    }
    catch(err){
        next(err)
    }
})

.post(checkAuth, async (req, res, next) =>{
    try{
        const book = await Book.create(req.body);
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(book)
    }
    catch(err){
        next(err)
    }
})

.delete(checkAuth, async (req, res, next) =>{
    try{
        const deleteResult = await Book.deleteMany({})
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({
            "message":`${deleteResult.n} book has been deleted!!`
        })
    }
    catch(err){
        next(err)
    }
})

bookRouter.route('/:nobook')

.get(async (req, res, next) =>{
    try{
        const findResult = await Book.findOne({nobook : req.params.nobook})
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(findResult)
    }
    catch(err){
        next(err)
    }
})

.put(checkAuth, async (req, res, next) =>{
    try{
        const updateResult = await Book.updateOne({nobook : req.params.nobook},{$set : req.body})
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(updateResult)
    }
    catch(err){
        next(err)
    }
})

.delete(checkAuth, async (req, res, next) =>{
    try{
        const deleteResult = await Book.deleteOne({nobook : req.params.nobook})
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({
            "message":`${deleteResult.n} book has been deleted!!`
        })
    }
    catch(err){
        next(err)
    }
})

module.exports = bookRouter
