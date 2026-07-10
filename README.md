# 🏋️ FitLife Gym Lead Tracking System with Dashboard

A modern **Gym Lead Management and Tracking Dashboard** designed to help fitness businesses manage potential customers, track lead conversions, monitor performance, and improve customer acquisition workflows.

The system provides a centralized dashboard where gym administrators can manage leads, analyze conversion rates, visualize business insights, and organize customer follow-ups efficiently.

---

## 🚀 Features

### 📊 Analytics Dashboard
- Overview of total leads, converted customers, and pending leads
- Interactive charts for lead performance analysis
- Conversion rate tracking
- Revenue and growth insights
- Real-time business statistics

### 👥 Lead Management
- Create, update, and delete leads
- Track lead status:
  - New
  - Contacted
  - Interested
  - Converted
  - Lost
- Store customer information
- Manage follow-up activities

### 📈 Data Visualization
- Lead conversion charts
- Monthly performance analytics
- Interactive graphs using Recharts
- Business trend monitoring

### 🔎 Search & Filtering
- Search leads by name or contact information
- Filter leads by status
- Quickly find customer records

### 🎨 Modern UI/UX
- Responsive design for desktop and mobile
- Clean dashboard interface
- Modern components
- Dark/light theme support
- Smooth user experience

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Tailwind CSS
- Recharts
- Lucide React Icons

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB
- Mongoose ODM

### Tools & Deployment
- Git & GitHub
- Postman
- Cloudinary (if media upload is enabled)

---

## 📸 Screenshots

### Dashboard Overview

![Dashboard](./screenshots/dashboard.png)

### Lead Management

![Lead Management](./screenshots/leads.png)

### Analytics Charts

![Analytics](./screenshots/analytics.png)

---

## 🏗️ Project Structure

```
gym-lead-tracker/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── hooks/
│   │   └── utils/
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── server.js
│
├── screenshots/
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/yourusername/gym-lead-tracker.git
```

Navigate into the project:

```bash
cd gym-lead-tracker
```

---

## Backend Setup

Go to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start backend server:

```bash
npm run dev
```

---

## Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start React application:

```bash
npm run dev
```

---

## 🔐 Authentication

The application supports secure authentication with:

- User registration and login
- JWT-based authentication
- Protected dashboard routes
- Role-based access control

---

## 📌 Future Improvements

- 📱 Mobile application using React Native
- 🤖 AI-based lead conversion prediction
- 📧 Automated email/SMS follow-up reminders
- 💳 Membership payment management
- 📅 Workout and trainer scheduling
- 🔔 Real-time notifications using Socket.io

---

## 🎯 Project Goals

This project was built to demonstrate practical skills in:

- Full-stack web development
- Dashboard design
- State management with Redux Toolkit
- REST API development
- Data visualization
- Business workflow automation

---

## 👨‍💻 Author

**Daniel Kumilachew**

Software Engineering Student  
GitHub: https://github.com/Danny2706

---

⭐ If you find this project useful, consider giving it a star!
