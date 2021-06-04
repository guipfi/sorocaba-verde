const admin = require('firebase-admin')
const crypto = require('crypto')

const serviceAccount = require('../config/firebase-key.json')


const BUCKET = "sorocaba-verde-8de57.appspot.com/"

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET
})

const bucket = admin.storage().bucket()

const uploadFile = (req,res,next) =>{
    if(!req.file) return next();
    const file = req.file

    crypto.randomBytes(16,(err,hash) =>{
        if(err) console.error(err)

        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        const fileUpload = bucket.file(fileName)
        const stream = fileUpload.createWriteStream(
            {
                metadata:{
                    contentType: file.mimetype,
                }
            }
        );
    
        stream.on("error", (e) =>{
            console.error(e)
        })
    
        stream.on("finish", async () =>{
          await fileUpload.makePublic()
    
          req.file.firebaseURL = `https://storage.googleapis.com/${BUCKET}/${fileName}`
    
          next()
        })
    
        stream.end(file.buffer)
    })
}

module.exports = {uploadFile}