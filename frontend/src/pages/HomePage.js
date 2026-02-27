import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data);
            } catch (error) {
                console.error("Ürünler çekilemedi:", error);
            }
        };
        fetchProducts();

        const role = localStorage.getItem('role');
        setIsAdmin(role === 'admin');
    }, []);

    return (
        <div>
            <div className="home-header">
                <div>
                    <h1 className="home-title">Mağaza Ürünleri</h1>
                    <p className="home-subtitle">En yeni ürünleri keşfet ve sepetine ekle.</p>
                </div>
            </div>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        {product.imageUrl && (
                            <img
                                src={`http://localhost:5000${product.imageUrl}`}
                                alt={product.name}
                            />
                        )}
                        <div className="product-card-body">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">{product.price} TL</p>
                            {!isAdmin && (
                                <button
                                    className="primary-button"
                                    onClick={() => onAddToCart(product)}
                                >
                                    Sepete Ekle
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
