# ⚡ VoltSpot - Smart EV Charging Reservation Platform

A SaaS-based EV Charging Slot Management System developed to simplify the management of electric vehicle charging stations. The system provides dedicated dashboards for **System Administrators**, **Station Owners**, and **EV Users**, allowing efficient station management, slot booking, and reservation tracking.

---

## 🚀 Features

### 👤 EV User

- User registration and login
- Browse approved charging stations
- Search charging stations
- View charging stations on an interactive map
- Book available charging slots
- Cancel bookings
- View booking history
- Receive booking notifications
- Notification badge with unread count

---

### 🏢 Station Owner

- Secure owner login
- Dashboard overview
- Create charging slots
- Update charging slots
- Delete charging slots
- View customer bookings
- Manage charging station reservations

---

### 🛡️ System Administrator

- Secure admin login
- Dashboard with real-time statistics
- View pending station requests
- Approve or reject station requests
- Automatically create owner accounts
- Send owner login credentials via email
- View approved stations
- Block and unblock charging stations
- View blocked stations
- Monitor users, stations, and bookings

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Redux Toolkit
- Tailwind CSS
- Axios
- React Hot Toast
- React Icons
- Recharts
- Leaflet (OpenStreetMap)

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- Multer
- Nodemailer

---

# 📂 Project Structure

```
VoltSpot/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── redux/
│   └── api/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   └── config/
│
└── README.md
```

---

# 👥 User Roles

## System Administrator

- Manage charging stations
- Approve station requests
- Reject station requests
- Block stations
- Unblock stations
- Monitor bookings
- View dashboard analytics

---

## Station Owner

- Manage charging slots
- View bookings
- Update station information
- Track reservations

---

## EV User

- Browse charging stations
- Book charging slots
- Cancel bookings
- View notifications

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/SewminiWimalasooriya/Smart-EV-Charging-System.git
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email@gmail.com

EMAIL_PASSWORD=your_gmail_app_password
```

Run the backend:

```bash
cd backend
npm install
npm run dev
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 📌 Main Modules

### Authentication

- User Login
- Station Owner Login
- Admin Login
- JWT Authentication

---

### Station Management

- Submit Station Request
- Approve Station
- Reject Station
- Block Station
- Unblock Station

---

### Slot Management

- Create Slot
- Update Slot
- Delete Slot
- View Slots

---

### Booking Management

- Book Charging Slot
- Cancel Booking
- View My Bookings

---

### Notification System

- Booking Success Notification
- Booking Cancellation Notification
- Mark Notifications as Read
- Notification Count Badge

---

# 🗄️ Database Collections

- Users
- Apartments (Charging Stations)
- Apartment Requests
- Slots
- Bookings
- Notifications

---

# 🔐 Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Authorization
- Temporary Password Generation
- Email Notification for Station Owners

---

# 🔄 System Workflow

```
Station Owner
      │
      ▼
Submit Station Request
      │
      ▼
Admin Reviews Request
      │
 ┌────┴────┐
 │         │
Approve   Reject
 │
 ▼
Create Station
 │
 ▼
Create Owner Account
 │
 ▼
Send Login Credentials via Email
 │
 ▼
Owner Login
 │
 ▼
Create Charging Slots
 │
 ▼
User Books Slot
 │
 ▼
Notifications Generated
```

---

# 📈 Future Enhancements

- Online payment gateway integration
- QR code-based charging
- Mobile application
- Push notifications
- AI-based charging recommendations
- Advanced analytics dashboard


---

# 📄 License

This project was developed as a **Final Year Undergraduate Project** for educational purposes.

---

# 📸 Screenshots

Add screenshots for:

- Home Page
  <img width="1851" height="847" alt="image" src="https://github.com/user-attachments/assets/994e8cb0-6e0c-4bdd-bc78-78963b7a7838" />

- User Dashboard
  <img width="1897" height="905" alt="image" src="https://github.com/user-attachments/assets/19f2c458-2bcf-418d-8bb5-bcaf55e51833" />

- Station Owner Dashboard
 <img width="1902" height="902" alt="image" src="https://github.com/user-attachments/assets/630ed94a-47de-44fd-9a00-139fad815a19" />

- Admin Dashboard
 <img width="1907" height="911" alt="image" src="https://github.com/user-attachments/assets/3bfa32d3-d0cd-47b3-90d0-938f9d8ef544" />

- Station Request Management
  <img width="1917" height="912" alt="image" src="https://github.com/user-attachments/assets/a0cff362-13a7-45e5-9cf0-1d49922f7f66" />

- Charging Slot Booking
  <img width="1897" height="910" alt="image" src="https://github.com/user-attachments/assets/ffd500da-98e3-4756-b213-5c807cd5c15b" />

- Notifications
  <img width="1912" height="907" alt="image" src="https://github.com/user-attachments/assets/d12ac7cb-33a1-4a7f-885d-a68506c90985" />

- Station Map
  <img width="1832" height="915" alt="image" src="https://github.com/user-attachments/assets/09cd0b34-e5cf-4a97-89ed-bf5efb26593d" />


---

