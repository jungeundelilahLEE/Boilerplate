import React, {useEffect} from 'react';
import axios from "axios";
import { withRouter } from 'react-router-dom';


function LandingPage (props) {

    // TODO 랜딩페이지 테스트용 -> go to server/index.js

    useEffect(() => {
        axios.get("/api/hello")
        //! get req를 서버에 보낸다.
        //! 엔드포인트는 "/api/hello"
        .then(res =>{
            console.log(res , "res")
            console.log(res.data, "res.data")
        })
        //! 그 다음에 서버에서 돌아오는 res를 콘솔에서 확인한다.
    }, [])

    const onClickHandler = () => {
        axios.get("/api/users/logout")
        .then(res => {
            console.log(res.data)
            if(res.data.success) {
                props.history.push("/login")
            } else {
                alert("로그아웃 도중 에러가 발견되었습니다. 다시 시도해주세요.")
            }
        })
    }

    return (
        <div style = {{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh"
        }}>
            <h2>Let's start!</h2>
            <button onClick = {onClickHandler}>Log out</button>
        </div>
    )
};

export default withRouter(LandingPage);