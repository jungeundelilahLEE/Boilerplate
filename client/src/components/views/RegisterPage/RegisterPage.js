import React, {useState} from 'react';
import { useDispatch } from "react-redux";
//! dispatch를 이용해서 action을 취하는데,,,,,
import { registerUser } from "../../../_actions/user_action"
import { withRouter } from "react-router-dom";


function RegisterPage(props) {

    const dispatch = useDispatch()

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    }
    const onNameHandler = (e) => {
        setName(e.currentTarget.value)
    }
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }
    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        if (Password !== ConfirmPassword) {
            return alert("비밀번호를 다시 확인해주세요!")
        }

        let body = {
            email : Email,
            name : Name,
            password : Password,
            confirmPassword : ConfirmPassword
        }

        dispatch (registerUser(body))
        .then(response => {
            console.log(response, "response 성공적으로 넘어옴")
            if (response.payload.success) {
                props.history.push("/login")
            } else {
                console.log(response.payload)
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
            <form 
            style = {{
                display: "flex",
                flexDirection: "column"
            }}  
            onSubmit = {onSubmitHandler}
            >
                <label>Email</label>
                <input type = "email" value={Email} onChange={onEmailHandler}/>
                
                <label>Name</label>
                <input type = "text" value={Name} onChange={onNameHandler}/>
                
                <label>Password</label>
                <input type = "password" value={Password} onChange={onPasswordHandler}/>
                
                <label>ConfirmPassword</label>
                <input type = "password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                
                <br />
                
                <button type="submit">
                    Sign up
                </button>
            </form>
            
        </div>
    );
};

export default withRouter(RegisterPage);