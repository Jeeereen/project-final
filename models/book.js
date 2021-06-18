const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    nobook:{
        type: Number,
        unique: true,
        required: true,
    },
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    publisher:{
        type: String,
    }
})

const Book = mongoose.model('book', bookSchema)
module.exports = Book