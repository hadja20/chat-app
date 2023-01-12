import axios from 'axios';
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from './Auth';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setToken } = Auth();


    const submit = async (e) => {

        console.log("submit");
        e.preventDefault();

        await axios.post(process.env.REACT_APP_BASE_URL + `auth/login`, {
            username: username,
            password: password
        }).then(res => {
            console.log('login ok!');
            console.log(res.data)
            setToken(res.data.user, res.data.access_token);
            navigate('/chat');
        }).catch(err => {
            console.log("error");
            console.log(err);
        })


    }

    return (
        <>
            <form className="login__container" onSubmit={submit}>

                <div className="card">
                    <div className="card-body">

                        <h2 className="login__header">SIGN IN</h2>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder='Enter your username'
                            className=" form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Enter your password'
                            className=" form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="login__cta">LOGIN</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Login;