const express = require('express') 
const app = express() //! 새로운 익스프레스 앱 만들기
const port = 4000 //! 포트는 내가 지정한다

//TODO  mongodb+srv://jungeundelilahlee:<password>@reactyoutube.agzwg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const mogoose = require("mongoose")
mogoose.connect("mongodb+srv://jungeundelilahlee:wpfaksk10!)@reactyoutube.agzwg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    //! 아래를 넣어주는 이유 : 에러나지 않도록 하기 위함이다    
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : false
})
.then(() => console.log("몽고 디비 연결 성공!"))
.catch((err) => console.log(err))

app.get('/hello', (req, res) => { //! 이 부분이 브라우저에 보여지게 된다
  res.send('Hello Willy!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})