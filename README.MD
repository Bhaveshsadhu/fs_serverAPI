
```markdown
# 🛠️ Finance Tracker API – Backend (Express & MongoDB)

This is the backend REST API for the 💰 Finance Tracker application, built with **Express.js** and **MongoDB**. It provides secure user authentication, income/expense management, and data endpoints for chart visualization.

---

## 🚀 Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **bcrypt for password hashing**
- **Postman for API testing**


```

---

## 🔐 Authentication

- JWT is used for user authentication
- Token is stored in the browser (frontend) and passed in the `Authorization` header
- Token is valid for 24 hours

---

## 📮 API Endpoints

### 🧑‍💼 User Routes

| Endpoint              | Method | Description                     | Protected |
|-----------------------|--------|----------------------------------|-----------|
| `/api/v1/users/signup`| POST   | Register a new user              | ❌        |
| `/api/v1/users/login` | POST   | Login and receive JWT            | ❌        |
| `/api/v1/users/info`  | GET    | Get logged-in user's info        | ✅        |

---

### 💵 Transaction Routes

| Endpoint                              | Method | Description                              | Protected |
|---------------------------------------|--------|------------------------------------------|-----------|
| `/api/v1/users/transcation`          | POST   | Add a new income/expense                 | ✅        |
| `/api/v1/users/transcation`          | GET    | Get all transactions for a user          | ✅        |
| `/api/v1/users/transcation/:id`      | PATCH  | Edit a single transaction                | ✅        |
| `/api/v1/users/transcation/delete`   | POST   | Delete one or more transactions (by IDs) | ✅        |

---

## 🔐 How to Authenticate

All protected routes require a JWT token in the `Authorization` header:

```
Authorization: <your_token_here>
```

---

## 🧪 Postman Collection

A full Postman collection is available in the `postman/` folder of the main project.

To test APIs:

1. Import the collection into Postman.
2. Set `base_url` to `http://localhost:8000`
3. Use login or signup to get a JWT token.
4. Use the token in all protected routes.

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/financeTracker
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
```

---

## 🏃‍♂️ Run Locally

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start the Server

```bash
npm run dev
```

---

## 🧠 Key Concepts

- Modular controller-routing structure
- Mongoose schema design for User and Transaction models
- Error handling middleware
- Authentication middleware using JWT
- Protected routes for sensitive data

---

## 📜 License

MIT License © 2025 [Your Name]

---

## 🙋‍♀️ Questions?

If you have any questions or need help, feel free to reach out:

📧 bhaveshsadhu67@gmail.com  
🐙 [GitHub](https://github.com/Bhaveshsadhu)
```
