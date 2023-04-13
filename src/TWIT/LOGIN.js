import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
function Login() {
    const username = useRef();
    const password = useRef();
    const Navigate = useNavigate();
    const getname = localStorage.getItem("Name");
    const getpassword = localStorage.getItem("Userpassword");
    const handleSubmit = (Event) => {
        Event.preventDefault();
        console.log(username.current.value);
        console.log(password.current.value);
        if (username.current.value && password.current.value) {
            console.log("After pass " + username.current.value);
            console.log("After pass " + password.current.value);
            axios.post('http://172.105.58.224:3582/auth/login',
                {
                    username: username.current.value,
                    password: password.current.value
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            ).then((response) => {
                console.log('Response ' + response);
                localStorage.setItem("Name", username.current.value);
                localStorage.setItem("Userpassword",password.current.value);
                Navigate("alltwit");
            }).catch((err) => {
                console.log('Error in login ' + (err));
                 alert("Invalid username or password")
            })
        }else{
            Navigate("error");
        }
    }
    return (
        <>
            <div id='Container'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label for='username'>UserName</label>
                        <input type='text' placeholder="Enter username"
                            name="email" ref={username}></input>
                    </div>
                    <div>
                        <label for='Password'>Password</label>
                        <input type={"password"} placeholder="Enter password"
                            name="password" ref={password}></input>
                    </div>
                    <div><button type="submit" className='Submit'>Submit</button></div>
                </form>
            </div>
        </>
    )
}
export default Login;