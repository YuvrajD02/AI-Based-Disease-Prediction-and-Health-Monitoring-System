# Production Deployment Guide

## ✅ Pre-Deployment Checklist

### Environment Configuration
- [x] Frontend `.env` configured with production URLs
- [x] Backend `.env` configured with production URLs
- [x] All hardcoded localhost URLs replaced with environment variables
- [x] CORS configured to allow production frontend URL
- [x] MongoDB connection string secured

### Code Quality
- [x] No syntax errors in frontend/backend
- [x] All API endpoints use environment variables
- [x] Proper error handling in place
- [x] Health check endpoints configured

---

## 🚀 Deployment Steps

### 1. Backend Deployment (Render)

**Required Environment Variables in Render Dashboard:**
```env
MONGO_URI=mongodb+srv://amankumarofficial726_db_user:Aman%40843101@healthcluster.3iotarl.mongodb.net/healthcheck?retryWrites=true&w=majority&appName=healthcluster
PORT=4000
JWT_SECRET=supersecret123
GOOGLE_CLIENT_ID=223947768804-e8qrqaav98956k0vqj21kfjlq0fu7sl5.apps.googleusercontent.com
AI_SERVICE_URL=https://ml-vxmh.onrender.com
FRONTEND_URL=https://healthchecka.netlify.app
BACKEND_URL=https://minor-50t5.onrender.com
NODE_ENV=production
```

**Deploy Commands:**
```bash
cd backend
git add .
git commit -m "Production ready backend"
git push origin main
```

### 2. ML Model Deployment (Render)

**Already deployed at:** `https://ml-vxmh.onrender.com`

**Verify health:**
```bash
curl https://ml-vxmh.onrender.com/health
```

### 3. Frontend Deployment (Netlify)

**Required Environment Variables in Netlify Dashboard:**
```env
VITE_BACKEND_URL=https://minor-50t5.onrender.com
VITE_ML_API_URL=https://ml-vxmh.onrender.com
VITE_FRONTEND_URL=https://healthchecka.netlify.app
```

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18.x or higher

**Deploy Commands:**
```bash
cd frontend
npm run build
# Then push to your repository connected to Netlify
git add .
git commit -m "Production ready frontend"
git push origin main
```

---

## 🧪 Post-Deployment Testing

### 1. Test Health Endpoints
```bash
# Backend health
curl https://minor-50t5.onrender.com/

# ML Model health (via backend)
curl https://minor-50t5.onrender.com/api/predict/health

# ML Model direct
curl https://ml-vxmh.onrender.com/health
```

### 2. Test Frontend
- Visit: https://healthchecka.netlify.app
- Check Diagnose page: AI Model status should show "Ready"
- Test authentication (signup/login)
- Test disease prediction with sample symptoms
- Verify all pages load correctly

### 3. Monitor Logs
- Backend logs in Render dashboard
- Frontend logs in Netlify dashboard
- Browser console for any client-side errors

---

## 🔧 Troubleshooting

### Issue: "AI Model: Offline"
**Solution:** Render free tier services sleep after 15 mins of inactivity. First request wakes them up (takes 30-60 seconds).

### Issue: CORS errors
**Solution:** Verify `FRONTEND_URL` in backend `.env` matches your Netlify URL exactly.

### Issue: 503 Service Unavailable
**Solution:** Backend or ML model service is sleeping. Wait 30-60 seconds and retry.

### Issue: Environment variables not updating
**Solution:** 
- Frontend: Clear build cache and rebuild
- Backend: Restart the service in Render dashboard

---

## 📝 Local Development Setup

To switch back to local development:

**Frontend `.env`:**
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_ML_API_URL=https://ml-vxmh.onrender.com
VITE_FRONTEND_URL=http://localhost:5173
```

**Run locally:**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

---

## 🔐 Security Notes

- Never commit `.env` files to git (already in `.gitignore`)
- Keep `.env.example` files updated for team reference
- Rotate `JWT_SECRET` regularly
- Use strong MongoDB passwords
- Enable rate limiting for production APIs

---

## 📊 Architecture

```
Frontend (Netlify)
    ↓
Backend (Render) → MongoDB Atlas
    ↓
ML Model (Render)
```

**Endpoints:**
- Frontend: `https://healthchecka.netlify.app`
- Backend API: `https://minor-50t5.onrender.com`
- ML Model: `https://ml-vxmh.onrender.com`

---

## ✅ Production Ready Checklist

- [x] All environment variables configured
- [x] No hardcoded URLs in code
- [x] CORS properly configured
- [x] Error handling implemented
- [x] Health check endpoints working
- [x] .gitignore protecting sensitive files
- [x] API routes use environment variables
- [x] Frontend build tested locally
- [x] Backend tested with production DB

Your project is now **production ready**! 🎉
