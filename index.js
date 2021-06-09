const express = require('express') 
const app = express() //! 새로운 익스프레스 앱 만들기
const port = 4000 //! 포트는 내가 지정한다

// TODO 환경변수를 위해
const config = require("./config/key")

// TODO 회원가입을 위해 필요한 모듈 가져오기
const {User} = require("./models/User")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended : true}))
    //! application/x-www-form-urlencoded 형식의 데이터를 분석해서 가져올 수 있도록 변환한다
app.use(bodyParser.json())  
    //! application/json 타입으로 되어있는 정보를 분석해서 가져올 수 있도록


//TODO  mongodb+srv://jungeundelilahlee:<password>@reactyoutube.agzwg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const mogoose = require("mongoose")
mogoose.connect(config.mongoURI, {
    //! 아래를 넣어주는 이유 : 에러나지 않도록 하기 위함이다    
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : false
})
.then(() => console.log("몽고 디비 연결 성공!"))
.catch((err) => console.log(err))




app.get('/', (req, res) => { //! 이 부분이 브라우저에 보여지게 된다
  res.send('Hello Willyyy!')
})

// TODO 회원가입을 위한 라우트 만들기
//! 회원가입시 필요한 정보들을 client에서 가져오면, 받은 정보들을 DB에 넣어준다
//! models/User.js에서 만든 스키마를 가져온다
app.post("/register", (req, res) => {
    const user = new User(req.body) //! req.body를 (body-parser를) 통해서 클라에서 보내는 정보를 받는다
    user.save((err,doc) => {
        if (err) {
            return res.json({ success : false, err })
        } else {
            return res.status(200).json({ success : true })
        }
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})