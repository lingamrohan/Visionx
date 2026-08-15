# 💻 VisionX Form - Commands Reference

Quick reference for all commands you need to run.

---

## Installation & Setup

### Install Dependencies
```bash
npm install
```
Installs all packages from `package.json`
- React, Vite, Axios, Nodemailer
- Takes 2-5 minutes first time
- Creates `node_modules/` folder

### Check Node Version
```bash
node --version
```
Should be v16 or higher (v18+ recommended)

### Check npm Version
```bash
npm --version
```
Should be v8 or higher

---

## Development

### Start Development Server
```bash
npm run dev
```
- Starts local server at http://localhost:3000
- Hot reload enabled (changes appear instantly)
- Press `q` to quit
- Logs show any errors

### Run on Different Port
```bash
npm run dev -- --port 3001
```
If port 3000 is already in use

### Stop Development Server
```bash
# Press Ctrl+C in terminal
# Or close the terminal window
```

---

## Building & Testing

### Build for Production
```bash
npm run build
```
- Creates optimized `dist/` folder
- Minifies CSS and JavaScript
- Optimizes images
- Takes 30-60 seconds
- Result ready for deployment

### Preview Production Build
```bash
npm run preview
```
- Tests the built version locally
- Similar to production environment
- Access at http://localhost:4173
- Press `q` to quit

### Check for Errors
```bash
# Look at terminal output from:
npm run dev
npm run build
```
Errors appear in red in terminal

---

## Environment Variables

### Create .env File
```bash
# Manual: Create file named .env in project root
# Add content:
EMAIL_USER=visionx236@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

### Copy from Template
```bash
cp .env.example .env
# Edit .env with your values
```

### Edit Environment Variable
```bash
# Option 1: Use text editor
# Open .env file and edit

# Option 2: Command line (Windows)
echo EMAIL_USER=visionx236@gmail.com >> .env

# Option 3: Command line (Mac/Linux)
echo "EMAIL_USER=visionx236@gmail.com" >> .env
```

### Verify Environment Variables
```bash
# Check if .env file exists
# Look for this line in output:
ls .env  # On Mac/Linux
dir .env # On Windows

# Check contents (don't show password)
cat .env | head -1  # Mac/Linux
type .env           # Windows
```

---

## Deployment to Vercel

### Install Vercel CLI
```bash
npm install -g vercel
```
Global installation (one time only)

### Login to Vercel
```bash
vercel login
```
Opens browser to authenticate
Enables CLI to deploy your projects

### Deploy Project
```bash
npm run deploy
# OR
vercel
```
- Asks project setup questions
- Creates Vercel project
- Builds and deploys
- Returns URL

### Deploy with Environment Variables
```bash
# First deployment
vercel
# Follow prompts to add environment variables

# OR add later in dashboard:
# https://vercel.com/dashboard → Select project → Settings
```

### Redeploy Latest Code
```bash
vercel --prod
```
Deploy to production immediately

### Check Deployment Status
```bash
vercel ls
```
Lists all your deployments

### View Deployment Logs
```bash
vercel logs [project-name]
```
Shows logs from production

### Add Environment Variable via CLI
```bash
vercel env add EMAIL_USER
vercel env add EMAIL_PASSWORD
```
Follow prompts to enter values

---

## Git Commands

### Initialize Git Repository
```bash
git init
```
Creates `.git/` folder for version control

### Add All Files
```bash
git add .
```
Stages all files for commit

### Commit Changes
```bash
git commit -m "Initial commit"
```
Saves changes with message

### Create Remote Repository
```bash
# Go to GitHub.com, create new repository
# Copy the URL, then:
git remote add origin https://github.com/your-username/repo-name.git
```

### Push to GitHub
```bash
git branch -M main
git push -u origin main
```
Uploads your code to GitHub

### Push Future Changes
```bash
git add .
git commit -m "Description of changes"
git push
```

---

## Cleaning & Maintenance

### Clear npm Cache
```bash
npm cache clean --force
```
If you have package installation issues

### Reinstall Dependencies
```bash
# Remove node_modules and lock file
rm -rf node_modules package-lock.json  # Mac/Linux
rmdir /s /q node_modules & del package-lock.json  # Windows

# Reinstall
npm install
```

### Remove Build Output
```bash
# Remove dist/ folder
rm -rf dist  # Mac/Linux
rmdir /s /q dist  # Windows

# Rebuild
npm run build
```

### Reset to Clean State
```bash
# Full reset (removes everything generated)
rm -rf node_modules dist package-lock.json  # Mac/Linux
rmdir /s /q node_modules dist & del package-lock.json  # Windows

# Reinstall
npm install
```

---

## Testing Commands

### Test Form Locally
```bash
npm run dev
# Open http://localhost:3000
# Fill form and submit
```

### Test with curl (API)
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "schoolName": "Test School",
    "name": "John Doe",
    "contactNumber": "+1234567890",
    "email": "test@example.com",
    "message": "Test"
  }'
```

