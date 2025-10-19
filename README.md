# 🛍️ Product Segmentation API

This project provides a backend service and frontend interface for **segmenting products dynamically based on rules** such as price, rating, stock status, etc.  
The backend is built with **Node.js, Express, Sequelize, and MySQL**, and documented using **Swagger (OpenAPI)**.

---

## 🚀 Live Demo

| Service | Link |
|----------|------|
| 🌐 Frontend | [https://nimble-bienenstitch-96b956.netlify.app](https://your-frontend.onrender.com) |
| ⚙️ Backend (API) | [https://backend-biq4.onrender.com](https://your-backend.onrender.com) |
| 📄 Swagger Docs | [https://backend-biq4.onrender.com/api-docs](https://your-backend.onrender.com/api-docs) |

---

## ⚙️ Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Database:** MySQL (via Sequelize ORM)
- **Documentation:** Swagger 
- **Deployment:** Render

---

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/product-segmentation.git](https://github.com/MBrahul/Convert-cart.git )

cd backend
npm install

npm start

docker-compose up --build

```

### 2.Database configuration
``` bash
DB_HOST=your-mysql-host
DB_USER=your-mysql-user
DB_PASSWORD=your-mysql-password
DB_NAME=your-database-name
DB_PORT=3306

```

📦 Description of Ingestion Logic
The ingestion logic allows you to evaluate and filter products based on user-defined rules.
Each rule is written as a line of text using a field, operator, and value, for example:
price > 100
rating >= 4


🧩 Sample API Usage
POST /products/segments/evaluate
Request Body:

``` bash
{
  "rules": "price > 100\nrating >= 4"
}

```

Response:
{
  "status": true,
  "data": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "price": 199.99,
      "rating": 4.3,
      "category": "Electronics"
    },
    {
      "id": 2,
      "name": "Bluetooth Speaker",
      "price": 149.99,
      "rating": 4.5,
      "category": "Electronics"
    }
  ]
}

🧾 API Documentation (Swagger)
Interactive documentation is available at:
``` bash
[https://your-backend.onrender.com/api-docs](https://backend-biq4.onrender.com/api-docs/#/Products)

```

### AI Usage Notes

During the development of this project, I used ChatGPT  as an assistant tool to speed up implementation and debugging.

 . Integration test setup using Jest and Supertest
 . General error handling improvements and Sequelize configuration for Aiven MySQL
 . Example frontend Tailwind CSS navbar component
 . Implementation of sequelize (ORM)

