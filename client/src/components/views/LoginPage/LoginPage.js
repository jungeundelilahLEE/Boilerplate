import React, {useState} from 'react';
import axios from "axios";
// TODO dispatch 이용 (1) 
import { useDispatch } from "react-redux";
//! dispatch를 이용해서 action을 취하는데,,,,,
import { loginUser } from "../../../_actions/user_action"
import { withRouter } from "react-router-dom";

function LoginPage(props) {

    // TODO dispatch 이용 (2)
    const dispatch = useDispatch()

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    // TODO onSubmitHandler 함수를 통해 클라에서 서버로 보낸다
    const onSubmitHandler = (e) => {
        e.preventDefault()
        console.log(Email, Password) // 서버에 보내기 전에 보낼 state 확인

        // TODO body 객체 안에 필요한 state 정보 담기
        let body = {
            email : Email,
            password : Password
        }

        // TODO dispatch 이용 (3)
        //! dispatch(useDispatch)를 이용해서 dispatch에 action을 담아서 보내준다
        //! loginUser는 action으로부터 왔다
        //! 그 action에 type&payload 부분이 있는데, 객체 body가 payload를 담당한다
        dispatch (loginUser(body))
        .then(response => {
            console.log(response, "response 성공적으로 넘어옴")
                // response 는 => {type: "login_user", payload: {…}}
                // payload 는 => loginSuccess: false, message: "이메일에 해당하는 유저가 존재하지 않습니다" ...
            if (response.payload.success) {
                alert("로그인 성공!")
                props.history.push("/")
            } else {
                alert("로그인 실패.......")
                console.log(response.payload.loginSuccess)
            }
        })

        // axios.post("/api/users/login", body) 
        // .then(res => {})
        //     //! axios.get(url, (config))
        //     //! axios.post(url, data, (config))   -->post, put, patch 같음
        //     //! axios.delete(url, (config))
        //     //! axios를 사용하여 post로 보냄 
        //     //! 엔드포인트는 server/index.js에서 만든 루트를 그대로 가져왔다
        //     //! body는 위에서 만든 객체를 넣어주었다
    }

    return (
        <div style = {{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh"
        }}>
            <form 
            style = {{
                display: "flex",
                flexDirection: "column"
            }}  
            onSubmit = {onSubmitHandler}
            >
                <label>Email</label>
                <input type = "email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type = "password" value={Password} onChange={onPasswordHandler}/>
                <br />
                <button type="submit">
                    Log in
                </button>
            </form>
            
        </div>
    );
};

export default withRouter(LoginPage);