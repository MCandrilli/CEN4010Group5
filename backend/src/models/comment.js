const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    title: {type: String, required: true},
    user: {type: String, required: true},
    comment: {type: String, required: true}
})

const comment = mongoose.model('Comments', commentSchema);

module.exports = comment;
