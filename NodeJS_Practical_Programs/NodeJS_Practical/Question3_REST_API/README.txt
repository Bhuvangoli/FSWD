QUESTION 3 - PRODUCT REST API

1. Start MongoDB locally, or configure a MongoDB Atlas URI in .env.
2. Open this folder in a terminal.
3. Run: npm install
4. Set MONGODB_URI in .env if needed.
5. Run: npm start
6. Open http://localhost:3000 in a browser or Postman.

Endpoints:
GET    /api/v1/products
GET    /api/v1/products/:id
POST   /api/v1/products
PUT    /api/v1/products/:id
DELETE /api/v1/products/:id

List filters and pagination:
GET /api/v1/products?minPrice=100&maxPrice=1000&sort=price&page=1&limit=5

Allowed sort fields: name, price, createdAt.
Allowed categories: Electronics, Books, Clothing, Home, Other.

POST example JSON:
{
  "name": "Wireless Mouse",
  "description": "2.4 GHz USB wireless mouse",
  "price": 799,
  "category": "Electronics",
  "stock": 25
}

For POST/PUT in Postman:
- Select Body > raw > JSON.
- Set Content-Type: application/json.
- Send valid JSON.

The API uses Mongoose validation and a centralized Express error handler.
