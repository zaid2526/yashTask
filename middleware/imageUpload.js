const multer = require('multer')
const path = require('path')

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
                return cb('Give proper files formate to upload')
            }
        
    }
}).single('image')