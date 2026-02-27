const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Aynı isimle iki kullanıcı olamaz
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true } // Geçerli bir e-posta formatı kontrolü
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'), // Sadece 'user' veya 'admin' olabilir
        defaultValue: 'user'
    }
});

module.exports = User;