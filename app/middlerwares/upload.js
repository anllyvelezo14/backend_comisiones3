const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

//  multer to use Disk Storage engine.
let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __basedir + "/assets/uploads/");
  },
  filename: (req, file, callback) => {
    console.log(file.originalname);
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});


var uploadFile = multer({ storage: storage });
module.exports = uploadFile;

// let uploadFile = multer({
//   storage: storage,
//   //limits: { fileSize: maxSize },
// }).single("file");

// let uploadFileMiddleware = util.promisify(uploadFile);
// module.exports = uploadFileMiddleware;