var multer = require('multer');
const expres = require('express');
const router = expres.Router();


var store = multer.diskStorage({
    destination:function(req,file,callBack){
        callBack(null, '/uploads');
    },
    filename:function(req,file,callBack){
        callBack(null, Date.now()+'.'+file.originalname);
    }
});

var upload = multer({storage:store}).single('file');

router.post('/upload', function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
});

module.exports = router;