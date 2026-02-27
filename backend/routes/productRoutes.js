const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const { getProducts, createProduct, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Multer konfigürasyonu
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage });

// http://localhost:5000/api/products
router.get('/', getProducts);
// Sadece giriş yapmış (ve admin) kullanıcı ürün ekleyip silebilsin
router.post('/', protect, admin, upload.single('image'), createProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;