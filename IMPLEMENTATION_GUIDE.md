# Med-Sync - Smart Medicine Reminder Application

A modern web application for managing medication adherence for elderly patients, Alzheimer's patients, and their caregivers.

## 🎯 Project Overview

Med-Sync is a comprehensive solution that helps elderly and Alzheimer's patients take their medicines on time while providing caregivers with real-time updates and peace of mind.

## 📋 Features Implemented

### ✅ Frontend (React + Vite)
- **Homepage**: Enhanced hero section with gradient background, compelling copy, and call-to-action buttons
- **About Page**: Team and company information with icons
- **Features Page**: Detailed feature descriptions with visual elements
- **Technology Page**: Tech stack and architecture overview
- **Impact Page**: Social, economic, and healthcare benefits
- **Contact Page**: Contact form with validation
- **Authentication Pages**:
  - Login page with email/password validation
  - Signup page with user type selection (Patient/Caregiver) and strong password validation
- **Dashboard**: Complete medicine management interface with:
  - Medicine list for today
  - Progress tracking
  - Adherence rate calculation
  - Add new medicines functionality
  - Mark medicines as taken
  - Quick action buttons
  - Caregiver management section

### ✅ Navigation & UX
- Sticky navbar with smooth navigation
- Responsive design for mobile, tablet, and desktop
- Hover effects and smooth transitions
- Interactive buttons with visual feedback
- Form validation with error messages

### ✅ Backend (Node.js + Express + MongoDB)
- **User Management**:
  - User registration (signup) with password hashing
  - User login with authentication
  - User profile management (CRUD operations)
  
- **Medicine Management**:
  - Create, read, update, delete medicines
  - Track medicine doses and frequencies
  - Store medication instructions
  
- **Adherence Tracking**:
  - Record when medicines are taken
  - Track scheduled vs. taken doses
  - Calculate adherence statistics
  - Support date range queries
  
- **Caregiver Management**:
  - Link caregivers to patients
  - Configure caregiver notification preferences
  - Track relationships

## 📁 Project Structure

```
Imbatido-1/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── SectionIcon.jsx
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Technology.jsx
│   │   │   ├── Impact.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js (API client)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── responsive.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Medicine.js
│   │   ├── Adherence.js
│   │   └── Caregiver.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── medicine.js
│   │   └── adherence.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

#### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```
MONGODB_URI=mongodb://localhost:27017/medsync
PORT=3000
```

Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:3000`

#### Frontend Setup
```bash
cd frontend
npm install
```

Create `.env.local` file in frontend directory:
```
VITE_API_BASE_URL=http://localhost:3000/api
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5175` (or similar)

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/:id` - Get user details
- `PUT /api/auth/:id` - Update user profile
- `DELETE /api/auth/:id` - Delete user account

### Medicines
- `GET /api/medicines/user/:userId` - Get all medicines for a user
- `GET /api/medicines/:id` - Get specific medicine
- `POST /api/medicines` - Create new medicine
- `PUT /api/medicines/:id` - Update medicine
- `DELETE /api/medicines/:id` - Delete medicine

### Adherence
- `GET /api/adherence/user/:userId` - Get adherence records
- `GET /api/adherence/user/:userId/range?startDate=X&endDate=Y` - Get adherence by date range
- `POST /api/adherence` - Mark medicine as taken
- `PUT /api/adherence/:id` - Update adherence record
- `GET /api/adherence/stats/:userId` - Get adherence statistics

## 🎨 Design Features

- **Color Scheme**:
  - Primary: Blue (#2563eb)
  - Secondary: Green (#22c55e)
  - Light backgrounds: #f8fafc
  
- **Typography**:
  - Font family: Inter, Arial, sans-serif
  - Responsive font sizes
  
- **Visual Elements**:
  - Gradient backgrounds
  - Card-based layouts
  - Smooth transitions and hover effects
  - Emoji icons for visual appeal
  - Shadow effects for depth

## ✨ Key Improvements Made

1. **Enhanced Homepage**:
   - Gradient hero section with decorative shapes
   - "Why Med-Sync?" feature overview
   - Problem statement and solution explanation
   - Feasibility study cards
   - Tech stack showcase
   - Impact and benefits grid
   - Professional footer with navigation

2. **Authentication System**:
   - Strong form validation
   - Password strength requirements
   - User type selection (patient/caregiver)
   - Error handling and user feedback

3. **Dashboard**:
   - Real-time medicine tracking
   - Adherence rate calculation
   - Quick medicine addition
   - Progress visualization
   - Caregiver management interface

4. **Responsive Design**:
   - Mobile-first approach
   - Breakpoints for tablet and desktop
   - Touch-friendly interface
   - Proper viewport configuration

5. **Backend Architecture**:
   - RESTful API design
   - MongoDB data models
   - Password hashing with bcrypt
   - CORS enabled for frontend
   - Error handling middleware

## 📚 Technologies Used

### Frontend
- React 18+
- React Router DOM
- Vite
- CSS3 (Flexbox, Grid)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- bcrypt (password hashing)
- CORS

## 🔐 Security Features

- Password hashing with bcrypt
- CORS protection
- Input validation
- Error handling without exposing sensitive data

## 📈 Next Steps / Future Enhancements

1. **JWT Authentication**: Implement JWT tokens for stateless authentication
2. **Email Notifications**: Send email reminders for missed doses
3. **SMS Alerts**: SMS notifications for caregivers
4. **Push Notifications**: Mobile app push notifications
5. **Doctor Portal**: Allow doctors to view patient adherence data
6. **Medicine Reminders**: Automated reminder scheduling
7. **Data Analytics**: Advanced reporting and analytics
8. **Real-time Updates**: WebSocket integration for live updates
9. **Mobile App**: React Native / Flutter apps
10. **Testing**: Unit and integration tests

## 🤝 Contributing

This is a project prototype. For contributions, please follow standard git workflows and submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For support, please contact: `info@medsync.com`

---

**Last Updated**: December 9, 2025
**Version**: 1.0.0
