
// TODO  인증처리를 한다

const {User} = require("../models/User");

let auth = (req, res, next) => {
    //! 1.클라의 쿠키에서 토큰 가져오기
    let token = req.cookies.x_auth;

    //! 2. 토큰을 복호화하여 유저를 찾기
        // model/User.js로 가서 findByToken을 정의해준다
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth : false, error : true })
        req.token = token; // 요청에 토큰을 넣어줌
        req.user = user; // 마찬가지 user를 넣어줌
        //! req에 토큰과 유저를 넣어주는 이유는,
        //! auth.js에서 바로 토큰과 유저를 불러볼 수 있도록 하기 위함이다
        console.log("user : ", user)

        next() 
        //! 마지막에 next()를 넣는 이유는, 
        //! auth.js에서 auth 미들웨어에서 계속 그 다음 인자로 넘어갈 수 있도록 하기 위함이다 
    })

    //! 답. 유저가 있으면 인증 ok
    //! 답. 유저가 없으면 인증 not ok
}

module.exports = {auth};
//! {auth}를 auth로 기입해서 에러..