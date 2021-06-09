const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
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

const User = mongoose.model("User", UserSchema)
//! 모델(User)은 스키마(UserSchema)를 감싸고 있음 

module.exports = { User }
//! 해당 모델(User)을 다른 곳에서도 사용할 수 있도록 함