### Test Production URL
```bash
# Get your Vercel URL from:
# vercel ls
# OR dashboard.vercel.com

# Open in browser:
# https://your-project.vercel.app
```

---

## Debugging Commands

### View Build Output
```bash
npm run build
# Detailed output shows file sizes and optimization
```

### View Development Server Log
```bash
npm run dev
# Full console output with HMR (hot reload) messages
```

### Check Configuration
```bash
# Verify Vite config
cat vite.config.js

# Verify Vercel config
cat vercel.json

# Verify package.json
cat package.json
```

### List Project Files
```bash
# Mac/Linux
ls -la

# Windows
dir

# Recursive listing
ls -R  # Mac/Linux
tree   # Windows (if available)
```

---

## Common Command Combinations

### Full Local Setup & Test
```bash
npm install
npm run dev
# Open http://localhost:3000
# Test form
# Press Ctrl+C to stop
```

### Build and Preview Production
```bash
npm run build
npm run preview
# Open http://localhost:4173
# Test production build
# Press Ctrl+C to stop
```

### Complete Deployment Flow
```bash
npm install
npm run build
vercel --prod
# Check at returned URL
```

### Development Workflow
```bash
npm run dev
# Make code changes in editor
# Changes auto-reload in browser
# View any errors in terminal
# Test form
```

---

## Vercel CLI Commands Summary

```bash
vercel login        # Login to Vercel account
vercel              # Deploy to production
vercel --prod       # Force production deployment
vercel --preview    # Deploy to preview URL
vercel ls           # List all deployments
vercel remove       # Delete a deployment
vercel logs [proj]  # View project logs
vercel env add      # Add environment variable
vercel env rm       # Remove environment variable
vercel env ls       # List environment variables
vercel --help       # Show all commands
```

---

## npm Commands Summary

```bash
npm install         # Install all dependencies
npm install -g      # Install globally
npm install [pkg]   # Install specific package
npm update          # Update all packages
npm run [script]    # Run npm script
npm list            # List installed packages
npm cache clean     # Clear npm cache
npm init            # Initialize new project
npm --version       # Check npm version
```

---

## File Editing Commands

### Edit .env File
```bash
# Use any text editor:
code .env           # VS Code
nano .env          # Nano (Mac/Linux)
vim .env           # Vim (Mac/Linux)
notepad .env       # Notepad (Windows)
```

### View File Contents
```bash
cat package.json    # Mac/Linux (full file)
type package.json   # Windows (full file)
head -20 .env       # Mac/Linux (first 20 lines)
```

---

## Troubleshooting Commands

### Check if Node Installed
```bash
node -v
npm -v
```

### Check if Port is In Use
```bash
# Mac/Linux
lsof -i :3000

# Windows
netstat -ano | findstr :3000
```

### Kill Process Using Port
```bash
# Mac/Linux
kill -9 [PID]

# Windows
taskkill /PID [PID] /F
```

### Clear Terminal
```bash
# Mac/Linux
clear

# Windows
cls
```

### Find File/Folder
```bash
# Mac/Linux
find . -name "*.env"

# Windows
dir /s .env
```

---

## Performance Commands

### Check Bundle Size
```bash
npm run build
# Look for output like:
# dist/index.js       50.2 kB
# dist/index.css       2.1 kB
```

### Analyze Build
```bash
# Install Vite analyzer
npm install --save-dev vite-plugin-visualizer

# Add to vite.config.js:
# import { visualizer } from 'vite-plugin-visualizer'

# Build and view
npm run build
# Open dist/stats.html
```

---

## Useful Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+C` | Stop running command |
| `↑` | Previous command |
| `↓` | Next command |
| `Tab` | Auto-complete |
| `Ctrl+L` | Clear screen |
| `Ctrl+A` | Go to line start |
| `Ctrl+E` | Go to line end |

---

## Command By Purpose

### "I want to..."

**Start developing**
```bash
npm install && npm run dev
```

**Test locally**
```bash
npm run dev
# Visit http://localhost:3000
```

**Deploy to Vercel**
```bash
vercel --prod
```

**Add environment variable**
```bash
vercel env add EMAIL_PASSWORD
```

**Check what's running**
```bash
npm list
```

**Fix broken project**
```bash
rm -rf node_modules && npm install
```

**Speed up development**
```bash
npm run dev
# Open http://localhost:3000
# Edit files in src/
# Watch for auto-reload
```

**Build for production**
```bash
npm run build
# Check dist/ folder
```

**Test production build**
```bash
npm run preview
# Visit http://localhost:4173
```

**See all Vercel projects**
```bash
vercel ls
```

**Clean everything**
```bash
npm cache clean --force
rm -rf node_modules dist
npm install
```

---

## Terminal Tips

### Save Command Output to File
```bash
npm run build > output.log
```

### Run Command in Background
```bash
npm run dev &
```

### Run Multiple Commands
```bash
npm install && npm run dev
# Runs second command after first completes
```

### See What npm Does
```bash
npm run dev --verbose
```

---

Made with ❤️ for VisionX
