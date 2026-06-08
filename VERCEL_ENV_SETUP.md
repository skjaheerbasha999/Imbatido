# Vercel Environment Variables Setup

## Current Frontend URL
https://medsyncs.vercel.app/

## What You Need to Do

Your frontend needs the `VITE_API_URL` environment variable set on Vercel to connect to your backend.

## Step-by-Step: Add Environment Variables to Vercel

### 1. Go to Vercel Dashboard
- Visit: https://vercel.com/dashboard
- Log in with your account

### 2. Select Your Project
- Find "medsyncs" or "Imbatido" in the project list
- Click on it to open

### 3. Go to Settings
- Click "Settings" tab at the top
- Look for "Environment Variables" in the left sidebar

### 4. Add New Environment Variable
- Click "Add New" button
- Fill in the fields:

**For Production Environment:**
| Field | Value |
|-------|-------|
| **Key** | `VITE_API_URL` |
| **Value** | `https://medsync-v67k.onrender.com/api` |
| **Environments** | Select "Production" |

- Click "Save"

### 5. Optional: Add for Preview & Development
- Click "Add New" again
- | Field | Value |
| **Key** | `VITE_API_URL` |
| **Value** | `https://medsync-v67k.onrender.com/api` |
| **Environments** | Select "Preview" |

### 6. Redeploy Your Project
After adding environment variables:
1. Go to "Deployments" tab
2. Find the latest deployment
3. Click the 3-dot menu (...)
4. Click "Redeploy"
5. Confirm redeploy

**Wait 2-3 minutes** for deployment to complete.

### 7. Verify
Visit https://medsyncs.vercel.app/ and check:
- Page loads without errors
- Open DevTools (F12) → Network tab
- Try to sign up or login
- Should see requests to `https://medsync-v67k.onrender.com/api/...`

---

## Environment Variables Reference

For your Vercel project, you need:

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_API_URL` | `https://medsync-v67k.onrender.com/api` | Production, Preview, Development |

---

## If Using vercel.json

Alternative: Create `frontend/vercel.json`:

```json
{
  "env": {
    "VITE_API_URL": "@vite_api_url"
  },
  "build": {
    "env": {
      "VITE_API_URL": "@vite_api_url"
    }
  }
}
```

Then add `vite_api_url` secret in Vercel dashboard.

**This is optional** - adding directly in Settings is easier.

---

## Troubleshooting

### Frontend still can't reach backend
**Check 1:** Environment variable is set in Vercel
- Go to Settings → Environment Variables
- Verify `VITE_API_URL` is there
- Value should be: `https://medsync-v67k.onrender.com/api`

**Check 2:** Project was redeployed
- Go to Deployments
- After adding env vars, click "Redeploy"
- Wait for new deployment to complete

**Check 3:** Old deployment is cached
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Try incognito/private window

**Check 4:** Backend is running
- Visit: https://medsync-v67k.onrender.com/
- Should see: `{"message":"Med-Sync Backend API is running"}`

### Error: "Cannot find module"
- This means `.env` variables aren't loaded
- Redeploy project after adding env vars

### Error: "CORS blocked"
- Backend CORS not configured correctly
- Or frontend is requesting wrong domain
- Check backend/server.js CORS settings

---

## What Happens After Setup

1. **Build Time:** Vercel builds frontend with env variables
2. **Vite Processing:** Vite replaces `import.meta.env.VITE_API_URL` with actual value
3. **Runtime:** Frontend makes requests to backend using the URL
4. **API Calls:** All requests go to `https://medsync-v67k.onrender.com/api/...`

---

## Current File Locations

- **Frontend .env files:**
  - `frontend/.env` - Default production
  - `frontend/.env.production` - For Vercel builds
  - `frontend/.env.local` - For local development

- **Frontend code:**
  - `frontend/src/services/api.js` - Uses `import.meta.env.VITE_API_URL`

- **Vercel Settings:**
  - https://vercel.com/dashboard → Select project → Settings → Environment Variables

---

## After Setup: Testing Checklist

- [ ] Go to Vercel Dashboard
- [ ] Add `VITE_API_URL` environment variable
- [ ] Set value to `https://medsync-v67k.onrender.com/api`
- [ ] Click "Save"
- [ ] Go to Deployments tab
- [ ] Click "Redeploy" on latest
- [ ] Wait 2-3 minutes
- [ ] Visit https://medsyncs.vercel.app/
- [ ] Open DevTools (F12) → Network tab
- [ ] Try to sign up
- [ ] Verify requests go to backend API
- [ ] ✅ Success!

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| 404 API errors | VITE_API_URL not set | Add to Vercel env vars |
| CORS blocked | Backend CORS wrong | Update backend/server.js |
| Requests timeout | Backend not running | Check Render service |
| Wrong URL in requests | Old deployment cached | Hard refresh browser |
| API returns 500 error | MongoDB not connected | Set MongoDB URI in Render |

---

## Quick Reference

**What needs to be where:**

✅ **Vercel Environment Variables:**
```
VITE_API_URL = https://medsync-v67k.onrender.com/api
```

✅ **Render Environment Variables:**
```
MONGODB_URI = mongodb+srv://...
PORT = 3000
```

✅ **Frontend Code:**
```javascript
// frontend/src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
```

✅ **Backend Code:**
```javascript
// backend/server.js
mongoose.connect(process.env.MONGODB_URI)
```

---

## Support

For more help:
- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev/guide/env-and-mode.html
- React + Vite: https://vitejs.dev/guide/ssr.html

---

**Created:** December 10, 2025
**Status:** 📝 Follow these steps to complete setup
