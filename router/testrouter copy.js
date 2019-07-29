var express = require('express');
var multer = require('multer');
var path = require('path');

// app을 사용하지 못하므로 router를 사용한다.

// module.exports = function () {

module.exports = function () {
    var router = express.Router();

    var storage = multer.diskStorage({
        // 서버에 저장할 폴더
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        // 서버에 저장할 파일명
        filename: function (req, file, cb) {
            // file.uploadfilename = file.originalname.substring(0,
            //     file.originalname.lastIndexOf('.'));
            // const prefix = 'test_';
            // const prefix = req.file.fieldname;
            // req.file.newname = prefix + '_' + req.file.originalname;
            // cb(null, req.file.newname);
            cb(null, new Date().valueOf() + '_' + file.originalname);
        }
    });
    
    var imgFileFilter = function (req, file, callback) {
        var ext = path.extname(file.originalname);
        console.log('확장자 : ', ext);
        if (ext !== '.png' && EXT !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        // originalname 이 png가 나온다면 
        callback(null, true);
        // null은 정상이라는 의미이고, true는 계속 진행하라는 의미이다.
    };

    // cb는 우리가 호출해주는 것이 아니라 cb는 mluter에서 호출해주는 것이다.
    // 기능을 구현해준다.
    // 파일을 업로드해준다.
    //         file.uploadfilename = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
    //         cb(null, new Data().valueOf() + '_' + file.originalname);
    //     }
    // });
    // 파일 명을 해놓으면 uploads 폴더에 선택한 폴더를 업로드 시킬 수 있다.
    // 파일 명을 선택한 후 폴더를 업로드할 수 있다.

    var upload = multer({
        storage: storage,
        // fileFilter: imgFileFilter,
        // filter를 설정한다. imgFileFilter를 만든다.
        limits: {
            // files: 10,
            // fileSize: 3*1024*1024
            fileSize: 10 * 1024 * 1024
        }
        // dest : 'uploads/'
    });

    var imgUpload = multer({
        storage: storage,
        // fileFilter: imgFileFilter,
        // filter를 설정한다. imgFileFilter를 만든다.
        limits: {
            // files: 10,
            // fileSize: 3*1024*1024
            fileSize: 10 * 1024 * 1024
        }
        // dest : 'uploads/'
    });
    
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

    /* GET users listing. */
    router.get('/', function (req, res, next) {
        res.send('respond with a resource');
    });

    router.get('/flash', function (req, res) {
        req.session.message = '세션 메시지';
        req.flash('message', 'flash 메시지');
        res.redirect('/users/flash/result');
    });

    router.get('/flash/result', function (req, res) {
        res.send(`${req.session.message} ${req.flash('message')}`);
    });

    router.get('/router', function (req, res) {
        // /test를 기본적으로 가지고 있다.
        // /Cookie를 가지고 있다. getCookie
        console.log('test/router', test / router);
        res.send('<h1>test/router</h1>')
    });
    // 기본 라우터의 구조이다. 뼈대 구조
    // 라우터를 사용하려면 app.use로 불러온다.



    router.get('/setCookie', (req, res) => {
        console.log('/test/setCookie');
        // req는 요청에 대한 메시지
        // res는 서버에 대한 응답에 대한 메시지이다.
        res.cookie('user', {
            'name': '홍길동',
            'id': 'user01'
        }, {
                maxAge: 1000,
                httpOnly: true
            });
        res.redirect('/test/getCookie');
    });

    router.get('/getCookie', (req, res) => {
        console.log(req.cookies);
        res.render('test/getcookie.html', {
            cookie: req.cookies
        });
    });

    router.get('/setsession', (req, res) => {
        console.log('/test/setsession');

        req.session.myname = '홍길동';
        req.session.myid = 'hong';
        req.session.save(function () {
            res.redirect('/test/getsession');
        });
    });

    router.get('/getsession', (req, res) => {
        console.log('/test/getsession');
        console.log('session.myname = ', req.session.myname);
        res.render('test/getsession.html', {
            myname: req.session.myname,
            myid: req.session.myid
        });
    });

    router.get('/setlocals', (req, res) => {
        res.locals.test2 = 'test2';
        res.render('test/locals.html', {
            test1: 'test1'
        });
    });

    router.get('/fileupload', (req, res) => {

        console.log('=================================');
        //console.log('req.fileupload', req.fileupload);

        res.render('test/fileupload.html');
        // res.render('test/showimage.html', {
        //     imagesrc: imgsrc
        // })
    });

    // router.post('/fileupload', upload.single('avatar'), (req, res, next) => {
    //     console.log('req.file', req.file);
    //     // res.send('uploaded...', + req.file.filename);
    //     // req.body;
    //     //upload.single('avatar')를 미들웨어에 입력해준다.
    //     // ('avatar')는 변수이다. 업로드를 시켜주는 파일의 대상을 입력해주면 된다.

    //     // request body부분에 
    //     // 파일에 올라온 것들을 파일에 집어넣어준다. alter 이다.
    //     res.send('uploaded...', + req.file.filename);
    // }); // 분리해서 사용이 가능하다.

    router.post('/fileupload_multi', upload.array('photos'), (req, res, next) => {

        console.log(req.files);
        // upload.array('photos', $)를 미들웨어로 입력한다.
        // 저장 위치나 저장되는 파일 명을 확인한다.
        // res.send('uploaded...' + req.files[0].filename);
        // upload, file을 업로드 해준다.
        res.send('uploaded...' + req.files[0].filename);
        res.send('uploaded...');
    });

    router.get('/fileupload_multi_form', (req, res) => {
        res.render('test/fileupload_multi.html');
    });
    return router;
};

// 파일을 업로드 해준다. uploadfile /test
// test 파일
// var express = require('express');

// module.exports = function () {
//     var router = express.router();

//     router.get('/router', (req, res) => {
//         res.send('fdafdas')
//     })

//     return router;
// }