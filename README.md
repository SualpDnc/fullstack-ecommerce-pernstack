# dncbabaexpress – PERN E‑Commerce Uygulaması

Modern bir **PostgreSQL – Express – React – Node.js (PERN)** e‑ticaret demosu.  
Kullanıcılar ürünleri görüntüleyebilir, sepete ekleyebilir ve sahte ödeme ile sipariş akışını tamamlayabilir; admin kullanıcılar ise ürün ekleyip silebilir.

## Özellikler

- **Kimlik Doğrulama**
  - Kayıt ol / giriş yap (JWT tabanlı auth)
  - `user` ve `admin` rol desteği
  - Sadece adminler için Admin Panel ve ürün yönetimi

- **Ürün Yönetimi (Admin)**
  - Yeni ürün ekleme (isim, açıklama, fiyat, stok, kategori)
  - Bilgisayardan görsel yükleme (multer ile `uploads/`)
  - Mevcut ürünleri listeleme ve silme

- **Mağaza (Kullanıcı)**
  - Ürün listesi, kart görünümü, fiyat ve açıklama
  - Normal kullanıcılar için **Sepete Ekle** butonu
  - Admin girişi yapıldığında “Sepete Ekle” gizlenir

- **Sepet & Sahte Ödeme**
  - Sepete ürün ekleme, adet hesabı ve toplam tutar
  - Sepetten ürün kaldırma ve sepeti boşaltma
  - “Siparişi Onayla” ile backend’e sahte sipariş kaydı (gerçek ödeme yok)

## Teknolojiler

- **Backend**
  - Node.js, Express
  - Sequelize ORM + PostgreSQL
  - JWT ile kimlik doğrulama (`jsonwebtoken`, `bcryptjs`)
  - Dosya yükleme için `multer`

- **Frontend**
  - React (CRA)
  - React Router (`react-router-dom`)
  - HTTP istekleri için `axios`

## Projeyi Çalıştırma

### 1. Ortam Değişkenleri

`backend/.env`:

```env
PORT=5000
DB_NAME=ecommerce_db
DB_USER=postgres
DB_PASSWORD=YOUR_DB_PASSWORD
DB_HOST=localhost
JWT_SECRET=supersecretkey
```

### 2. Backend

```bash
cd backend
npm install
npx sequelize-cli db:migrate   # tabloları oluştur
npm start
```

Backend şu adreste çalışır: `http://localhost:5000`

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

Frontend şu adreste çalışır: `http://localhost:3000`

## Admin Rolü Ayarlama

- Normal bir kullanıcı olarak kayıt ol.
- PostgreSQL üzerinde `Users` tablosunda ilgili kullanıcının `role` alanını `admin` yap:

```sql
UPDATE "Users"
SET "role" = 'admin'
WHERE "email" = 'seninmailin@example.com';
```

- Bu kullanıcıyla tekrar giriş yaptığında:
  - Navbar’da **Admin Paneli** görünür.
  - Admin panelden ürün ekleyip silebilirsin.

## Sahte Ödeme Akışı

- Kullanıcı olarak:
  - Ürünleri sepetine ekle.
  - Navbar’dan **Sepet** sayfasına git.
  - **Ödeme Yap** → **Siparişi Onayla** adımlarını takip et.
- Backend `/api/checkout/place-order` endpoint’i, gönderilen sepet üzerinden toplamı hesaplar ve **gerçek ödeme almadan** sahte bir sipariş cevabı döner.

## Projeyi GitHub’a Ekleme (Önerilen Akış)

1. **Git repo başlat**

```bash
cd ecommerce-pern
git init
```

2. **Durumu kontrol et**

```bash
git status
```

3. **İlk commit**

```bash
git add .
git commit -m "Initial commit: dncbabaexpress PERN ecommerce app"
```

4. **GitHub’da boş bir repo oluştur**

- GitHub profilinde yeni bir repo aç (örnek isim: `dncbabaexpress-ecommerce`).
- Remote URL yaklaşık şöyle olur:
  - `https://github.com/<kullanici-adi>/dncbabaexpress-ecommerce.git`

5. **Remote ekle ve push et**

```bash
git branch -M main
git remote add origin https://github.com/<kullanici-adi>/dncbabaexpress-ecommerce.git
git push -u origin main
```

Bu adımlardan sonra proje GitHub profilinde profesyonel bir şekilde görünür; README, klasör yapısı ve `.gitignore` ile birlikte temiz bir izlenim verir.

