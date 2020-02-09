const { Router } = require('express');

const book = require('../controllers/book');

const apiRouter = Router();

apiRouter.get('/', (req, res) => res.send('ayy group 5'));

/* ------ Book Routes ------ */
apiRouter.get('/books', book.read);
apiRouter.post('/books', book.create);

module.exports = { apiRouter };