# Match-Mingle Backend 🛡️

This is the robust Express.js backend for **Match-Mingle**, built with [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), and [MongoDB](https://www.mongodb.com/).

---

## 🛠️ Tech Stack & Middleware

- **Runtime**: [Node.js](https://nodejs.org/) (Version 16+)
- **Framework**: [Express.js](https://expressjs.com/) (Version 5+)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) and [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Middleware**:
  - `cookie-parser`: Securely handle cookies for JWT-based auth.
  - `cors`: Handle cross-origin requests from the React frontend.
  - `express.json()`: Parse incoming JSON request bodies.
  - `dotenv`: Manage environment variables securely.

---

## 🏗️ Project Architecture

The backend follows a **Model-View-Controller (MVC)** inspired architecture:

- `server.js`: Main entry point where Express is initialized and routes are defined.
- `config/db.js`: MongoDB connection setup.
- `models/`: Mongoose schemas (User, Request, etc.) to define data structure.
- `controllers/`: Core application logic and request handlers for auth, profile, and user operations.
- `routes/`: Express routers that map URLs to specific controller functions.
- `middlewares/`: Custom logic for things like user authentication (`userAuth.js`).
- `utils/`: Reusable utility functions and validation logic.

---

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env` file in the root with the following variables:
   ```env
   PORT=5000
   DB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

---

## 🧪 API Endpoint Reference

| Route Group | Description |
| :--- | :--- |
| `/api/auth` | Handle user registration, login, and logout. |
| `/api/profile` | View and edit user profiles. |
| `/api/request` | Manage incoming and outgoing connection requests (interested, ignored, etc.). |
| `/api/user` | Fetch user feed, connections, and received requests. |

---

## 🛡️ Security Best Practices

- **Password Hashing**: All user passwords are salt-and-hashed using Bcrypt before being saved.
- **JWT Authorization**: Sensitive routes are protected by a `userAuth` middleware that validates JWT tokens.
- **Credential Safety**: `DB_URL` and `JWT_SECRET` are never hardcoded and must be managed via `.env`.
- **CORS Configuration**: Restricts API access to authorized frontend origins.
