# LazyCoin Deployment Guide

Since you want to host this on Vercel, here is the laziest way to do it.

## Prerequisites
- A GitHub account
- A Vercel account

## Steps

### 1. Push to GitHub
I have already initialized a Git repository in the `LAZY` folder for you. You just need to push it to a new repository.

1.  Create a **new repository** on GitHub (call it `lazy-coin` or whatever).
2.  Run these commands in your terminal (inside the `LAZY` folder):

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lazy-coin.git
git push -u origin main
```

*(Replace `YOUR_USERNAME` with your actual GitHub username)*

### 2. Connect to Vercel
1.  Go to [Vercel.com](https://vercel.com) and log in.
2.  Click **"Add New..."** -> **"Project"**.
3.  Select **"Continue with GitHub"**.
4.  Find your `lazy-coin` repository and click **"Import"**.
5.  **Build Settings**:
    - **Framework Preset**: select "Other" (or leave it as is, Vercel detects HTML).
    - **Build Command**: Leave empty.
    - **Output Directory**: Leave empty (root).
6.  **Environment Variables**:
    - Go to **Settings** -> **Environment Variables**.
    - Add Key: `BAGS_API_KEY`
    - Add Value: `YOUR_ACTUAL_API_KEY_STARTING_WITH_bags_prod`
    - Save.
7.  Click **"Deploy"** (or Redeploy if you already did).

That's it. It will be live in seconds.
