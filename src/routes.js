const { Router } = require('express');

const BookController = require('./app/controllers/BookController');

const router = Router();

router.get('/books', BookController.index);
router.get('/books/:id', BookController.show);
router.post('/books', BookController.store);
router.delete('/books/:id', BookController.delete);
router.put('/books/:id', BookController.update);

module.exports = router;
