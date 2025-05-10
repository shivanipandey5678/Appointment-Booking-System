# 🩺 Priscripto - Doctor Appointment Booking System

Priscripto is a full-stack web application designed for booking doctor appointments online. Users can register, log in, view available doctors, and book or cancel appointments. Doctors can manage their profiles and view booked appointments. The app also features secure authentication, role-based access, and a responsive UI.

---

## 📑 Table of Contents

1. Overview
2. Technologies Used
3. Project Structure
4. Frontend Documentation

   * Environment Variables
   * Key Features
   * Folder Structure
   * Important Components
   * API Integration
5. Backend Documentation

   * Environment Variables
   * Key Features
   * Folder Structure
   * Database Models
   * API Endpoints
6. Deployment
7. Best Practices
8. Future Enhancements
9. How to Run Locally
10. Author
11. License

---

## 1. 📌 Overview

The **Appointment Booking System (Priscripto)** is a web application that allows users to book appointments with doctors. It includes features like user authentication, appointment scheduling, and profile management. The system is built with a **React.js frontend** and a **Node.js/Express.js backend**, with **MongoDB** as the database.

---

## 2. 🛠️ Technologies Used

### Frontend

* React.js
* Axios
* Tailwind CSS
* React Router DOM
* Toastify for notifications

### Backend

* Node.js
* Express.js
* MongoDB with Mongoose
* JSON Web Tokens (JWT) for authentication
* Cloudinary for image uploads

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 3. 🗂️ Project Structure

### Frontend

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
└── vite.config.js
```

### Backend

```
backend/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── .env
├── server.js
├── package.json
└── config/
```

---

## 4. 💻 Frontend Documentation

### Environment Variables

```env
VITE_BACKEND_URL=https://appointment-booking-system-backend-8sgg.onrender.com
```

### Key Features

* JWT-based user login/signup
* Appointment booking/cancellation
* View user profile and appointment history
* Responsive UI

### Folder Structure

* `assets/`: Static files
* `components/`: Reusable UI elements
* `context/`: Global state using Context API
* `pages/`: Page-specific components
* `styles/`: Styling and Tailwind configs
* `utils/`: API methods and helpers

### Important Components

* **Navbar.jsx**: Navigation and user options
* **Appointment.jsx**: Slot booking logic
* **MyAppointment.jsx**: User's booked appointments

### API Integration Example

```javascript
const { data } = await axios.post(
  `${import.meta.env.VITE_BACKEND_URL}/api/user/cancel-appointment`,
  { appointmentId },
  { headers: { token } }
);
```

---

## 5. 🔙 Backend Documentation

### Environment Variables

```env
PORT=4000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

### Key Features

* JWT Auth with role-based access
* Doctor & appointment management
* Secure routes with middlewares
* Centralized error handling

### Folder Structure

* `controllers/`: Logic for APIs
* `middlewares/`: Auth and error middleware
* `models/`: Mongoose schemas
* `routes/`: API route definitions
* `utils/`: Helpers (tokens, cloudinary, etc)

### Database Models

**User Model**

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: { type: Boolean, default: false },
});
```

**Doctor Model**

```js
const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  slot_booked: { type: Object, default: {} },
});
```

**Appointment Model**

```js
const appointmentSchema = new mongoose.Schema({
  userId: String,
  docId: String,
  slotDate: String,
  slotTime: String,
  cancelled: { type: Boolean, default: false },
});
```

### API Endpoints

#### User Routes

* POST `/api/user/login`
* POST `/api/user/signup`
* GET `/api/user/get-profile`
* POST `/api/user/cancel-appointment`

#### Doctor Routes

* GET `/api/doctor/list`
* POST `/api/doctor/add`

#### Appointment Routes

* POST `/api/appointment/book`
* GET `/api/appointment/list`

---

## 6. 🚀 Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Link repo to Vercel
3. Set `VITE_BACKEND_URL`

### Backend (Render)

1. Push to GitHub
2. Link to Render
3. Set all env variables

---

## 7. ✅ Best Practices

* Use HTTPS and env variables for secrets
* Central error handling in backend
* Reusable components in frontend
* Pagination and indexes for performance

---

## 8. 🔮 Future Enhancements

* Admin dashboard for user/doctor management
* Email/SMS reminders
* Payment gateway
* Analytics dashboard

---

## 9. 🧪 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/yourusername/priscripto.git
cd priscripto

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Setup env vars in backend/.env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# Run the app
npm run dev (in both backend and frontend)

# Visit in browser
http://localhost:5173
```

---

## 🙋‍♀️ Author

**Shivani Pandey**
Full-Stack Developer | MERN Stack | Cloud & Security Enthusiast

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
