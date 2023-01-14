import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () => {
        const userString = sessionStorage.getItem('username');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    const navigate = useNavigate();

    const saveToken = (user, token, socket) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('username', JSON.stringify(user));
        sessionStorage.setItem('socket', JSON.stringify(socket));
        setToken(token);
        setUser(user);
        navigate('/');
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/Login');
    }

    const http = axios.create({
        baseURL: "http://localhost:5000",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return {
        setToken: saveToken,
        token,
        user,
        getToken,
        http,
        logout
    }

}

export default Auth;