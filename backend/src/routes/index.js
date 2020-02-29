const { Router } = require('express');

const book = require('../controllers/book');
const user = require('../controllers/user');

const apiRouter = Router();

apiRouter.get('/', (req, res) => res.send('ayy group 5'));

/* ------ Book Routes ------ */
apiRouter.get('/books', book.read);
apiRouter.post('/books', book.create);

/* ------ User Routes ------ */
apiRouter.get('/user', user.read);
apiRouter.post('/user', user.create);
apiRouter.update('/user', user.update);

module.exports = { apiRouter };