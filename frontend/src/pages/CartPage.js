import React from 'react';
import { Link } from 'react-router-dom';

const CartPage = ({ cart, onRemove, onClear }) => {
  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  if (!cart.length) {
    return (
      <div className="cart-page">
        <h2>Sepetiniz boş</h2>
        <p className="home-subtitle">Ürün eklemek için mağazaya göz atın.</p>
        <Link to="/" className="nav-link">Alışverişe devam et</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>Sepetiniz</h2>
        <p className="home-subtitle">Siparişinizi tamamlamadan önce kontrol edin.</p>
      </div>
      <ul className="cart-items">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <div>
              <div>{item.name}</div>
              <small>{item.price} TL x {item.quantity}</small>
            </div>
            <button onClick={() => onRemove(item.id)} className="button-danger">
              Kaldır
            </button>
          </li>
        ))}
      </ul>
      <p><strong>Toplam:</strong> {total.toFixed(2)} TL</p>
      <div className="cart-actions">
        <button onClick={onClear} className="button-secondary">Sepeti Boşalt</button>
        <Link to="/checkout" className="nav-link">Ödeme Yap</Link>
      </div>
    </div>
  );
};

export default CartPage;

