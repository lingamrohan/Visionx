# Gmail Setup Guide - VisionX Form

## 📧 Configure Gmail for Email Sending

This guide shows how to set up Gmail to send emails through the VisionX Form.

---

## Step 1: Enable 2-Factor Authentication

1. Go to https://myaccount.google.com/
2. Click "Security" in the left menu
3. Scroll to "Signing in to Google"
4. Click "2-Step Verification"
5. Follow the prompts to enable 2FA
   - Verify with your phone number
   - Scan QR code with authenticator app (optional)
   - Save backup codes in a safe place
6. Click "Activate" to confirm

---

## Step 2: Generate App Password

1. Go to https://myaccount.google.com/apppasswords
2. Log in if prompted
3. Select **Mail** from the first dropdown
4. Select **Windows Computer** from the second dropdown
5. Click **Generate**
6. Google creates a 16-character password like: `xxxx xxxx xxxx xxxx`

### Important:
- ✅ Copy the password exactly (including spaces or as shown)
- ❌ Do NOT change or modify it
- ❌ Do NOT share with anyone
- ✅ Save it somewhere safe

---

## Step 3: Update .env File

### Option A: Local Development
```env
EMAIL_USER=visionx236@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

Save to `.env` file in project root

### Option B: Vercel Deployment
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - Key: `EMAIL_USER`
   - Value: `visionx236@gmail.com`
5. Add:
   - Key: `EMAIL_PASSWORD`
   - Value: `xxxx xxxx xxxx xxxx`
6. Click "Save"

---

## Step 4: Test Email Configuration

### Option A: Run Locally
```bash
npm install
npm run dev
```
- Fill the form with test data
- Click "Submit Enquiry"
- Check visionx236@gmail.com inbox
- Look for the test email

### Option B: Use Curl (Advanced)
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "schoolName": "Test School",
    "name": "John Doe",
    "contactNumber": "+1234567890",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

---

## Troubleshooting Email Issues

### Problem: "Invalid login"
```
Error: Invalid login
```

**Causes**:
1. Wrong EMAIL_PASSWORD
2. Used regular Gmail password instead of app password
3. 2FA not enabled
4. Credentials have spaces

**Solutions**:
- Generate new app password
- Copy exactly without modification
- Ensure 2FA is enabled
- Remove any extra spaces

### Problem: "Less secure apps not allowed"
```
Error: Please enable "Less secure apps"
```

**Solution** (if you don't have 2FA):
1. Go to https://myaccount.google.com/u/0/lesssecureapps
2. Enable "Less secure app access"
3. Try again

### Problem: "SMTP Error: Authentication failed"
```
Error: SMTP Error: Authentication failed
```

**Solution**:
1. Verify EMAIL_USER is correct
2. Generate new app password
3. Check environment variables in Vercel
4. Ensure 2FA is enabled

### Problem: "Emails not arriving"

**Checklist**:
- [ ] Check spam/promotions folder
- [ ] Verify recipient email is correct
- [ ] Check Gmail activity at https://myaccount.google.com/activity
- [ ] Check Vercel logs for errors
- [ ] Test with browser DevTools (F12)

### Problem: "Error: connect ECONNREFUSED"

**Solution**: This means the API can't connect to Gmail servers
1. Check internet connection
2. Verify EMAIL_USER and EMAIL_PASSWORD
3. Check firewall settings
4. Try restarting the server

---

## Testing Checklist

- [ ] 2FA is enabled on Gmail
- [ ] App password generated (16 characters)
- [ ] .env file has EMAIL_USER and EMAIL_PASSWORD
- [ ] Form submits without errors
- [ ] Email received in visionx236@gmail.com
- [ ] Confirmation email works
- [ ] Emails have proper formatting
- [ ] No emails in spam folder

---

## Security Tips

### 1. Use Dedicated Gmail Account (Recommended)
Instead of your personal Gmail, create a separate account just for sending emails:

```bash
# Steps:
1. Go to accounts.google.com
2. Create new account (e.g., visionx.forms@gmail.com)
3. Enable 2FA on new account
4. Generate app password
5. Use in .env and Vercel
```

### 2. Rotate App Password Regularly
```bash
# Every 30 days:
1. Go to https://myaccount.google.com/apppasswords
2. Delete old password
3. Generate new one
4. Update in .env and Vercel
```

### 3. Monitor Gmail Activity
```bash
# Check for suspicious access:
1. Go to https://myaccount.google.com/activity
2. Review login history
3. Check connected apps
4. Remove unused apps
```

### 4. Never Commit .env
Always add `.env` to `.gitignore`:
```
.env
.env.local
```

---

## Using a Different Email Service

If you prefer not to use Gmail, you can use:

### SendGrid
```javascript
// In api/contact.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
await sgMail.send({ ... });
```

### MailGun
```javascript
// In api/contact.js
const mailgun = require('mailgun.js');
const mg = mailgun.client({ ... });
await mg.messages.create(...);
```

### AWS SES
```javascript
// In api/contact.js
const AWS = require('aws-sdk');
const SES = new AWS.SES({ ... });
await SES.sendEmail(...).promise();
```

---

## FAQ

**Q: Can I use a free Gmail account?**
A: Yes! Free accounts get 500 emails/day limit.

**Q: What's the difference between app password and Gmail password?**
A: App passwords are 16-character single-use passwords that are more secure.

**Q: Do I need to regenerate the app password?**
A: No, unless you want to for security. It doesn't expire.

**Q: Can I use the same app password for multiple projects?**
A: Yes, but it's not recommended for security. Use one per project.

**Q: What if I forget my app password?**
A: You can delete it and generate a new one anytime.

**Q: How do I know if emails are being sent?**
A: Check:
1. Gmail inbox for incoming emails
2. Browser console (F12) for errors
3. Vercel logs for API responses

---

## Next Steps

1. ✅ Enable 2FA on Gmail
2. ✅ Generate app password
3. ✅ Update .env or Vercel environment variables
4. ✅ Test the form locally
5. ✅ Deploy to Vercel
6. ✅ Test production form
7. ✅ Monitor emails

---

## Still Having Issues?

1. **Check the Vercel logs**:
   - Go to vercel.com/dashboard
   - Select project → Deployments
   - Click on latest deployment
   - Check "Logs" tab

2. **Debug locally**:
   ```bash
   npm run dev
   # Open http://localhost:3000
   # Check terminal output for errors
   # Open browser console (F12)
   ```

3. **Verify email settings**:
   - Go to https://myaccount.google.com/security
   - Ensure 2FA is enabled
   - Check app passwords are active

4. **Contact Gmail Support**:
   - Go to https://support.google.com
   - Search for your error

---

Made with ❤️ for VisionX
