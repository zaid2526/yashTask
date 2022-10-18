const express = require('express');

const bookController = require('../controllers/book.controller');

const Auth=require('../middleware/auth')

const router = express.Router();

router.post('/addbook',Auth.auth,bookController.upload, bookController.postAddBook);
router.get('/getbook/:bookId', Auth.auth, bookController.getBookById);
router.get('/getbook',Auth.auth, bookController.getBooks);




router.put('/editbook/:bookId',Auth.auth,bookController.upload, bookController.updateBook);

router.delete('/deletebook/:bookId',Auth.auth, bookController.deleteBook);








module.exports=router;