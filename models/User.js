const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10; 
//! saltRounds는 자릿수
//! salt 생성 후 -> salt를 이용해서 비번 암호화
const jwt = require('jsonwebtoken');



const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50,
    },
    email : {
        type : String,
        trim : true, //! string 입력시, 띄어쓰기를 없애주는 역할
        unique : 1, //! 같은 이메일은 사용하지 못하도록
    },
    password : {
        type : String,
        minlength : 5,
    },
    lastname : {
        type : String,
        maxlength : 50,
    },
    role : { //! admin과 user 구분용
        type : Number, //! admin : 0 , user : 1
        default : 0
    },
    image : String,
    token : { //! 유효성 검사 및 관리용
        type : String,
    },
    tokenExp : { //! token 사용기간
        type : Number,
    }

})
// TODO 비번 암호화
userSchema.pre("save", function (next) {

    var user = this; 
    //! this는 위의 UserSchema 의 정보를 가리킨다

    if (user.isModified("password")) {
    //! 다른 항목은 제외하고 password만 변경될 때, 작동할 수 있도록

        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) {
                return next(err)
            } else {
                bcrypt.hash(user.password, salt, function(err, hash) {
                //! user.password는 위에서 입력되는 비밀번호
                //! salt는 위의 두번째 인자에서 생성한 salt
                //! hash는 이제 암호화된 비밀번호
                    if (err) {
                        return next(err)
                    } else {
                        user.password = hash
                        //! err가 없으면, hash화 된 비번으로 바꿔준다
                        next()
                    }
                })
            }
        });
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
    //! plainPassword 123456789 
    //! 암호화된비번 $2b$10$.T.qFdVf4JbFM7Kfy4sRseFQq/uvVvK.cJlOkPm8GQr7YktYzet9e
    //! 위의 두 비번이 같은지 체크한다
    //! 어떻게? 
    //! 암호화된비번을 복호화할 수는 없다
    //! 따라서 plainPassword를 암호화해서 두 개의 동일여부를 체크한다
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err), 
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {
    //! jwt를 이용해서 토큰 생성한다
    var user = this;
    console.log("user._id", user._id)
    var token = jwt.sign(user._id.toHexString(), "secretToken")
    //! _id는 몽고디비에서 query results에 보면 _id를 확인할 수 있다
    //! "secretToken"은 임의로 지정하면 된다
    //! it means 
    //! user._id + "secretToken" = token 이런식으로 토큰이 생성되는 것인데,
    //! 나중에 토큰을 해석할 때는 
    //! "secretToken" 를 넣으면 => user._id가 나온다
    //! 이 과정에서 유저가 누군지를 알 수 있게 되는 방식이다
    
    //! 위에서 만든 토큰을 스키마에 넣어준다
    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err);
            cb(null, user)
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;
    //! 토큰을 decode
    //! jwt 공홈 참고 https://www.npmjs.com/package/jsonwebtoken
    // jwt.verify(token, 'shhhhh', function(err, decoded) {
    //     console.log(decoded.foo) // bar
    // });
    //! 토큰을 만들 때, user._id + "??" = token 이렇게 만들었다 
    //! 여기서 ?? 은 바로 "secretToken"
    jwt.verify(token, "secretToken", function (err, decoded) {
        console.log(decoded)
        // 여기서 decoded 된 것은 다시 user._id 가 된다
        // TODO  유저 아이디를 이용해서 유저를 찾은 뒤, 
        // TODO  클라에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인하기
        user.findOne({ "_id" : decoded, "token" : token }, function (err, user) {
            if (err) return cb(err);
                cb(null, user)
        })

    }) 

}

const User = mongoose.model("User", userSchema)
//! 모델(User)은 스키마(UserSchema)를 감싸고 있음 

module.exports = { User }
//! 해당 모델(User)을 다른 곳에서도 사용할 수 있도록 함
