import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: 0,
        category: '',
        imageFile: null
    });
    const [products, setProducts] = useState([]);

    const token = localStorage.getItem('token');

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/products');
            setProducts(res.data);
        } catch (error) {
            console.error('Ürünleri çekerken hata:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('description', product.description);
            formData.append('price', product.price);
            formData.append('stock', product.stock);
            formData.append('category', product.category);
            if (product.imageFile) {
                formData.append('image', product.imageFile);
            }

            await axios.post('http://localhost:5000/api/products', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Ürün Eklendi!");
            setProduct({ name: '', description: '', price: '', stock: 0, category: '', imageFile: null });
            e.target.reset();
            fetchProducts();
        } catch (error) {
            const status = error.response?.status;
            const message = error.response?.data?.message || 'Bilinmeyen hata';

            if (status === 403) {
                alert("Hata: Admin değilsin!");
            } else if (status === 401) {
                alert("Hata: Giriş yapman gerekiyor (401).");
            } else {
                alert("Hata: " + message);
                console.error('Ürün ekleme hatası:', error.response || error);
            }
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bu ürünü silmek istediğine emin misin?')) return;

        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(products.filter(p => p.id !== id));
        } catch (error) {
            console.error('Ürün silme hatası:', error.response || error);
            alert('Ürün silinirken hata oluştu.');
        }
    };

    return (
        <div className="admin-layout">
            <div className="admin-card">
                <h1>Ürün Ekle / Güncelle</h1>
                <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
                    <input
                        placeholder="Ürün Adı"
                        value={product.name}
                        onChange={e => setProduct({ ...product, name: e.target.value })}
                        className="auth-form-input"
                    />
                    <input
                        placeholder="Fiyat"
                        type="number"
                        step="0.01"
                        value={product.price}
                        onChange={e => setProduct({ ...product, price: e.target.value })}
                        className="auth-form-input"
                    />
                    <input
                        placeholder="Stok"
                        type="number"
                        value={product.stock}
                        onChange={e => setProduct({ ...product, stock: e.target.value })}
                        className="auth-form-input"
                    />
                    <input
                        placeholder="Kategori"
                        value={product.category}
                        onChange={e => setProduct({ ...product, category: e.target.value })}
                        className="auth-form-input"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setProduct({ ...product, imageFile: e.target.files[0] || null })}
                        className="auth-form-input"
                    />
                    <textarea
                        placeholder="Açıklama"
                        value={product.description}
                        onChange={e => setProduct({ ...product, description: e.target.value })}
                        className="auth-form-input"
                    />
                    <button type="submit" className="primary-button">Ürünü Kaydet</button>
                </form>
            </div>

            <div className="admin-card">
                <h2>Mevcut Ürünler</h2>
                <div className="admin-product-list">
                    {products.map(p => (
                        <div key={p.id} className="admin-product-card">
                            <h3>{p.name}</h3>
                            <p>{p.category}</p>
                            <p><strong>Fiyat:</strong> {p.price} TL</p>
                            <button
                                onClick={() => handleDelete(p.id)}
                                className="button-danger-small"
                            >
                                Sil
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;