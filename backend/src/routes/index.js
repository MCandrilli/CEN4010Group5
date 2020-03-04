const { Router } = require('express');

const book = require('../controllers/book');
const user = require('../controllers/user');
const wishlist = require('../controllers/wishlist');
const wishlistitems = require('../controllers/wishlistItem');

const apiRouter = Router();

apiRouter.get('/', (req, res) => res.send('ayy group 5'));

/* ------ Book Routes ------ */
apiRouter.get('/books', book.read);
apiRouter.post('/books', book.create);

/* ------ User Routes ------ */
apiRouter.get('/user', user.read);
apiRouter.post('/user', user.create);
apiRouter.put('/user', user.update);

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

module.exports = { apiRouter };