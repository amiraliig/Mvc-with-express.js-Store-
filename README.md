# Node.js MVC Shop (MongoDB + Mongoose)

یک پروژه فروشگاه ساده با معماری MVC با استفاده از Node.js، Express، Mongoose و EJS.

---

## ویژگی‌ها
- معماری MVC (مدل، ویو، کنترلر)
- مدیریت محصولات (افزودن، ویرایش، حذف، مشاهده)
- نمایش جزئیات هر محصول
- سبد خرید (در صورت پیاده‌سازی)
- رندر صفحات با EJS و partialها
- استفاده از MongoDB و Mongoose برای مدیریت داده‌ها
- مدیریت session با express-session

---

## پیش‌نیازها
- Node.js (نسخه ۱۴ یا بالاتر)
- MongoDB (در حال اجرا روی localhost یا هر سرور دلخواه)
- npm

---

## نصب و راه‌اندازی

1. مخزن را کلون کنید:
    ```bash
    git clone <repo-url>
    cd mvc
    ```
2. پکیج‌ها را نصب کنید:
    ```bash
    npm install
    ```
3. MongoDB را اجرا کنید (پیش‌فرض روی پورت 27017):
    ```bash
    mongod
    ```
4. اطلاعات اتصال به دیتابیس در app.js به صورت زیر است:
    ```js
    mongoose.connect('mongodb://localhost:27017/shop')
    ```
    در صورت نیاز، اطلاعات اتصال را تغییر دهید.
5. سرور را اجرا کنید:
    ```bash
    npm start
    ```
    یا
    ```bash
    node app.js
    ```
6. پروژه روی [http://localhost:3000](http://localhost:3000) در دسترس است.

---

## ساختار پوشه‌ها

```
mvc/
├── app.js
├── controllers/
│   ├── admin.js
│   ├── shop.js
│   └── error.js
├── models/
│   └── product.js
├── routes/
│   ├── admin.js
│   └── shop.js
├── views/
│   ├── admin/
│   ├── shop/
│   └── includes/
├── public/
│   └── css/
├── utils/
│   └── database.js
├── package.json
└── README.md
```

---

## نکات مهم
- مدل Product و سایر مدل‌ها با Mongoose تعریف شده‌اند.
- اگر قصد استفاده از Sharding یا Replica Set دارید، فقط کافیست connection string را به آدرس mongos تغییر دهید.
- برای توسعه بیشتر (مثل احراز هویت، مدیریت سفارشات و ...) می‌توانید کنترلرها و مدل‌های جدید اضافه کنید.

---

## مشارکت
پیشنهادات و Pull Requestها خوش‌آمدند!

## لایسنس
MIT

