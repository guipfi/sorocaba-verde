const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, res, cb){
        cb(null, '../uploads/')
    },
    filename: function (req, file, cb){
        console.log(file)
        cb(nullm, Date.now() + path.extname(file.originalname))
    }
})

const filter = (req, file, cb) => {
    cb(null, true);
}

let upload = multer({
    storage: storage,
    fileFilter: filter
})

module.exports = upload.array('photosURL')