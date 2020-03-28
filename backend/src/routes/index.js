const { Router } = require('express');

const book = require('../controllers/book');
const user = require('../controllers/user');
const wishlist = require('../controllers/wishlist');
const wishlistitems = require('../controllers/wishlistItem');
const comments = require('../controllers/comments');
const creditCard = require('../controllers/creditCard');
const shippingAddress = require('../controllers/shippingAddress');

const apiRouter = Router();

apiRouter.get('/', (req, res) => res.send('ayy group 5'));

/* ------ Book Routes ------ */
apiRouter.get('/books', book.read);
apiRouter.post('/books', book.create);
apiRouter.put('/books/:id', book.update);
apiRouter.get('/books/:author', book.readByAuthor);

/* ------ User Routes ------ */
apiRouter.get('/user', user.read);
apiRouter.post('/user', user.create);
apiRouter.post('/user/login', user.login);
apiRouter.put('/user', user.update);
apiRouter.put('/user/password', user.updatePassword);

/* ------ Credit Card Routes ------ */
apiRouter.get('/card', creditCard.read);
apiRouter.post('/card', creditCard.create);
apiRouter.put('/card', creditCard.update);
apiRouter.delete('/card', creditCard.remove);

/* ------ Shipping Address Routes ------ */
apiRouter.get('/address', shippingAddress.read);
apiRouter.post('/address', shippingAddress.create);
apiRouter.put('/address', shippingAddress.update);
apiRouter.delete('/address', shippingAddress.remove);

/*------ WishList Routes -----*/
apiRouter.post('/wishlists', wishlist.create);
apiRouter.get('/wishlists', wishlist.read);
apiRouter.delete('/wishlists/delete', wishlist.removeEntry);
apiRouter.delete('/wishlists/delete/:id', wishlist.removeByID);

/*----- Wishlist Item Routes ------*/

apiRouter.post('/wishlistItems', wishlistitems.create);
apiRouter.get('/wishlistItems', wishlistitems.read);
apiRouter.delete('/wishlistItems/delete', wishlistitems.removeEntry);
apiRouter.delete('/wishlistItems/delete/:id', wishlistitems.removeByID);

/*---------Comments-----------*/

apiRouter.post('/comments', comments.create);
apiRouter.get('/comments', comments.read);
apiRouter.delete('/comments/delete/:id', comments.removeByID);

module.exports = { apiRouter };