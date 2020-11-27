import express from "express"
import multer from "multer"
import path from "path"
const router = express.Router()

const stroage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "/uploads")
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  },
})

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mime = fileTypes.test(file.mimetype)
  if (extname && mime) {
    return cb(null, true)
  } else {
    cb("Image only allowed!")
  }
}

const upload = multer({
  stroage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
