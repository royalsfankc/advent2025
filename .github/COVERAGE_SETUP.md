# Test Coverage Setup

This repository uses [Codecov](https://codecov.io) to track and display test coverage.

## Automatic Setup (Public Repos)

For **public repositories**, Codecov works automatically - no setup required! The workflow will:
1. Run tests with coverage
2. Upload coverage to Codecov
3. Display coverage badge in README

## Manual Setup (Private Repos or Enhanced Features)

If you want enhanced features or have a private repository:

1. **Sign up for Codecov**:
   - Go to https://codecov.io
   - Sign in with your GitHub account
   - Authorize Codecov to access your repositories

2. **Add your repository**:
   - Codecov will automatically detect your repository
   - Or manually add it from the dashboard

3. **Get your Codecov token** (for private repos):
   - Go to your repository settings on Codecov
   - Copy the upload token

4. **Add token to GitHub Secrets**:
   - Go to your GitHub repository
   - Navigate to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `CODECOV_TOKEN`
   - Value: Paste your Codecov token
   - Click "Add secret"

## Features

Once set up, you'll get:
- **Coverage badge** in README showing current coverage percentage
- **Coverage reports** on Codecov dashboard with detailed line-by-line coverage
- **PR comments** (optional) showing coverage changes on pull requests
- **Coverage trends** over time
- **File-by-file coverage** breakdown

## Viewing Coverage

- **Online**: Visit https://codecov.io/gh/royalsfankc/advent2025
- **Local**: Run `npm run test:coverage` then open `coverage/lcov-report/index.html`
- **Badge**: Coverage percentage appears in README automatically

## Troubleshooting

- **Badge not showing**: Wait a few minutes after first push, or check Codecov dashboard
- **Upload fails**: For public repos, this is usually fine - Codecov will still work
- **Token errors**: Only needed for private repos or enhanced features

