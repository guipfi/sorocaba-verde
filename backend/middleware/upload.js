const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, res, cb){
        cb(null, './uploads/')
    },
    filename: function (req, file, cb){
        let new_name = file.originalname.replace(path.extname(file.originalname), "");
        cb(null, new_name+ Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    cb(null, true);
}

let upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

module.exports = upload.array('photosURL')