# Deployment Guide - HealthCheck AI

## Option 1: Vercel Deployment (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free)

### Steps
1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy HealthCheck AI"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect and deploy

3. **Environment Variables:**
   Add these in Vercel dashboard -> Settings -> Environment Variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   AI_SERVICE_URL=https://your-vercel-url.vercel.app/model/predict
   NODE_ENV=production
   ```

---

## Option 2: Railway Deployment

### Steps
1. **Create railway.toml:**
   ```toml
   [build]
   builder = "NIXPACKS"
   
   [deploy]
   startCommand = "npm run start:prod"
   
   [[services]]
   name = "backend"
   source = "./backend"
   
   [[services]]
   name = "frontend"
   source = "./frontend"
   ```

2. **Deploy:**
   - Go to [railway.app](https://railway.app)
   - Connect GitHub repository
   - Add environment variables
   - Deploy

---

## Option 3: Render (Free Tier)

### Backend Service
1. Create new Web Service
2. Connect GitHub repo
3. Set:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment: Node.js

### Frontend Service
1. Create new Static Site
2. Set:
   - Build Command: `cd frontend && npm run build`
   - Publish Directory: `frontend/dist`

---

## Option 4: Heroku

### Prepare for Heroku
1. **Create Procfile:**
   ```
   web: cd backend && npm start
   ```

2. **Deploy:**
   ```bash
   heroku create healthcheck-ai
   heroku config:set NODE_ENV=production
   heroku config:set MONGO_URI=your_mongo_uri
   git push heroku main
   ```

---

## Environment Variables Needed

```env
# Backend
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/healthcheck
PORT=4000
JWT_SECRET=your-super-secret-jwt-key
GOOGLE_CLIENT_ID=your-google-oauth-client-id
AI_SERVICE_URL=your-python-model-url
NODE_ENV=production

# Frontend (build time)
VITE_API_URL=https://your-backend-url.com/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

---

## Quick Start Commands

```bash
# 1. Build frontend for production
cd frontend
npm run build

# 2. Test backend in production mode
cd backend
NODE_ENV=production npm start

# 3. Deploy to Vercel (easiest)
npx vercel --prod

# 4. Deploy to Railway
railway login
railway link
railway up
```

---

## Post-Deployment Checklist

- [ ] All environment variables set
- [ ] Database connection working
- [ ] API endpoints responding
- [ ] Frontend loads properly
- [ ] Authentication working
- [ ] AI model predictions working
- [ ] HTTPS enabled
- [ ] Domain configured (optional)

---

## Troubleshooting

### Common Issues:
1. **CORS errors**: Update CORS origin in server.js
2. **Database connection**: Check MongoDB whitelist IPs
3. **Environment variables**: Verify all vars are set
4. **Build errors**: Check Node.js version compatibility
5. **API 404**: Verify API_URL in frontend config