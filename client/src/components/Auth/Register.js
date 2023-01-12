import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import Auth from './Auth';

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [alert, setAlert] = useState('');
    const navigate = useNavigate();
    //const { http, saveToken } = Auth();


    useEffect(() => {
        setAlert(document.getElementById('alert'))
    }, []);

    const register = async (e) => {

        console.log("submit");
        e.preventDefault();

        if (password !== passwordConfirmation) {
            alert.hidden = false;
        } else {
            await axios.post(process.env.REACT_APP_BASE_URL + `auth/register`, {
                username: username,
                password: password
            }).then(response => {
                console.log(response)
                console.log('register ok!');
                navigate('/');
            }).catch(err => {
                console.log("error");
                console.log(err);
            })

        }





    }

    return (
        <>
            <form className="login__container" onSubmit={register}>

                <div className="card">
                    <div className="card-body">

                        <h2 className="login__header">SIGN UP</h2>
                        <div className="alert alert-danger" id="alert" role="alert" hidden>
                            passwords did not match
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
                        <input
                            type="password"
                            name="passwordConfirmation"
                            id="passwordConfirmation"
                            placeholder='Confirm your password'
                            className=" form-control"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                        <button className="login__cta">SIGN UP</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Register;