
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Home({ socket }) {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    const submit = (e) => {
        socket.emit('nickname', username);
        e.preventDefault();
        navigate('/chat');
        localStorage.setItem('username', username);
    }


    return (
        <form className="home__container" onSubmit={submit}>
            <h2 className="home__header">Sign in to Open Chat</h2>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                name="username"
                id="username"
                className="username__input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button className="home__cta">SIGN IN</button>
        </form>
    );
}
export default Home;