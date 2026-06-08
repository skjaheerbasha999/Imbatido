# Frontend-Backend Connection Guide

## ✅ Connection Setup Complete!

Your Med-Sync project is now configured to connect frontend and backend across environments.

## URLs

- **Frontend (Production):** https://medsyncs.vercel.app/
- **Backend (Production):** https://medsync-v67k.onrender.com
- **Backend API:** https://medsync-v67k.onrender.com/api

## What Was Changed

### 1. Frontend Environment Variables

**File: `frontend/.env`** (Production)
```
VITE_API_URL=https://medsync-v67k.onrender.com/api
```

**File: `frontend/.env.production`** (Vercel Build)
```
VITE_API_URL=https://medsync-v67k.onrender.com/api
```

**File: `frontend/.env.local`** (Local Development)
```
VITE_API_URL=http://localhost:3000/api
```

### 2. Frontend API Service

**File: `frontend/src/services/api.js`**
- Changed from: `process.env.REACT_APP_API_URL` (React environment variable)
- Changed to: `import.meta.env.VITE_API_URL` (Vite environment variable)
- Reason: Vite uses `VITE_` prefix for exposed environment variables

### 3. Backend CORS Configuration

**File: `backend/server.js`**
Updated CORS to allow requests from:
- `http://localhost:5173` (Development)
- `http://localhost:5176` (Development)
- `https://medsyncs.vercel.app` (Production Frontend)
- `https://medsync-v67k.onrender.com` (Backend)

## How It Works

1. **Frontend** makes API requests using `import.meta.env.VITE_API_URL`
2. **Vite** automatically replaces this with the correct URL based on environment:
   - Local development: `http://localhost:3000/api`
   - Vercel production: `https://medsync-v67k.onrender.com/api`
3. **Backend** receives requests and validates origin via CORS

## Testing the Connection

### Local Testing (Both running locally)
```bash
# Terminal 1 - Backend
cd backend
npm start
# Should run on http://localhost:3000

# Terminal 2 - Frontend
cd frontend
npm start
# Should run on http://localhost:5173 or 5176
```

### Production Testing
Visit: https://medsyncs.vercel.app/

The frontend should now connect to: https://medsync-v67k.onrender.com/api

## Troubleshooting

### Issue: "API is not connecting"

**Check 1: CORS Error in Browser Console**
- Look for: "Access to XMLHttpRequest blocked by CORS policy"
- Solution: Make sure your domain is in the CORS whitelist in `backend/server.js`

**Check 2: Network Tab in DevTools**
- Look at the request URL in Network tab
- Verify it's pointing to: `https://medsync-v67k.onrender.com/api`

**Check 3: Backend Environment Variable**
- Render backend needs `MONGODB_URI` environment variable set
- Check Render dashboard: Settings → Environment

**Check 4: Backend Status**
- Visit: https://medsync-v67k.onrender.com/
- Should return: `{"message":"Med-Sync Backend API is running"}`

### Issue: Requests timeout

- Render free tier has cold start delay (up to 50 seconds)
- First request may take time
- Backend wakes up after first request

### Issue: Database not connecting

- Check MongoDB URI in Render environment variables
- Make sure IP is whitelisted (if using MongoDB Atlas)
- Or use local MongoDB

## Next Steps

### Option 1: Push Changes to GitHub
```bash
git add .
git commit -m "Connect frontend to backend API"
git push origin main
```

Vercel will auto-redeploy with the new environment variables.

### Option 2: Manually Set Vercel Environment Variable
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add:
   - Name: `VITE_API_URL`
   - Value: `https://medsync-v67k.onrender.com/api`
   - Environments: Production

### Option 3: Add to vercel.json
Create `frontend/vercel.json`:
```json
{
  "env": {
    "VITE_API_URL": "@vite_api_url"
  }
}
```

Then set environment variable in Vercel dashboard.

## Environment Variable Reference

| Variable | Development | Production |
|----------|-------------|-----------|
| `VITE_API_URL` | `http://localhost:3000/api` | `https://medsync-v67k.onrender.com/api` |

## API Endpoints Available

All endpoints are prefixed with the API URL:

- `POST /api/auth/signup` - Create user account
- `POST /api/auth/login` - User login
- `GET /api/auth/:id` - Get user details
- `PUT /api/auth/:id` - Update user
- `GET /api/medicines/user/:userId` - Get user medicines
- `POST /api/medicines` - Create medicine
- `PUT /api/medicines/:id` - Update medicine
- `DELETE /api/medicines/:id` - Delete medicine
- `GET /api/adherence/user/:userId` - Get adherence data
- `POST /api/adherence` - Log adherence

## Security Notes

✅ **Good:**
- Using HTTPS in production
- CORS properly configured
- Environment variables for sensitive data

⚠️ **Review These:**
- Keep `MONGODB_URI` secret (don't commit)
- Add more restrictive CORS in production if needed
- Consider API rate limiting
- Add authentication tokens to API calls

## Support

If connection still fails:
1. Check browser console for errors
2. Check backend logs on Render
3. Visit https://medsync-v67k.onrender.com/ to test backend
4. Verify both services are running/deployed
5. Check environment variables are set correctly

---

**Last Updated:** December 10, 2025
**Status:** ✅ Ready for Production
