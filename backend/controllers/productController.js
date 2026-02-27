const Product = require('../models/Product');

// 1. Tüm Ürünleri Getir (GET)
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Yeni Ürün Ekle (POST)
exports.createProduct = async (req, res) => {
    try {
        const body = req.body || {};
        const { name, description, price, stock, category } = body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: 'Zorunlu alanlar eksik (name, description, price, category).' });
        }

        const normalizedStock =
            stock === undefined || stock === null || stock === '' ? 0 : stock;

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const newProduct = await Product.create({
            name,
            description,
            price,
            stock: normalizedStock,
            category,
            imageUrl
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Ürün oluşturma hatası:', error);
        res.status(500).json({ message: error.message });
    }
};

// 3. Ürün Sil (DELETE)
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Ürün bulunamadı' });
        }

        await product.destroy();
        res.status(200).json({ message: 'Ürün silindi' });
    } catch (error) {
        console.error('Ürün silme hatası:', error);
        res.status(500).json({ message: error.message });
    }
};