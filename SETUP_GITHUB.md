# Setting Up GitHub Repository

Your local Git repository is ready! Follow these steps to create and connect to a GitHub repository:

## Option 1: Using GitHub Website (Recommended)

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `angelus-reminder-app` (or any name you prefer)
   - Description: "Mobile app that reminds users to say The Angelus prayer at scheduled times"
   - Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

2. **Connect your local repository to GitHub:**
   Run these commands in your terminal (replace `YOUR_USERNAME` with your GitHub username):

   ```bash
   cd C:\Users\usman\angelus-reminder-app
   git remote add origin https://github.com/YOUR_USERNAME/angelus-reminder-app.git
   git branch -M main
   git push -u origin main
   ```

## Option 2: Using GitHub CLI (if you install it later)

If you install GitHub CLI (`gh`), you can create the repository directly:

```bash
cd C:\Users\usman\angelus-reminder-app
gh repo create angelus-reminder-app --public --source=. --remote=origin --push
```

## After Pushing

Once you've pushed to GitHub, your repository will be available at:
`https://github.com/YOUR_USERNAME/angelus-reminder-app`

You can then:
- View your code online
- Share the repository
- Set up CI/CD
- Collaborate with others

