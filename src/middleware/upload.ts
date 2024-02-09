import multer from 'multer'
import path from 'path'
import { Request, Response, NextFunction } from 'express'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '..', 'tmp', 'uploads'))
  },
  filename: function (req, file, cb) {
    const fileExtensionParts = file.originalname.split('.')
    const fileExtension = fileExtensionParts[fileExtensionParts.length - 1]
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension)
  },
})

export const upload = multer({ storage })

// Middleware de upload com o Multer
export const uploadPhotoMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Aqui, passamos a chamada de upload.single() como parte do middleware
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Se houver um erro do Multer, lidamos com isso aqui
      return res.status(400).send('Erro no upload de arquivo')
    } else if (err) {
      // Se houver qualquer outro erro, lidamos com isso aqui
      return res.status(500).send('Erro interno do servidor')
    }
    // Se tudo estiver bem, passamos para o próximo middleware ou rota
    next()
  })
}
