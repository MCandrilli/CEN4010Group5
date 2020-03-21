const mongoose = require('mongoose');

// const commentSchema = new mongoose.Schema({
//     title: {type: String, required: true},
//     user: {type: String, required: true},
//     comment: {type: String, required: true}
// })



const commentSchema = new mongoose.Schema({
    User: String,
    Comment: String
})

const bookCommentSchema = new mongoose.Schema({
        
    title: String,
    Comments: [commentSchema]

})

const comment = mongoose.model('Comments', bookCommentSchema);

module.exports = comment;
