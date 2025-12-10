# Quick Start Guide - Med-Sync

## 🚀 Start Both Frontend and Backend in 5 Minutes

### Step 1: Set Up MongoDB
Make sure you have MongoDB running. If using local MongoDB:
```bash
mongod
```

Or use MongoDB Atlas (cloud): Update the connection string in `.env`

### Step 2: Start the Backend

Open **Terminal 1**:
```bash
cd backend
npm install          # Only needed first time
npm start
```

✅ Backend will be running on `http://localhost:3000`

### Step 3: Start the Frontend

Open **Terminal 2**:
```bash
cd frontend
npm install          # Only needed first time
npm run dev
```

✅ Frontend will be running on `http://localhost:5175` (or higher port if 5175 is busy)

---

## 📖 Testing the Application

### 1. **Visit the Homepage**
```
http://localhost:5175
```
Explore the landing page, read about Med-Sync, and check out all sections.

### 2. **Create an Account**
- Click "Get Started" in the navbar or hero section
- Go to **Signup** page
- Select user type (Patient or Caregiver)
- Fill in details:
  - Name: Your Full Name
  - Email: your.email@example.com
  - Password: SecurePass123 (min 8 chars, 1 uppercase, 1 number)
- Click "Create Account"

### 3. **Login**
- Click "Login" in navbar
- Enter your email and password
- Click "Sign In"
- **Note**: Currently redirects to dashboard (JWT integration pending)

### 4. **Try the Dashboard**
- Add a new medicine:
  - Click "+ Add Medicine"
  - Enter: Name, Dose, Time
  - Click "Add"
- Mark medicine as taken
- Check adherence rate

### 5. **Explore Other Pages**
- **About**: Learn about the team
- **Features**: See what Med-Sync offers
- **Technology**: Check the tech stack
- **Impact**: Understand the benefits
- **Contact**: Send a message

---

## 🔗 API Testing

Use **Postman** or **curl** to test the API:

### Signup Example
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "userType": "patient"
  }'
```

### Login Example
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Create Medicine Example
```bash
curl -X POST http://localhost:3000/api/medicines \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id_here",
    "name": "Aspirin",
    "dose": "100mg",
    "frequency": "once daily",
    "times": ["08:00"]
  }'
```

---

## 🎯 Key Routes to Test

### Frontend Routes
| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/about` | About page |
| `/features` | Features page |
| `/technology` | Technology stack |
| `/impact` | Impact page |
| `/contact` | Contact form |
| `/login` | Login page |
| `/signup` | Signup page |
| `/dashboard` | Medicine dashboard |

### Backend Routes
| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/medicines` | Create medicine |
| GET | `/api/medicines/user/:userId` | Get user medicines |
| POST | `/api/adherence` | Mark medicine taken |
| GET | `/api/adherence/stats/:userId` | Get adherence stats |

---

## ⚙️ Configuration Files

### `.env` (Backend)
```
MONGODB_URI=mongodb://localhost:27017/medsync
PORT=3000
```

### `.env.local` (Frontend)
```
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 or 5175 is in use:

**For Backend**:
```bash
# Change PORT in .env
PORT=3001
npm start
```

**For Frontend**:
Vite will automatically find the next available port

### MongoDB Connection Error
- Check MongoDB is running: `mongod`
- Verify connection string in `.env`
- For MongoDB Atlas, whitelist your IP

### CORS Error
Backend CORS is already enabled. If issues persist:
- Check `server.js` has `cors()` middleware
- Verify API_BASE_URL in frontend matches backend URL

### Dependencies Not Installing
```bash
# Clear cache and reinstall
npm cache clean --force
npm install
```

---

## 📱 Testing on Mobile

To test on mobile device:

### Same Network
1. Get your computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac)
2. Visit `http://YOUR_IP:5175` on your phone
3. Make sure both on same WiFi

### Using Ngrok (Public URL)
```bash
npm install -g ngrok
ngrok http 5175
# Use the provided URL on any device
```

---

## 🎨 Customization

### Change Colors
Edit color values in page files:
- Primary Blue: `#2563eb` → Change to your color
- Secondary Green: `#22c55e` → Change to your color
- Find and replace throughout all `.jsx` files

### Change App Name
Search for "Med-Sync" and replace with your app name:
- `index.html` title
- Navbar logo
- Footer copyright
- All content

### Modify Navbar Links
Edit `src/components/Navbar.jsx`:
```jsx
<li><Link to="/your-page">Your Page</Link></li>
```

---

## 📚 Learn More

- React Router: https://reactrouter.com/
- Express.js: https://expressjs.com/
- MongoDB: https://docs.mongodb.com/
- Mongoose: https://mongoosejs.com/

---

## 💡 Tips

1. **Keep both terminals running**: One for backend, one for frontend
2. **Clear cache**: If styles don't update, hard refresh (Ctrl+Shift+R)
3. **Check browser console**: F12 to see any errors
4. **Check server logs**: Look at terminal output for API errors
5. **Use Postman**: Test API endpoints before using frontend

---

## 🎊 You're All Set!

Your Med-Sync application is ready to use. Start building, testing, and improving!

For questions or issues, check the IMPLEMENTATION_GUIDE.md or DEVELOPMENT_SUMMARY.md

Happy coding! 🚀
