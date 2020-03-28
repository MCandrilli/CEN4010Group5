const mongoose = require('mongoose');

// const commentSchema = new mongoose.Schema({
//     title: {type: String, required: true},
//     user: {type: String, required: true},
//     comment: {type: String, required: true}
// })



const commentSchema = new mongoose.Schema({
    User: String,
    Comment: String,
    Rating : Number
})

const bookCommentSchema = new mongoose.Schema({
        
    title: String,
    Comments: [commentSchema]

})

const Comment = mongoose.model('Comments', bookCommentSchema);

module.exports = Comment;
