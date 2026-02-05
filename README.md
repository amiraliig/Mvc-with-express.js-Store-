# 🛒 MVC Shop - Node.js & Express

A simple shop application built with **Node.js**, **Express**, and **EJS** using the **MVC architecture**.  
This project demonstrates product management (CRUD), file-based storage, and a shopping cart system.

---

## 🚀 Features

- MVC architecture (Models, Views, Controllers)
- File-based data storage (JSON)
- Add / Edit / Delete products
- Product listing and product details page
- Shopping cart with quantity support
- Cart count displayed in navbar
- EJS templating with reusable partials (includes)
- Express middleware usage

---

## 🧱 Tech Stack

- Node.js
- Express.js
- EJS
- File System (fs)
- body-parser
- UUID (crypto)

---

## 📂 Project Structure

mvc/
│
├── app.js
├── controllers/
│ ├── admin.js
│ ├── shop.js
│ └── error.js
│
├── models/
│ ├── product.js
│ └── cart.js
│
├── routes/
│ ├── admin.js
│ └── shop.js
│
├── views/
│ ├── admin/
│ ├── shop/
│ └── includes/
│
├── public/
│ ├── css/
│ └── images/
│
├── data/
│ ├── products.json
│ └── cart.json
│
└── package.json

yaml
Copy code

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd mvc
Install dependencies:

bash
Copy code
npm install
Run the project:

bash
Copy code
npm start
or (with nodemon):

bash
Copy code
npm run dev
Open in browser:

arduino
Copy code
http://localhost:3001
📝 Data Storage
Products are stored in:

bash
Copy code
data/products.json
Cart is stored in:

bash
Copy code
data/cart.json
Initial format for cart.json:

json
Copy code
{
  "items": []
}
🛍 Product Model Capabilities
Create product

Fetch all products

Fetch product by ID

Edit product

Delete product

🛒 Cart Features
Add product to cart

Increase quantity if product already exists

Cart items stored as:

json
Copy code
{
  "items": [
    { "id": "productId", "qty": 2 }
  ]
}
Cart count displayed in navbar

📌 MVC Concept
Model → Handles file operations and data logic

Controller → Handles requests and responses

View → EJS templates for rendering UI

🔒 Notes
This project uses file-based storage (no database).

For production use, it is recommended to switch to MongoDB or SQL and session-based carts.

