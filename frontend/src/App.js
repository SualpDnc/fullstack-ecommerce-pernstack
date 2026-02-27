import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isAuthenticated = !!token;

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-section navbar-left">
            <Link to="/" className="nav-link">Ana Sayfa</Link>
            <Link to="/cart" className="nav-link">
              Sepet ({cartCount})
            </Link>
          </div>
          <div className="navbar-section navbar-center">
            dncbabaexpress
          </div>
          <div className="navbar-section navbar-right">
            {!isAuthenticated && (
              <>
                <Link to="/login" className="nav-link">Giriş Yap</Link>
                <Link to="/register" className="nav-link">Kayıt Ol</Link>
              </>
            )}
            {isAuthenticated && role === 'admin' && (
              <Link to="/admin" className="nav-link">Admin Paneli</Link>
            )}
            {isAuthenticated && (
              <button onClick={handleLogout} className="logout-button">Çıkış Yap</button>
            )}
          </div>
        </nav>

        <div className="page-container">
          <Routes>
            <Route
              path="/"
              element={<HomePage onAddToCart={handleAddToCart} />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  onRemove={handleRemoveFromCart}
                  onClear={handleClearCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <CheckoutPage
                  cart={cart}
                  onOrderComplete={handleClearCart}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;