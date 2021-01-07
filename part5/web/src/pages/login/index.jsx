import React, { useEffect, useState } from 'react';
import loginService from '../../services/login';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const logggedUserJson = window.localStorage.getItem('loggedUser');
        if (logggedUserJson) {
            const user = JSON.parse(logggedUserJson);
            setUser(user);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log('logging in with: ', { username, password });
        try {
            const user = await loginService.login({
                username,
                password,
            });
            localStorage.setItem('loggedUser', JSON.stringify(user));
            localStorage.setItem('username', user.username);
            localStorage.setItem('name', user.name);
            localStorage.setItem('token', user.token);
            setUser(user);
            setUsername('');
            setPassword('');
            console.log('login success');
        } catch (error) {
            console.log(error);
        }
    };
    const handleLogout = () => {
        setUser(null);
        window.localStorage.clear();
    };

    const loginFrom = (
        <form onSubmit={handleLogin}>
            <div className="user-name">
                <label>username</label>
                <input
                    type="text"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div className="password">
                <label>password</label>
                <input
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
    const userInfo = (
        <div>
            Welcome, {user?.username} ~{' '}
            <button onClick={handleLogout}>logout</button>
        </div>
    );

    return (
        <>
            {user === null && loginFrom}
            {user !== null && userInfo}
        </>
    );
};

export default Login;
