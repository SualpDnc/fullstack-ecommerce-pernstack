const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Kayıt Ol (Register)
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Şifreyi tuzlayıp (salt) hash'liyoruz
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Giriş Yap (Login)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Kullanıcıya 1 saat geçerli bir Token veriyoruz
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, username: user.username, role: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};