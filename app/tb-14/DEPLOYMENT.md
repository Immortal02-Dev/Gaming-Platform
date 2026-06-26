# TB-14 Deployment to Vercel

## Prerequisites
- Vercel account (free tier works)
- Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Prepare Environment Variables
1. Go to your Vercel project dashboard
2. Navigate to **Settings → Environment Variables**
3. Add the following variable:
   - Name: `SESSION_SECRET`
   - Value: Generate a strong random secret (you can use https://generate-secret.vercel.app/32)
   - Environment: Check all (Production, Preview, Development)

## Step 2: Deploy to Vercel
### Option A: Deploy from Git (Recommended)
1. Push your code to a Git repository
2. Go to https://vercel.com/new
3. Import your repository
4. **Important**: In the "Project Settings" step:
   - Set **Root Directory** to `app/tb-14`
   - Verify Framework Preset is set to "Next.js"
5. Click "Deploy"

### Option B: Deploy with Vercel CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to `app/tb-14` directory
3. Run `vercel` and follow the prompts

## Step 3: Test the Deployment
After deployment is complete, open the provided Vercel URL and test:
- Registration
- Login
- Logout
- Protected routes

## Test Credentials
- Username: `testuser`
- Password: `password123`
- Admin: `admin` / `admin123`
