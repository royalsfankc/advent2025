# GitHub Pages Setup Guide

## Quick Setup Steps

1. **Add all files to git:**
   ```bash
   git add .
   ```

2. **Make your first commit:**
   ```bash
   git commit -m "Initial commit: Advent of Code 2025 with Day 1 solution"
   ```

3. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it (e.g., `advent2025`)
   - **Don't** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

4. **Connect and push:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/advent2025.git
   git branch -M main
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` with your GitHub username)

5. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select:
     - Branch: `main`
     - Folder: `/` (root)
   - Click **Save**
   - Wait a few minutes for GitHub to build your site

6. **Access your site:**
   - Your site will be available at:
     `https://YOUR_USERNAME.github.io/advent2025/`

## Important Files for GitHub Pages

- ✅ `index.html` - Main page
- ✅ `.nojekyll` - Tells GitHub Pages not to use Jekyll (needed for ES modules)
- ✅ All day folders with solutions
- ✅ `js/main.js` - Main JavaScript file

## Testing Locally Before Pushing

You can test that everything works locally:
```bash
npm run serve
```

Then open `http://localhost:8080` in your browser and test the Day 1 button.

## Notes

- The `.nojekyll` file is important - it allows GitHub Pages to serve your ES modules correctly
- Your input file `day1/day1input.txt` will be included in the repository
- All tests are included but won't run on GitHub Pages (they're for local development)

