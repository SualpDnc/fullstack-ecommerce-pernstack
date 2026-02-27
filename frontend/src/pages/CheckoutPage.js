import React, { useState } from 'react';
import axios from 'axios';

const CheckoutPage = ({ cart, onOrderComplete }) => {
  const [loading, setLoading] = useState(false);

  if (!cart.length) {
    return <p>Sepetiniz boş.</p>;
  }

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleFakePayment = async () => {
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/checkout/place-order', {
        items: cart.map((item) => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity,
        })),
      });
      alert('Siparişiniz başarıyla oluşturuldu! (sahte ödeme)');
      onOrderComplete();
    } catch (error) {
      console.error('Sipariş hatası:', error.response || error);
      const msg = error.response?.data?.message || 'Sipariş oluşturulurken hata oluştu.';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Ödeme Özeti</h2>
      <p className="home-subtitle" style={{ marginBottom: '1rem' }}>
        Bu demo ortamında gerçek ödeme alınmıyor, sadece sahte bir sipariş
        oluşturuluyor.
      </p>
      <ul className="cart-items">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <div>
              <div>{item.name}</div>
              <small>
                {item.price} TL x {item.quantity}
              </small>
            </div>
          </li>
        ))}
      </ul>
      <p>
        <strong>Toplam:</strong> {total.toFixed(2)} TL
      </p>
      <button
        className="primary-button"
        style={{ marginTop: '16px' }}
        onClick={handleFakePayment}
        disabled={loading}
      >
        {loading ? 'Sipariş oluşturuluyor...' : 'Siparişi Onayla'}
      </button>
    </div>
  );
};

export default CheckoutPage;

