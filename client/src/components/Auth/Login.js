import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from './Auth';
import Logo from '../../assets/logo123.png';

const Login = ({ socket }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState('');
    const navigate = useNavigate();
    const { setToken } = Auth();

    useEffect(() => {
        setAlert(document.getElementById('alert'))
    }, []);

    const submit = async (e) => {

        e.preventDefault();

        await axios.post(process.env.REACT_APP_BASE_URL + `auth/login`, {
            username: username,
            password: password
        }).then(res => {
            const user = res.data.user;
            setToken(res.data.user, res.data.access_token, socket.id);
            socket.emit('join server', user);
            navigate('/chat');
        }).catch(err => {
            alert.hidden = false;
            alert.innerHTML = err.response.data.message;
        });
    }

    return (
        <>
            <form className="login__container" onSubmit={submit}>

                <img src={Logo} style={{ height: 300, width: 300 }} alt="logo"></img>

                <div className="card">
                    <div className="card-body">
                        <h2 className="login__header">SIGN IN</h2>
                        <div className="alert alert-danger" id="alert" role="alert" hidden>
                        </div>
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

                        <a href='/register'> Sign up here</a>
                        <button className="login__cta">LOGIN</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Login;

