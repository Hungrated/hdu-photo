/**
 * Created by zwl on 2017/6/27.
 */
var express = require('express')
var multer  = require('multer')
var router = express.Router();
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({storage:storage});
//multer({ storage: storage }).single('img');
// var upload = multer({ dest: '../uploads/' })

router.post('/upload_file',upload.single('img'), function (req, res, next) {

    console.log(req.file);

    // res.send('ok')

    // res.json({
    //     errno: 0,
    //     data: [
    //         'http://localhost:3000/uploads/' + req.file.filename
    //     ]
    // });
    res.send('http://localhost:3000/uploads/' + req.file.filename);

})

module.exports = router;
