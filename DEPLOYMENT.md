# GitHub Pages Deployment Guide

This guide will help you deploy the SMB Compliance Hub frontend to GitHub Pages.

## Prerequisites

1. **GitHub Account**: You need a GitHub account
2. **Repository**: Your project should be pushed to a GitHub repository
3. **Node.js**: Make sure you have Node.js 18+ installed

## Step-by-Step Deployment

### 1. Update Repository Settings

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. This will allow the GitHub Actions workflow to deploy your site

### 2. Update Package.json

Make sure your `package.json` has the correct homepage URL:

```json
{
  "homepage": "https://your-username.github.io/SMBComplianceHub"
}
```

Replace `your-username` with your actual GitHub username.

### 3. Push to GitHub

Commit and push your changes to the main branch:

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

### 4. Monitor Deployment

1. Go to your repository on GitHub
2. Click on the **Actions** tab
3. You should see a workflow running called "Deploy to GitHub Pages"
4. Wait for it to complete (usually takes 2-3 minutes)

### 5. Access Your Site

Once deployment is complete, your site will be available at:
`https://your-username.github.io/SMBComplianceHub`

## Manual Deployment

If you prefer to deploy manually:

```bash
# Build the frontend
npm run build:frontend

# Deploy to GitHub Pages
npm run deploy
```

## Troubleshooting

### Common Issues

1. **404 Errors**: Make sure your repository is public or you have GitHub Pro for private repositories
2. **Build Failures**: Check the Actions tab for error details
3. **Routing Issues**: The app uses client-side routing, which should work with GitHub Pages

### Environment Variables

For the static deployment, the app uses mock data. If you want to connect to a real backend:

1. Deploy your backend to a service like Vercel, Railway, or Heroku
2. Update the API calls in `client/src/lib/data.ts` to point to your backend URL
3. Remove the `isStaticEnvironment()` checks

## Custom Domain (Optional)

To use a custom domain:

1. Go to repository **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Add a CNAME file to your repository root with your domain
4. Configure your DNS provider to point to `your-username.github.io`

## Backend Deployment

The backend can be deployed separately to:

- **Vercel**: Great for serverless functions
- **Railway**: Easy deployment with database
- **Heroku**: Traditional hosting
- **DigitalOcean App Platform**: Scalable hosting

Once deployed, update the API endpoints in the frontend to point to your backend URL. 