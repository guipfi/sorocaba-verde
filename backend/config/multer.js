const multer = require("multer");
const path = require('path')
const crypto = require('crypto')

module.exports =  {
    dest: path.resolve(__dirname, '..', 'tmp','uploads'),
    storage: multer.memoryStorage({
        destination:(req,file,cb) => {
            cb(null, path.resolve(__dirname, '..', 'tmp','uploads'))
        },
    }),
    limits:{
        fileSize: 100  * 1024 * 1024
    },
    fileSize: (req,file, cb) =>{
        const allowedMimes = [
            'image/jpeg',
            'image/png',
            'image/jpg',
            'application/pdf'
        ]

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true)
        } else{
            cb(new Error('Invalid file type.'))
        }
    }
};