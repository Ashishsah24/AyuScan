import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Onboarding() {
    const [showForm, setShowForm] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const session = localStorage.getItem("session");
        if (session) navigate("/dashboard");
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password || (!isLogin && (!age || !phone))) {
            setError("Please fill in all required fields.");
            return;
        }

        const payload = {
            email,
            password,
            ...(isLogin ? {} : { age, phone }),
        };

        const endpoint = isLogin ? "/api/login" : "/api/signup";

        try {
            const res = await fetch(`http://localhost:5000${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            if (rememberMe) {
                localStorage.setItem("session", JSON.stringify(data.user));
                localStorage.setItem("token", data.token || ""); // store JWT if available
            }

            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="onboarding-container">
            {!showForm ? (
                <div className="welcome-screen">
                    <h1>Welcome to AyuScan 🌿</h1>
                    <p>Your personalized Ayurvedic wellness assistant</p>
                    <button onClick={() => setShowForm(true)}>Get Started</button>
                </div>
            ) : (
                <div className="form-box">
                    <h2>{isLogin ? "Login" : "Create Account"}</h2>

                    {error && <p className="error-text">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {!isLogin && (
                            <>
                                <input
                                    type="number"
                                    placeholder="Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </>
                        )}

                        <label style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            Remember Me
                        </label>

                        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
                    </form>

                    <p>
                        {isLogin ? "New user?" : "Already have an account?"}{" "}
                        <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Create Account" : "Login"}
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
}

export default Onboarding;
