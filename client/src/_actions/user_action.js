import axios from "axios"
import {LOGIN_USER, REGISTER_USER, AUTH_USER} from "./types"

//! export default하지않고 export만해서 바로 LoginPage.js에서 불러다 사용
//! 하는 점에 유의할 것..

//! 엔드포인트는 server/index.js에서 만든 루트를 그대로 가져왔다
//! body는 위에서 만든 객체를 넣어주었다

// TODO return을 시켜서 reducer로 보내주기
//! 왜냐하면,
//! 이전 state와, action을 조합해서, 다음 state를 만들어 주어야 하기 때문
//! type은 취할 액션, payload는 보내줄 응답이라고 생각하면 된다.

export function loginUser(dataToSummit) {
    const request = axios.post("/api/users/login", dataToSummit) 
        .then( res => res.data )
            
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSummit) {
    const request = axios.post("/api/users/register", dataToSummit) 
        .then( res => res.data )
            
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth(){ // get method는 body부분이 필요없다.

    const request = axios.get('/api/users/auth')
        .then(response => response.data)


    return { 
        type: AUTH_USER,
        payload: request
    }
}