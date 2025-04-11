const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    blogtitle: String,
    blogbody: String,
    blogauthor: String
})

module.exports = mongoose.model('Blog', blogSchema)