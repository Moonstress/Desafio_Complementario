import multer from  'multer'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(dirname(__filename))

// console.log('dirname: ', __dirname)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log('multer dir:', __dirname + '/public/img')
        cb(null, `${__dirname}/public/img`)        
    },// nombre de la carpeta donde vamos a guardar img
    filename: function (req, file, cb) {
        // console.log('multer:',file)
        cb(null, `${Date.now()}-${file.originalname}`)
    } // el nombre del archivo que se va a guardar
})

export const uploader = multer({
    storage
})