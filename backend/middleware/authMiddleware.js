const jwt = require('jsonwebtoken');

// 1. Standart Giriş Kontrolü (Herhangi bir kullanıcı olabilir)
const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer TOKEN" formatından ayırıyoruz

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Kullanıcı bilgilerini (id ve role) isteğe ekliyoruz
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

// 2. Admin Kontrolü (Sadece yetkili personel)
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as an admin" });
    }
};

module.exports = { protect, admin };