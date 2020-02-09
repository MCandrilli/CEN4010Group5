const Book = require('../models/book');
const httpResponse = require('../util/http');

const create = async (req, res) => {
  try{
    const { title, author } = req.body;
    const fields = {
      title,
      author
    }

    const book = await Book.create(fields);

    httpResponse.successResponse(res, 'success')
  } catch (e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  }
}

const read = async (req, res) => {
  try{
    const books = await Book.find({});

    httpResponse.successResponse(res, books);
  } catch (e) {
    console.log(e)
    httpResponse.failureResponse(res, e.toString());
  }
}

module.exports = { read, create };