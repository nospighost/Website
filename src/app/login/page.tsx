"use client";

import { useState } from "react";
import "./login.css";

export default function LoginRegisterPage() {
    const [isLogin, setIsLogin] = useState(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [identifier, setIdentifier] = useState("");

    const [message, setMessage] = useState("");

    // @ts-ignore
    async function handleLogin(e) {
        e.preventDefault();

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ identifier, password })
        });

        const text = await res.text();
        setMessage(text);


        setEmail("");
        setPassword("");
        setIdentifier("");
        setUsername("");
        setMessage("Erfolgreich eingeloggt!");

        if (res.ok) {
            window.location.href = "/";
        }
    }

    // @ts-ignore
    async function handleRegister(e) {
        e.preventDefault();

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const text = await res.text();
        setMessage(text);

        if (res.ok) {
            setIsLogin(true);
        }
    }

    return (
        <div className="auth-page">
            <div className="form-wrapper">
                <div className="toggle-buttons">
                    <button
                        className={isLogin ? "active" : ""}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={!isLogin ? "active" : ""}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                </div>

                {message && <p className="message">{message}</p>}

                <div className="forms-container">
                    <div className={`forms-slider ${isLogin ? "login-active" : "register-active"}`}>
                        {/* LOGIN */}
                        <form className="auth-form login-form" onSubmit={handleLogin}>
                            <h1>Login</h1>
                            <input
                                type="text"
                                placeholder="Username oder Email"
                                value={identifier}
                                onChange={e => setIdentifier(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Login</button>
                        </form>

                        <form className="auth-form register-form" onSubmit={handleRegister}>
                            <h1>Register</h1>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
