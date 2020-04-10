const Book = require('../models/book');
const httpResponse = require('../util/http');

const create = async (req, res) => {
  try{
    const { author, country, imageLink, language, link, pages, title, year } = req.body;
    const fields = {
      author,
      country,
      imageLink,
      language,
      link,
      pages,
      title,
      year
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