# Landing Page Deployment to Vercel

## Prerequisites
- Vercel account (free tier works)
- Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Deploy to Vercel
### Option A: Deploy from Git (Recommended)
1. Push your code to a Git repository
2. Go to https://vercel.com/new
3. Import your repository
4. **Important**: In the "Project Settings" step:
   - Set **Root Directory** to `app/landingpage`
   - Verify Framework Preset is set to "Next.js"
5. Click "Deploy"

### Option B: Deploy with Vercel CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to `app/landingpage` directory
3. Run `vercel` and follow the prompts
