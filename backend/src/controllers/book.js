const Book = require('../models/book');
const httpResponse = require('../util/http');

const create = async (req, res) => {
  try{
    const { author, country, imageLink, language, link, pages, title, year, genre, price, rating, ratingCount, overview } = req.body;
    const fields = {
      author,
      country,
      imageLink,
      language,
      link,
      pages,
      title,
      year,
      genre,
      price,
      rating,
      ratingCount,
      overview

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

const update = async (req, res) => {
  try{
    const books = await Book.findByIdAndUpdate(req.params.id, {rating: req.body.rating, ratingCount: req.body.ratingCount});
    httpResponse.successResponse(res, books);
  } catch (e) {
    console.log(e)
    httpResponse.failureResponse(res, e.toString());
  }
}

const readByAuthor = async (req, res) => {
  try {
    const bookByAuthor = await Book.find({author: req.params.author});
    httpResponse.successResponse(res, bookByAuthor);
  } catch (e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  }
}

module.exports = { read, create, update, readByAuthor };
