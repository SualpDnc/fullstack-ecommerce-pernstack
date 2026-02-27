// Sahte ödeme / sipariş oluşturma
exports.placeOrder = async (req, res) => {
    try {
        const items = req.body.items || [];

        if (!items.length) {
            return res.status(400).json({ message: 'Sepet boş' });
        }

        let total = 0;

        for (const item of items) {
            const quantity = item.quantity || 1;
            const priceNumber = Number(item.price);
            if (!Number.isFinite(priceNumber)) continue;
            total += priceNumber * quantity;
        }

        if (!total) {
            return res.status(400).json({ message: 'Tutar hesaplanamadı' });
        }

        const fakeOrder = {
            id: Date.now(),
            items,
            total,
            createdAt: new Date().toISOString(),
        };

        res.status(201).json({
            message: 'Sipariş başarıyla oluşturuldu (sahte ödeme).',
            order: fakeOrder,
        });
    } catch (error) {
        console.error('Sipariş oluşturma hatası:', error);
        res.status(500).json({ message: 'Sipariş oluşturulurken hata oluştu.' });
    }
};

