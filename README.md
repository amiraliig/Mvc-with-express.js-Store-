# Node.js MVC Shop (MongoDB + Mongoose)

A simple shop project using the MVC architecture with Node.js, Express, Mongoose, and EJS.

---

## Features
- MVC architecture (Model, View, Controller)
- Product management (add, edit, delete, view)
- Product detail page
- Shopping cart (if implemented)
- Page rendering with EJS and partials
- Uses MongoDB and Mongoose for data management
- Session management with express-session

---

## Prerequisites
- Node.js (version 14 or higher)
- MongoDB (running on localhost or any server)
- npm

---

## Installation & Setup

1. Clone the repository:
    ```bash
    git clone <repo-url>
    cd mvc
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start MongoDB (default port 27017):
    ```bash
    mongod
    ```
4. Database connection info in app.js is as follows:
    ```js
    mongoose.connect('mongodb://localhost:27017/shop')
    ```
    Change the connection string if needed.
5. Start the server:
    ```bash
    npm start
    ```
    or
    ```bash
    node app.js
    ```
6. The project will be available at [http://localhost:3000](http://localhost:3000).

---

## Folder Structure

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

## Notes
- The Product model and other models are defined using Mongoose.
- If you want to use Sharding or Replica Set, just change the connection string to point to mongos.
- For further development (such as authentication, order management, etc.), you can add new controllers and models.

---

## Contribution
Suggestions and Pull Requests are welcome!

## License
MIT

