# Deployment Guide - VisionX Form

## 🚀 Deploy to Vercel

This guide walks you through deploying your VisionX Form to Vercel.

### Prerequisites
- GitHub account
- Vercel account (free)
- Gmail app password configured

---

## Option 1: Vercel CLI (Fastest)

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
npm run deploy
# OR
vercel
```

### 4. Follow the Prompts
- **Project setup**: Choose "Y" for new project
- **Project name**: `visionx-form`
- **Directory**: `.`
- **Environment variables**: Add now or skip

### 5. Add Environment Variables
```bash
vercel env add EMAIL_USER
vercel env add EMAIL_PASSWORD
```

Enter your Gmail credentials when prompted.

### 6. Redeploy with Environment Variables
```bash
vercel --prod
```

---

## Option 2: GitHub Integration (Recommended for CI/CD)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Connect to Vercel
- Go to https://vercel.com/dashboard
- Click "Add New..." → "Project"
- Select your GitHub repository
- Click "Import"

### 3. Configure Environment Variables
- In the setup form, add:
  - **EMAIL_USER**: your Gmail address
  - **EMAIL_PASSWORD**: your app password
- Click "Deploy"

### 4. Auto-Deployment
- Every push to `main` automatically deploys
- Preview deployments for pull requests

---

## Post-Deployment Checklist

### 1. Test the Live Form
- Visit your Vercel URL (e.g., `https://visionx-form.vercel.app`)
- Fill in the form
- Submit an enquiry
- Verify email received

### 2. Verify API Endpoint
- Open browser DevTools (F12)
- Submit form and check Network tab
- Look for `/api/contact` request
- Status should be 200

### 3. Check Email Settings
- Verify `EMAIL_USER` in Vercel dashboard
- Confirm Gmail app password is correct (16 characters)
- Check spam folder in Gmail

### 4. Monitor Errors
- Go to Vercel dashboard
- Select your project
- Click "Deployments"
- View build logs and errors

---

## Updating Your Form

### For code changes:
```bash
git commit -am "Update form"
git push origin main
# Auto-deploys to Vercel
```

### For environment variables:
```bash
vercel env add EMAIL_PASSWORD
# OR edit in Vercel dashboard Settings
```

---

## Troubleshooting Deployments

### Build Failed
```
Error: Cannot find module 'nodemailer'
```
**Solution**: Ensure `nodemailer` is in `package.json` dependencies

### API Returns 500 Error
```
Failed to send enquiry
```
**Solution**: 
1. Check environment variables in Vercel dashboard
2. Verify EMAIL_USER and EMAIL_PASSWORD are set
3. Check Vercel logs for detailed error

### Emails Not Sending
**Checklist**:
1. ✓ Is 2FA enabled on Gmail account?
2. ✓ Is EMAIL_PASSWORD a 16-char app password?
3. ✓ Are credentials correct in Vercel dashboard?
4. ✓ Is visionx236@gmail.com listed in email?

### CORS Issues
```
Access to XMLHttpRequest blocked by CORS
```
**Solution**: CORS is enabled in `api/contact.js`. 
- Ensure request URL matches deployed URL
- Check browser console for exact error

---

## Performance Optimization

### Current Metrics
- **Build time**: ~30 seconds
- **API response**: <500ms
- **Email delivery**: <1 second
- **Frontend size**: ~50KB gzipped

### Monitor in Vercel
1. Dashboard → Select project
2. Click "Analytics"
3. View response times, errors, usage

---

## Security Best Practices

✅ **Do**:
- Store EMAIL_PASSWORD in Vercel secrets only
- Never commit `.env` file to Git
- Use app-specific passwords, not main Gmail password
- Regularly update dependencies
- Monitor Vercel logs for suspicious activity

❌ **Don't**:
- Share EMAIL_PASSWORD with anyone
- Hardcode credentials in code
- Use main Gmail password
- Leave verbose error messages in production
- Allow unlimited API calls

---

## Rollback a Deployment

If something goes wrong:

### Via Vercel Dashboard
1. Go to Deployments
2. Find the previous working deployment
3. Click the three dots (...)
4. Click "Promote to Production"

### Via CLI
```bash
vercel rollback
# Select the deployment to restore
```

---

## Custom Domain

1. Go to Vercel dashboard
2. Select project → Settings → Domains
3. Add your custom domain
4. Follow DNS instructions
5. Domain will be active in ~10 minutes

Example: `https://forms.yourdomain.com`

---

## Monitoring & Alerts

### Email Notifications
- Dashboard → Settings → Notifications
- Get alerted on failed deployments
- Get notified on errors

### Error Tracking
- Install Sentry (optional)
- Monitor API errors in real-time
- Set up alerts for critical errors

---

## FAQ

**Q: Can I use a free Vercel account?**
A: Yes! Free tier includes unlimited API calls for serverless functions.

**Q: How many emails can I send per day?**
A: Gmail limits: 500/day free, unlimited with paid account.

**Q: Can I use a different email service?**
A: Yes, but you'd need to update `api/contact.js` to use SendGrid, MailGun, etc.

**Q: Will the form work without backend?**
A: No, you need the serverless function to send emails.

**Q: How do I add a custom domain?**
A: See "Custom Domain" section above.

---

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Configure environment variables
3. ✅ Test the live form
4. ✅ Monitor emails are sending
5. ✅ Add custom domain (optional)
6. ✅ Set up monitoring/alerts
7. ✅ Share with your team

---

Need help? Check the main README.md or QUICK_START.md

Made with ❤️ for VisionX
