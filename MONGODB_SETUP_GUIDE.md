# MongoDB URI Setup Guide for Render

## Current Status

Your backend is deployed on Render but needs MongoDB connection configured.

## Option 1: Use MongoDB Atlas (Recommended for Production)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up"
3. Create account with email and password
4. Verify email

### Step 2: Create a Cluster
1. Click "Create" or "Build a Database"
2. Choose "M0 Sandbox" (free tier)
3. Select Cloud Provider: AWS
4. Select Region: Choose closest to you (e.g., us-east-1)
5. Click "Create Cluster"
6. Wait 1-3 minutes for cluster to deploy

### Step 3: Create Database User
1. In left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter Username: `medsync_user`
5. Enter Password: Create a strong password (copy it!)
6. Click "Add User"

### Step 4: Configure IP Whitelist
1. In left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (0.0.0.0/0)
   - ⚠️ For production, restrict to Render's IP
4. Click "Confirm"

### Step 5: Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" button
3. Choose "Drivers"
4. Select "Node.js" and version "4.x or higher"
5. Copy the connection string
6. It will look like:
   ```
   mongodb+srv://medsync_user:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Add to Render Environment
1. Go to https://render.com/dashboard
2. Select your Med-Sync backend service
3. Click "Settings"
4. Scroll to "Environment Variables"
5. Click "Add Environment Variable"
   - **Key:** `MONGODB_URI`
   - **Value:** `mongodb+srv://medsync_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/medsync`
   - Replace `YOUR_PASSWORD` with actual password
6. Click "Save Changes"
7. Render will auto-redeploy

### Step 7: Verify Connection
1. Wait for Render to redeploy (watch Logs)
2. Check logs for: `✓ Connected to MongoDB`
3. If error, check:
   - Password is correct
   - IP is whitelisted
   - Cluster name is correct

---

## Option 2: Use Local MongoDB (Development Only)

**NOT recommended for Render** - your server won't have MongoDB installed.

---

## Option 3: Use MongoDB Community Atlas (Alternative)

If Atlas is having issues, use alternatives like:
- **Railway:** https://railway.app (has MongoDB support)
- **MongoDB Free Tier:** Limited to Atlas M0
- **Self-hosted:** Not recommended for beginners

---

## Render Dashboard Setup Instructions

### To Add Environment Variable on Render:

1. **Go to Render Dashboard**
   - https://render.com/dashboard

2. **Find Your Backend Service**
   - Click on "Med-Sync Backend" (or whatever it's called)
   - Look in the list of services

3. **Go to Settings**
   - Click the service name to open it
   - Scroll right to find "Settings" tab

4. **Add Environment Variable**
   - Scroll to "Environment Variables" section
   - Click "Add Environment Variable" button
   - **Key:** MONGODB_URI
   - **Value:** Your MongoDB connection string
   - Click "Save Changes"

5. **Wait for Redeploy**
   - Render will automatically redeploy with new variables
   - Watch the "Logs" tab to see deployment progress
   - Wait for: ✓ Deployment successful

### Screenshots/Steps if Confused:

If you can't find the settings:
1. Render Dashboard → Select Service → Scroll right to "Settings" tab
2. Or click the 3-dot menu → Settings
3. Look for "Environment" or "Environment Variables" section

---

## MongoDB Connection String Formats

### MongoDB Atlas (Cloud - Recommended)
```
mongodb+srv://username:password@cluster.mongodb.net/medsync
```

### Local MongoDB (Not for Render)
```
mongodb://localhost:27017/medsync
```

### MongoDB Atlas with additional options
```
mongodb+srv://username:password@cluster.mongodb.net/medsync?retryWrites=true&w=majority
```

---

## Troubleshooting

### Error: "connect ECONNREFUSED"
**Problem:** MongoDB URI is not set or invalid
**Solution:** 
1. Check Render environment variables
2. Verify MongoDB URI is correct
3. Make sure password has no special characters (or URL encoded)

### Error: "Authentication failed"
**Problem:** Username or password is wrong
**Solution:**
1. Go to MongoDB Atlas
2. Click "Database Access"
3. Reset user password
4. Update Render environment variable

### Error: "IP not whitelisted"
**Problem:** Your IP address is not allowed
**Solution:**
1. Go to MongoDB Atlas
2. Click "Network Access"
3. Add your Render IP: 0.0.0.0/0 (allows all)
4. For production, whitelist only Render's IPs

### Logs show "connecting..." forever
**Problem:** Connection timeout (firewall, wrong URL, etc.)
**Solution:**
1. Check MongoDB URI format
2. Verify IP is whitelisted
3. Try simple connection string without special options
4. Check MongoDB cluster is actually running

---

## Current Backend .env File

Your backend uses `MONGODB_URI` from environment variables:

```javascript
// backend/server.js
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✓ Connected to MongoDB'))
  .catch((err) => console.error('✗ Error connecting to MongoDB:', err));
```

**Note:** Local `.env` file (backend/.env) won't work on Render!
- Render uses "Environment Variables" in dashboard
- Your local `.env` is for development only
- Never commit sensitive data to GitHub

---

## Step-by-Step MongoDB Atlas Setup (Quick)

### 1. Create Free Account (2 min)
- https://www.mongodb.com/cloud/atlas
- Sign up with email

### 2. Create Cluster (3 min wait)
- Click "Create Deployment"
- Choose "M0 (Free)"
- Click "Create"

### 3. Create User (1 min)
- Database Access → Add User
- Username: `medsync_user`
- Password: (copy it!)

### 4. Whitelist IP (1 min)
- Network Access → Add IP
- Choose "Allow from anywhere"

### 5. Get Connection String (1 min)
- Databases → Connect
- Choose "Node.js"
- Copy connection string

### 6. Add to Render (1 min)
- Render Dashboard → Your Service → Settings
- Add Environment Variable
- Key: `MONGODB_URI`
- Value: Your connection string (with password!)

### 7. Verify (2-5 min)
- Watch Render Logs
- Look for: `✓ Connected to MongoDB`

**Total Time: 15-20 minutes**

---

## Verify It's Working

### Test 1: Check Render Logs
1. Go to Render Dashboard
2. Select your backend service
3. Click "Logs" tab
4. Look for one of these messages:
   - ✅ `✓ Connected to MongoDB`
   - ❌ `✗ Error connecting to MongoDB`

### Test 2: Test API Endpoint
```bash
curl https://medsync-v67k.onrender.com/
# Should return: {"message":"Med-Sync Backend API is running"}
```

### Test 3: Try Signup
1. Go to https://medsyncs.vercel.app/
2. Click "Sign Up"
3. Fill in form
4. Click "Sign Up"
5. Should succeed (or give meaningful error, not connection error)

---

## Files & References

- Backend code: `backend/server.js`
- Backend env file: `backend/.env` (local only)
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Render Dashboard: https://render.com/dashboard

---

## Important Notes

⚠️ **Security:**
- Never commit `.env` file with passwords to GitHub
- Use Render's Environment Variables for production
- IP whitelist = 0.0.0.0/0 allows anyone (OK for free tier, restrict for production)
- Password should be complex and unique

✅ **Best Practice:**
- Use MongoDB Atlas for production
- Use local MongoDB for local development
- Keep `.env` in .gitignore
- Test after adding environment variables

---

## Still Need Help?

Check these resources:
1. **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com/
2. **Render Docs:** https://render.com/docs
3. **Node.js MongoDB Guide:** https://www.mongodb.com/docs/drivers/node/

---

**Created:** December 10, 2025
**Status:** 🚀 Ready to Configure
