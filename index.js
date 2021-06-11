const express = require('express') 
// TODO 새로운 익스프레스 앱 만들기
const app = express() 
// TODO 포트지정
const port = 4000 
// TODO 쿠키에 토큰을 저장하기 위해
const cookieParser = require("cookie-parser")
// TODO 환경변수를 위해
const config = require("./config/key")
// TODO 회원가입을 위해 필요한 모듈 가져오기
const {User} = require("./models/User")
// TODO 인증을 위해 auth 가져오기 middleware/auth.js
const { auth } = require("./middleware/auth")
const bodyParser = require("body-parser")
const mogoose = require("mongoose")


app.use(cookieParser())

app.use(bodyParser.urlencoded({extended : true}))
    //! application/x-www-form-urlencoded 형식의 데이터를 분석해서 가져올 수 있도록 변환한다
app.use(bodyParser.json())  
    //! application/json 타입으로 되어있는 정보를 분석해서 가져올 수 있도록



//TODO  mongodb+srv://jungeundelilahlee:<password>@reactyoutube.agzwg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mogoose.connect(config.mongoURI, {
    //! 아래를 넣어주는 이유 : 에러나지 않도록 하기 위함이다    
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : false
})
.then(() => console.log("몽고 디비 연결 성공!"))
.catch((err) => console.log(err))



// TODO HELLO WILLY 출력
app.get('/', (req, res) => { //! 이 부분이 브라우저에 보여지게 된다
  res.send('❤️🧡️Hello Willy!❤️🧡️')
})



// TODO 회원가입을 위한 라우트 만들기
//! 회원가입시 필요한 정보들을 client에서 가져오면, 받은 정보들을 DB에 넣어준다
//! models/User.js에서 만든 스키마를 가져온다
app.post("/api/users/register", (req, res) => {
    const user = new User(req.body) //! req.body를 (body-parser를) 통해서 클라에서 보내는 정보를 받는다
    // TODO  user.save 전에 bcrypt를 통해 비번 암호화 (mongoose 를 이용)
    //! models/User.js에서, userSchema 작성 아래에, 
    //! userSchema.pre("save", func()) 를 통해 저장 전, function을 해줌을 의미한다
    //! 해당 function이 마무리된 후, 다시 이 위치로 돌아온다

    user.save((err, userInfo) => {
        if (err) {
            return res.json({ success : false, err })
        } else {
            return res.status(200).json({ success : true, user : user})
        }
    })
})



// TODO 로그인을 위한 라우트 만들기
//! 요청된 이메일이 디비에 있는지 찾는다
//! 요청된 이메일이 디비에 있다면, 비번이 맞는 비번인지 확인한다
//! 비번까지 맞다면 토큰 생성한다
app.post("/api/users/login", (req, res) => {    

    User.findOne({ email : req.body.email }, (err, user) => {

        if (!user) {
            return res.json({
                loginSuccess : false,
                message : "이메일에 해당하는 유저가 존재하지 않습니다"
            })
        }
        //! 요청된 이메일이 디비에 있다면, 비번이 맞는지 확인하는 과정
        //! comparePassword라고 네이밍
        //! 우선 comparePassword 메소드를 models/User 에만들어야 한다
        //! 인자는 2개 (req.body.password 와 cb콜백함수)



        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) 
                return res.json({ 
                    loginSuccess : false,  
                    message : "비밀번호가 올바르지 않습니다. 다시 확인해 주세요."
                })
                
                user.generateToken((err, user) => {
                //! 비밀번호가 일치한다면, 토큰 생성하는 과정
                //! 우선 generateToken 메소드를 models/User 에만들어야 한다
                //! 인자는 1개 (하나는 에러처리 / user)
                if (err) return res.status(400).send(err);
            
                // TODO  토큰을 저장한다 
                //! where? : cookie or local storage 등 여러가지방법 있음
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess : true, userId : user._id })
            })
        
        }) 

    })
})



// TODO auth route 만들기
app.get("/api/users/auth", auth, (req, res) => {

    //! auth 라는 미들웨어를 추가한다
    //! 미들웨어란?
    //! 엔드포인트 ("api/users/auth")에 따라, 즉, 요청을 받은 다음, 콜백 함수를 실행하기 전에 무언가를 해주는 것! - middleware/auth.js 를 생성함
    //! 두번째 인자인 auth는 middleware/auth.js에서 가져왔다

    
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 즉,
    // auth 가 true라는 의미이다
    // 따라서, 이 true 결과를 클라에 전달해 주어야 한다
    res.status(200).json({
        _id : req.user._id,
        isAdmin : req.user.role === 0 ? false : true, // 내가 지정
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
        image : req.user.image
    })

})



// TODO logout route 만들기
app.get("/api/users/logout", auth, (req, res) => {
    //! 하나를 찾아서 업데이트
    //! id를 찾고, token : "" -> 이렇게 삭제
    User.findOneAndUpdate({_id : req.user._id }, { token : "" }, (err, user)=> {
        if (err) return res.json({ success : false, err })
        return res.status(200).send({ success : true })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})