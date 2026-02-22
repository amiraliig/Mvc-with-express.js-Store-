# MVC Shop (Node.js + Express + Mongoose)

Educational e-commerce project built with MVC architecture.
It includes authentication, product CRUD for admins, cart, and order flow with server-rendered EJS pages.

## Stack
- Node.js (CommonJS)
- Express 5
- MongoDB + Mongoose
- EJS templates
- `express-session` + `connect-mongodb-session`
- `csurf` + `connect-flash`
- `bcrypt`
- `resend` (password reset emails)

## Features
- MVC structure (`models`, `views`, `controllers`, `routes`)
- Signup / login / logout
- Password reset with token
- Product list + product details
- Cart add/remove
- Order creation from cart
- Admin-only product management (add/edit/delete)

## Prerequisites
- Node.js 18+ recommended
- MongoDB running locally on `localhost:27017`
- npm

## Quick Start
1. Install dependencies:
```bash
npm install
```

2. Ensure MongoDB user expected by current code exists:
```javascript
// run in mongosh
use admin
db.createUser({
  user: "admin",
  pwd: "admin123",
  roles: [{ role: "root", db: "admin" }]
})
```
If this user already exists, skip this step.

3. Start the app:
```bash
npm start
```

4. Open:
`http://localhost:3000`

## Seed Behavior
- On first run (when `users` collection is empty), app creates one user:
  - email: `test@gmail.com`
  - password: `123`
  - role: `user`

To enable admin pages, promote this user manually:
```javascript
// run in mongosh
use test
db.users.updateOne(
  { email: "test@gmail.com" },
  { $set: { role: "admin" } }
)
```

## Main Routes
- `GET /`, `GET /products`, `GET /products/:id`
- `GET /cart`, `POST /cart`, `POST /cart-delete-item`, `POST /create-order`
- `GET /orders`
- `GET /signup`, `POST /signup`
- `GET /login`, `POST /login`, `POST /logout`
- `GET /reset-password`, `POST /reset`
- `GET /new-password/:token`, `POST /set-new-password`
- `GET /admin/add-product`, `POST /admin/add-product`
- `GET /admin/products`
- `GET /admin/editProduct/:productId`, `POST /admin/editProduct/:productId`
- `POST /admin/deleteProduct/:productId`

## Project Structure
```
mvc/
├── app.js
├── controllers/
├── middleware/
├── models/
├── routes/
├── views/
│   ├── admin/
│   ├── auth/
│   ├── shop/
│   └── includes/
├── public/
│   └── css/
├── utils/
├── data/
└── README.md
```

## Scripts
- `npm start` -> runs `nodemon --ignore data/ app.js`
- `npm test` -> placeholder (no real tests yet)

## Current Limitations
- Secrets are hardcoded in source (`Mongo URI`, session secret, Resend API key).
- No automated tests yet.
- Some dependencies are unused in current code (`sequelize`, `mysql2`, `node-mailjet`).

## License
ISC
