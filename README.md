## 🏠 Property Listing Management Backend

A robust backend system for managing property listings built with **Node.js**, **Express**, **MongoDB**, and **Redis**. It includes authentication, CRUD operations, filtering, and a smart recommendation system.

---

### 🚀 Features

* 🔐 JWT Authentication (Login & Register)
* 🏢 Property CRUD with authorization
* 🔎 Advanced filtering, search and sorting
* ❤️ Favorite/Unfavorite properties
* 🤖 Property Recommendations through email.
* ⚡ Redis caching for performance (using Upstash Redis on Vercel)
* 🧰 Modular and scalable project structure

---

### 📁 Project Structure

```
./
├── config/           # Mongodb connection & Redis client setup
├── controllers/      # Request handlers
├── middleware/       # Authentication & Error handling
├── models/           # Mongoose schemas
├── routes/           # Express route handlers
├── utils/            # CatchAsyncError:Try-cath wrapper & other helper function
└── api/index.js      # Server entry point
```

---

### 🛠️ Tech Stack

* **Backend:** Node.js, Express
* **Language:** Javascript
* **Database:** MongoDB with Mongoose
* **Caching:** Redis (Upstash for serverless Redis on Vercel)
* **Auth:** JWT + bcrypt
* **Other Tools:** dotenv, nodemon, ioredis

---

### 🧪 API Endpoints

#### 🔐 Auth Routes

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register new user     |
| POST   | `/api/auth/login`    | Login & receive token |

#### 🏘️ Property Routes (Protected)

| Method | Endpoint              | Description                     |
| ------ | --------------------- | ------------------------------- |
| POST   | `/api/property`     | Create property                 |
| GET    | `/api/property/list`     | Get all properties with filters |
| GET    | `/api/property/details/:id` | Get property by ID              |
| PUT    | `/api/property/:id` | Update property (only owner)    |
| DELETE | `/api/property/:id` | Delete property (only owner)    |

##### 🔎 Filtering Query Parameters

* `search` – search in title, description, location
* `minPrice` & `maxPrice`
* `location`
* `listedBy`
* `createdBy`
* `etc`

#### ❤️ Favorite Routes

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| POST   | `/api/property/toggle-favorite/:id` | Toggle favorite for a property |


#### 🎯 Recommendation Route

| Method | Endpoint               | Description                  |
| ------ | ---------------------- | ---------------------------- |
| GET    | `/api/user/find-by-email` | Find user by email |
| POST    | `/api/user/:userId/recommend` | Recommend property to user |

---

### 🧳 Setup Instructions

#### 1. Clone the repository

```bash
git clone https://github.com/Priyanshu1129/PropertyListingBackend.git
cd property-listing-backend
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Create your `.env` file OR use my .env file

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/property-listing
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
```

#### 4. Start development server

```bash
npm run dev
```

---

### 📦 Example Request (Register)

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword"
}
```

---

### 🌐 Deployment

```
🔗 Live URL: https://property-listing-backend-one.vercel.app
```


---

### 📌 Notes

* All property routes are protected and require a Bearer token.
* Redis is used to cache filters and recommendations for better performance.
* Properties can only be updated/deleted by their creators.
* I am providing credentials in .env for your easy testing.

---

### 📽️ Demo / Code Walkthrough

> 🎥 *A video explanation is available on youtube:https://youtu.be/dYi4jG8YxAo*

---

### 🙋‍♂️ Author

**Priyanshu — Backend SDE Intern Assignment**
*Passionate about full-stack development.*
