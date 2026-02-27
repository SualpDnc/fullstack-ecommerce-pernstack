import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            
            // Backend'den gelen Token ve bilgileri tarayıcıya kaydet
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('username', res.data.username);

            alert("Giriş Başarılı!");
            // Uygulamayı baştan yükleyelim ki App localStorage'dan token'ı okuyup
            // navbar'da Çıkış Yap / Admin Paneli butonlarını göstersin
            window.location.href = '/';
        } catch (error) {
            alert("Giriş Başarısız: " + error.response.data.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Giriş Yap</h2>
            <form className="auth-form" onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="E-posta"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">
                    Giriş
                </button>
            </form>
        </div>
    );
};

export default LoginPage;

