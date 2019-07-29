const express = require('express');
const path = require('path');
const session = require('express-session');
var FileStore = require('session-file-store')(session);
const cookieparser = require('cookie-parser');
const hasher = require('pbkdf2-password')();
const morgan = require('morgan');
const flash = require('connect-flash');
// var modulerouter = require('./router/modulerouter');
// var router = require('./router/modulerouter');
const indexrouter = require('./router/indexrouter')();
const testrouter = require('./router/testrouter')();
const fs = require('fs');
// fs라는 이름으로 사용한다. require로 가지고 와서 사용한다.

// const margin = require('margin');
const app = express();
// express의 초기화하는 함수
const port = 3000;

var sampleCarList = [{
        carNumber: '11주1111',
        owner: '홍길동',
        model: 'SONATA',
        Company: 'HYUNDAI',
        numOfAccident: 2,
        numOfOwnerChange: 1
    },

    {  
        carNumber: '22주2222',
        owner: '손정의',
        model: 'GRANGER',
        Company: 'KIA',
        numOfAccident: 1,
        numOfOwnerChange: 3
    },
    {  
        carNumber: '33주1423',
        owner: '빌게이츠',
        model: 'GRANGER',
        Company: 'HUNDAI',
        numOfAccident: 0,
        numOfOwnerChange: 0
    },

    {  
        carNumber: '23주6783',
        owner: '워런버핏',
        model: 'GRANGER',
        Company: 'HUNDAI',
        numOfAccident: 1,
        numOfOwnerChange: 6
    },

    {  
        carNumber: '12주5234',
        owner: '손정의',
        model: 'GRANGER',
        Company: 'KIA',
        numOfAccident: 1,
        numOfOwnerChange: 3
    },

    {  
        carNumber: '33주1532',
        owner: '손정의',
        model: 'GRANGER',
        Company: 'KIA',
        numOfAccident: 1,
        numOfOwnerChange: 0
    },

    {  
        carNumber: '12주3422',
        owner: '손정의',
        model: 'GRANGER',
        Company: 'HUNDAI',
        numOfAccident: 5,
        numOfOwnerChange: 3
    },

    {  
        carNumber: '27주1843',
        owner: '손정의',
        model: 'GRANGER',
        Company: 'KIA',
        numOfAccident: 1,
        numOfOwnerChange: 0
    },

    {  
        carNumber: '21주2223',
        owner: '손정의',
        model: 'GRANGER',
        Company: 'KIA',
        numOfAccident: 3,
        numOfOwnerChange: 7
    },

    {  
        carNumber: '30주1563',
        owner: '손정의',
        model: 'GRANGER',
        Company: 'KIA',
        numOfAccident: 0,
        numOfOwnerChange: 0
    },

    {  
        carNumber: '51주1344',
        owner: '손정의',
        model: 'GRANGER',
        Company: 'KIA',
        numOfAccident: 0,
        numOfOwnerChange: 0
    },

    {  
        carNumber: '8주4362',
        owner: '손정의',
        model: 'GRANGER',
        Company: 'KIA',
        numOfAccident: 0,
        numOfOwnerChange: 0
    },
];

var sampleUserList = {};

var samplelogin = {};

// fs.writeFileSync('data/userlist.json', JSON.stringify(sampleUserList, null, 2));
if (fs.existsSync('carhistory_lab/data/userlist.json')) {
// 동기 함수와 비동기 함수가 있는데 비동기 함수를 사용한다.
    let rawdata = fs.readFileSync('carhistory_lab/data/userlist.json');
    // rawdata = {
    //         "aa": {
    //         "userid": "aa",
    //         "password": "tcITuC5qXVc2Vg4dV2tlBgxrmTRAerM3fDylFLjB9kKKsPJqdF0mCNudlr0sXUjiPElwJIDnYel2qpFj6KN27V5VDmrCGGB1itBzjIJFxCX2jy9YGwtj4NahDcJMbi4aBoo61WBQPTNoAH0FGfVOX/Uaz/Vxq3vF/srJ0ABgUb4=",
    //         "salt": "tNi5RlM77BRAGwskEYCHN8cHS5k/RCe2MjyJf9sHkroUT6Q5UIbo+yjlPlbO7CMiDiJzFps8faf9MWtCXZLJ8Q==",
    //         "name": "aaa",
    //         "email": "123a",
    //         "phone": "123"
    //         }
    //   }
    sampleUserList = JSON.parse(rawdata);
};
// let rawdata를 JSON.parse()로 선언해주지 않으면 비활성화된다. 
// 기존에 있는 데이터는 지운다. 중복이 된다.

// fs.writeFileSync('data/userlist.json', JSON.stringify(samplelogin));
// 파일을 사용하라는 함수. 비동기 함수이다. wirteFile
// writeFileSync 싱크 모드를 사용하면 전부 다 읽어진다.

// html 렌더링 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(morgan('dev'));

// const morgan = require('morgan')을 하여 함수를 받아온다.
// app.use를 한다. morgan 함수를 사용한다. 옵션은 dev 옵션이다.

app.use(express.urlencoded ({
    extended: false // querystring 모듈 사용
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/files', express.static(path.join(__dirname, 'uploads')));
app.use(cookieparser());
// cookieparsr()를 하나 만들어서 생성해준다. 파일 안에 () 자료를 이동한다.
// app.use('uploads')  파일 업로드 주석

app.use(session({
    secret: '1A@W#E$E',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
    // 메모리이다. 꺼지면 안에 저장된 정보가 다 날라가게 된다. 저장된 정보가
    // default로 되어 있어서
}));

app.use(flash());


app.use(function(req, res, next) {
    // console.log('res.locals.user', res.locals.user);
    res.locals.user = req.session.user;
    // console.log('res.locals.user', res.locals.user);
    next();
});

// move to indexrouter
app.use('/test', testrouter);


app.use('/',indexrouter);



app.listen(port, () => {
    console.log('Server listening...' + port);
});