const Book = require('../models/book');

const multer = require('multer')
const path = require('path')


exports.postAddBook = (req, res, next) => {
    const name = req.body.name;
    const image= req.file.path;
    const author = req.body.author;
    const pages = req.body.pages;
    const price = req.body.price;

    
    const book = new Book({
      name:name,
      image:image ,
      author:author,
      pages:pages,
      price:price,
    });
    book
      .save()
      .then(result => {
        console.log('Created BOOK');
        res.json({result})
      })
      .catch(err => {
        console.log(err);
      });
  };


  exports.getBooks = (req, res, next) => {
    Book.find()
      .then(books => {
        console.log(books)
        res.json({books})
      })
      .catch(err => console.log(err));
  };

  exports.getBookById=(req,res,next)=>{
    const bookId = req.params.bookId;
    Book.findById(bookId)
        .then((book)=>{
          res.json({book});
        })
        .catch(err=>{console.log(err);})
  }

  exports.updateBook = (req, res, next) => {
    const bookId = req.params.bookId;
    const updatedName = req.body.name;
    const updatedImage = req.file.path;
    const updatedAuthor = req.body.author;
    const updatedPages = req.body.pages;
    const updatedPrice = req.body.price;
  
    Book.findById(bookId)
      .then(book=>{
        book.name=  updatedName;
        book.image=updatedImage;
        book.author=updatedAuthor;
        book.pages=updatedPages;
        book.price=updatedPrice;
        
        return book.save();
      })
      .then(()=>{
        console.log('UPDATED BOOK!');
        res.json({msg:"book Updated"});
      })
      .catch(err=>{console.log(err);})
  };

  exports.deleteBook = (req, res, next) => {
    const bookId = req.params.bookId;
    Book.findByIdAndRemove(bookId)
      .then(() => {
        res.json({msg:"book deleted"})
      })
      .catch(err => console.log(err));
  };


  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

exports.upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        if(file.mimetype==='image/png'||
            file.mimetype==='image/jpg'||
            file.mimetype==='image/jpeg'
            ){
                return cb(null, true)
            }else{
                cb('Give proper files formate to upload')
            }
    }
}).single('image')