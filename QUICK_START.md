# VisionX Form - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Gmail
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Google generates a 16-character password
4. Copy the password (without spaces)

### Step 3: Update .env File
```env
EMAIL_USER=visionx236@gmail.com
EMAIL_PASSWORD=paste_16_char_password_here
```

### Step 4: Run Development Server
```bash
npm run dev
```
Open http://localhost:3000 in your browser

### Step 5: Test the Form
- Fill in all fields
- Click "Submit Enquiry"
- Check visionx236@gmail.com for the enquiry
- Check your email for confirmation

### Step 6: Deploy to Vercel
```bash
npm run deploy
```
Follow the prompts and add your environment variables in Vercel dashboard.

---

## ✅ Verification Checklist

- [ ] Node.js 16+ installed
- [ ] npm dependencies installed
- [ ] .env file configured with Gmail credentials
- [ ] Gmail app password created (16 characters)
- [ ] Development server runs without errors
- [ ] Form submits successfully
- [ ] Emails received in visionx236@gmail.com
- [ ] Confirmation email received
- [ ] Deployed to Vercel

---

## 📝 Environment Variables

### Required Variables
| Variable | Description | Example |
|----------|-------------|---------|
| EMAIL_USER | Gmail address | visionx236@gmail.com |
| EMAIL_PASSWORD | Gmail app password | xxxx xxxx xxxx xxxx |

### Optional Variables
| Variable | Description | Default |
|----------|-------------|---------|
| API_URL | API endpoint | http://localhost:3000 |

---

## 🔧 Troubleshooting

### Issue: "Invalid login" error
**Solution**: Ensure Gmail app password is correct, not your regular password

### Issue: "Cannot find module nodemailer"
**Solution**: Run `npm install` again

### Issue: Form not submitting
**Solution**: Check browser console (F12) for errors

### Issue: Emails not arriving
**Solution**: Check spam folder, verify EMAIL_USER is correct

---

## 📱 Testing on Mobile

```bash
# Get your machine's IP
ipconfig getifaddr en0  # Mac
ipconfig              # Windows

# Access from mobile on same network
http://YOUR_IP:3000
```

---

## 🚢 Production Deployment

### Using Vercel (Recommended)

```bash
# Option 1: Vercel CLI
npm install -g vercel
npm run deploy

# Option 2: GitHub Integration
# Push to GitHub → Connect Vercel → Auto-deploy
```

### Environment Variables in Vercel
1. Go to Project Settings
2. Add Environment Variables:
   - EMAIL_USER
   - EMAIL_PASSWORD
3. Redeploy

---

## 📊 Monitoring

### Check Logs
```bash
# Local development
npm run dev
# Errors appear in console

# Production (Vercel)
# Go to: https://vercel.com/dashboard
# Select project → Deployments → Logs
```

### Monitor Emails
- Check visionx236@gmail.com inbox
- Look in spam/promotions folder
- Check Nodemailer logs in Vercel

---

## 💡 Pro Tips

1. **Backup Your Credentials**: Save EMAIL_PASSWORD somewhere safe
2. **Use Different Email**: Create a separate Gmail account for sending
3. **Test Locally**: Always test locally before deploying
4. **Monitor Free Tier**: Vercel free tier has usage limits
5. **Set Up Alerts**: Enable email notifications in Vercel dashboard

---

Made with ❤️ for VisionX
