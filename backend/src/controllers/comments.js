const Comment = require('../models/comment');
const httpResponse = require('../util/http');

const create = async (req, res) => {
  try{
    const {title , Comments ,  user, comment } = req.body;
    const fields = {
      title,
      Comments,
      user,
      comment
      
    }

    const singleComment = await Comment.create(fields);

    httpResponse.successResponse(res, 'success')
  } catch (e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());

  }
}

const read = async (req, res) => {
  try{
    const singleComment = await Comment.find({});

    httpResponse.successResponse(res, singleComment);
  } catch (e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  }
}


const removeByID = async (req, res) => {
  try {
    const singleComment = await Comment.deleteOne({_id: req.params.id});
    res.send(singleComment);
  } catch (e) {
    console.log(e);
  }
}

module.exports = { read, create, removeByID};