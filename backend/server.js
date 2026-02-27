const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const sequelize = require('./config/db');
const Product = require('./models/Product'); // Modeli buraya çağırıyoruz ki tablo oluşsun
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Yüklenen görselleri statik olarak servis et
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/checkout', checkoutRoutes);

// Database Sync
sequelize
    .sync({ alter: true }) // Tablo yoksa oluşturur, varsa günceller
    .then(() => console.log('Database & Tables Synced!'))
    .catch((err) => console.log('Error: ' + err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));