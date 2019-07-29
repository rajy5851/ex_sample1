var express = require('express');
var multer = require('multer');
var path = require('path');

// app을 사용하지 못하므로 router를 사용한다.

// module.exports = function () {

module.exports = function () {
    var router = express.Router();

    var upload2 = multer({
        dest : 'uploads/'
    });

    // limits는 file 사이즈를 말하는 것이다.
    // storage와 limits를 잘 구별해두어야 한다.
    //
    router.post('/fileupload', upload2.single('avatar'), (req, res, next) => {
        console.log('=====================================');
        console.log(req.file);
        // var imgsrc = path.join('/files', req.file.filename);
        var imgsrc = '';

        console.log('imgsrc = ', imgsrc);
        res.render('test/showimage.html', {
            imagesrc: imgsrc
        });
        //res.send('uploaded...' + req.file.filename);
    });


    router.get('/fileupload', (req, res) => {

        console.log('=================================');
        //console.log('req.fileupload', req.fileupload);

        res.render('test/fileupload.html');
        // res.render('test/showimage.html', {
        //     imagesrc: imgsrc
        // })
    });

    return router;
};
