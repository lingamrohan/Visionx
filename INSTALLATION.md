# ⚡ VisionX Form - Installation & Getting Started

## 📋 Prerequisites

Before starting, ensure you have installed:

1. **Node.js** (v16 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version` should show v16+
   
2. **Git** (for version control)
   - Download: https://git-scm.com/

3. **Code Editor** (optional)
   - VS Code: https://code.visualstudio.com/
   - Or any text editor

---

## 🚀 Installation Steps

### Step 1: Open Terminal/Command Prompt
```bash
# Navigate to your project folder
cd "c:\Users\SVTS\OneDrive\Documents\VISIONX CONTACT"
```

### Step 2: Install Dependencies
```bash
npm install
```
This installs:
- React 18
- Vite (fast bundler)
- Axios (HTTP client)
- Nodemailer (email sending)

⏱️ Takes 2-5 minutes depending on internet speed

### Step 3: Create Gmail App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" → "Windows Computer"
3. Copy the 16-character password generated
4. See **GMAIL_SETUP.md** for detailed steps

### Step 4: Configure Environment Variables
1. Open `.env` file in your editor
2. Update with your Gmail credentials:
```env
EMAIL_USER=visionx236@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

### Step 5: Run Development Server
```bash
npm run dev
```

✅ You should see:
```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:3000/
  ➜  Press q to quit
```

### Step 6: Open in Browser
Click or copy-paste: http://localhost:3000

---

## ✅ What You'll See

### Homepage
```
🟣 VisionX
Partner With VisionX

Interested in bringing VisionX training to your school?
Fill in your details and our team will get in touch with you.

[Form with fields]
```

### Form Fields
- School Name (required)
- Name (required)
- Contact Number (required)
- Email (required)
- Message (optional)

### Submit Button
- Shows "Sending..." while processing
- Shows "✅ Thank you!" on success
- Shows "❌ Something went wrong" on error

---

## 🧪 Test the Form

1. **Fill all required fields**:
   - School Name: "Test School"
   - Name: "John Doe"
   - Contact Number: "+1234567890"
   - Email: "test@example.com"
   - Message: "Test message (optional)"

2. **Click "Submit Enquiry"**
   - Should show "Sending..."
   - After 1-2 seconds, should show success message

3. **Check Email**
   - Open visionx236@gmail.com
   - Look for email with subject: "New School Enquiry from John Doe - Test School"
   - Check both inbox and spam folders

4. **Check Confirmation Email**
   - Open test@example.com
   - Look for confirmation email from visionx236@gmail.com

---

## 📁 Project Structure

```
visionx-form/
│
├── api/
│   └── contact.js              ← Email handler (Vercel function)
│
├── src/
│   ├── App.jsx                 ← Main form component
│   ├── App.css                 ← Styling (responsive design)
│   └── main.jsx                ← React entry point
│
├── public/                      ← Static assets (images, etc)
│
├── index.html                  ← HTML template
├── vite.config.js             ← Vite configuration
├── vercel.json                ← Vercel deployment config
├── package.json               ← Dependencies
├── .env                       ← Environment variables (local)
├── .env.example               ← Template for .env
├── .gitignore                 ← Files to ignore in Git
│
├── README.md                  ← Full documentation
├── QUICK_START.md            ← 5-minute setup guide
├── DEPLOYMENT.md             ← Vercel deployment guide
├── GMAIL_SETUP.md            ← Gmail configuration guide
└── INSTALLATION.md           ← This file
```

---

## 🎨 Key Features

### Frontend (React + Vite)
✅ Responsive design (mobile, tablet, desktop)
✅ Beautiful gradient UI
✅ Smooth animations
✅ Real-time form validation
✅ Loading/success/error states
✅ Clean, modern code

### Backend (Vercel Serverless)
✅ Email handling with Nodemailer
✅ Gmail SMTP integration
✅ Automatic confirmation emails
✅ CORS enabled
✅ Error handling
✅ No database needed

### Security
✅ Environment variables for sensitive data
✅ Input validation
✅ HTTPS on Vercel
✅ No hardcoded credentials

---

## 🛠️ Development Commands

```bash
# Start development server
npm run dev
# Access at: http://localhost:3000

# Build for production
npm run build
# Creates optimized dist/ folder

# Preview production build locally
npm run preview
# Test the built version

# Deploy to Vercel
npm run deploy
# Requires Vercel CLI installed
```

---

## 📤 Deploying to Vercel

### Quick Deploy (1 minute)
```bash
npm run deploy
```

### Manual Steps:
1. Go to https://vercel.com
2. Sign up (free)
3. Click "Import Project"
4. Select your GitHub repository
5. Add environment variables:
   - EMAIL_USER: visionx236@gmail.com
   - EMAIL_PASSWORD: [your app password]
6. Click "Deploy"

See **DEPLOYMENT.md** for detailed instructions

---

## ❌ Troubleshooting

### Error: "npm: command not found"
```
Solution: Install Node.js from https://nodejs.org
Verify: node --version should show v16+
```

### Error: "Cannot find module 'react'"
```
Solution: Run: npm install
```

### Form doesn't submit
```
1. Open browser console: F12
2. Look for red error messages
3. Check .env has EMAIL_USER and EMAIL_PASSWORD
4. See console error for details
```

### Emails not arriving
```
1. Check spam/promotions folder
2. Verify EMAIL_PASSWORD is correct (16 chars)
3. Ensure 2FA enabled on Gmail
4. See GMAIL_SETUP.md for detailed troubleshooting
```

### "Port 3000 already in use"
```
Solution: Kill the process using port 3000:
# Or run on different port:
npm run dev -- --port 3001
```

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Run locally | `npm run dev` |
| Build for prod | `npm run build` |
| Deploy to Vercel | `npm run deploy` |
| Check Node version | `node --version` |
| Check npm version | `npm --version` |

---

## 📚 Documentation Files

- **README.md** - Full project documentation
- **QUICK_START.md** - 5-minute setup
- **DEPLOYMENT.md** - Vercel deployment guide
- **GMAIL_SETUP.md** - Gmail configuration steps
- **INSTALLATION.md** - This file

---

## 🎯 Next Steps

1. ✅ Install Node.js (if not already installed)
2. ✅ Follow Steps 1-4 above
3. ✅ Run `npm install`
4. ✅ Run `npm run dev`
5. ✅ Test the form locally
6. ✅ Deploy to Vercel
7. ✅ Share the form link with your team

---

## 💡 Pro Tips

### Local Development
- Use `npm run dev` for hot reload (changes appear instantly)
- Open DevTools (F12) to debug
- Check console for errors

### Gmail Setup
- Use a dedicated Gmail account for sending
- Generate new app password for this project
- Never share app password

### Deployment
- Deploy early, test in production
- Monitor Vercel logs for errors
- Set up email notifications in Vercel

### Customization
- Colors: Edit `src/App.css` (look for #667eea)
- Text: Edit `src/App.jsx` (search for "VisionX")
- Fields: Update `src/App.jsx` and `api/contact.js`

---

## ✨ You're All Set!

Your VisionX Form is ready to:
- ✅ Collect school enquiries
- ✅ Send emails automatically
- ✅ Provide great user experience
- ✅ Scale on Vercel

**Next: Run `npm install` to get started!**

---

Made with ❤️ for VisionX
Contact: visionx236@gmail.com
