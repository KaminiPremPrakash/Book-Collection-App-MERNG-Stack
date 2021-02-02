const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//model is a collection in a database
const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
})

module.exports = mongoose.model('Book',bookSchema);