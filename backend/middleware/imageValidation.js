const fs = require('fs')

module.exports = async (req, res) => {

    console.log(typeof(req))
    console.log(req.body)

    if(typeof(req.filename) === "undefined" || typeof(req.body) === 'undefined'){
                
        return res.status(400).json({
            errors: "Problema de envio!"
        })
    }

    let name = req.body.name
    let image = req.file.path

    if( !(req.file.mimetype).includes('jpeg') && 
        !(req.file.mimetype).includes('png') && 
        !(req.file.mimetype).includes('jpg'))
        {
            fs.unlinkSync(image)
            return res.status(400).json({
                errors: "Formato não suportado"
            })
        }
    next()
}