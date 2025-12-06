# Advent of Code 2025

[![Tests](https://github.com/royalsfankc/advent2025/actions/workflows/test.yml/badge.svg)](https://github.com/royalsfankc/advent2025/actions/workflows/test.yml)

A JavaScript project for solving Advent of Code 2025 puzzles, with a web interface that can be served on GitHub Pages. Built with clean code practices and comprehensive testing using Jest.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. Start the local server:
   ```bash
   npm run serve
   ```
   This will automatically open your browser to `http://localhost:8080`

   **Alternative methods:**
   - Python: `python3 -m http.server 8080` (then open `http://localhost:8080`)
   - VS Code: Use the "Live Server" extension

## Structure

- `index.html` - Main page with buttons for each day
- `js/main.js` - Main JavaScript file that handles button clicks and displays answers
- `js/main.test.js` - Tests for main.js functions
- `day1/`, `day2/`, etc. - Folders for each day's puzzle
  - `solution.js` - Solution code for that day (with exported functions for testing)
  - `solution.test.js` - Tests for all functions in solution.js
  - `input.txt` - Input file for that day
- `REPO_RULES.md` - Coding standards and practices for this repository
- `.cursorrules` - AI assistant rules (automatically used by Cursor)

## Code Standards

This project follows strict coding standards:
- **Every function must have tests** - No exceptions
- **Simple, clean code** - Follow best practices
- **Pure functions preferred** - Minimize side effects
- **Test-driven development** - Write tests when creating or modifying functions

See `REPO_RULES.md` for complete guidelines. The `.cursorrules` file ensures AI assistants automatically follow these rules.

## How to Use

1. Start the local server: `npm run serve`
2. Your browser will open automatically (or go to `http://localhost:8080`)
3. Click a day button on the main page
4. The solution will be executed and the answer displayed

## Adding a New Day

1. Create a new folder `dayN/` where N is the day number
2. Create `dayN/solution.js` with:
   - Helper functions (exported for testing)
   - `solvePart1(input)` function (exported)
   - `solvePart2(input)` function (exported)
   - `solve()` function (exported, main entry point)
3. Create `dayN/solution.test.js` with tests for all functions
4. Add your input to `dayN/input.txt`
5. Run tests: `npm test`

## Testing

- Run all tests: `npm test`
- Run tests in watch mode: `npm test -- --watch`
- Run tests with coverage: `npm test -- --coverage`
- Run tests for a specific day: `npm test -- day1`

## CI/CD Pipeline

This repository uses GitHub Actions to automatically run tests on every push and pull request:

- **Automatic testing**: All tests run automatically on push to `main` and on pull requests
- **Merge protection**: Pull requests cannot be merged if tests fail
- **Status badge**: Test status is displayed in the README and on pull requests
- **Local pre-push hook**: Tests run locally before pushing to `main` (prevents pushing failing code)

### Local Protection

A git pre-push hook is configured to run tests before allowing pushes to `main`. If tests fail:
- The push is blocked
- You must fix the tests before pushing
- This prevents broken code from reaching the repository

To set up the hook (if not already present):
```bash
chmod +x .git/hooks/pre-push
```

### GitHub Actions Workflow

The workflow runs:
1. Checks out the code
2. Sets up Node.js
3. Installs dependencies with `npm ci`
4. Runs all tests with `npm test`
5. Optionally checks test coverage

See `.github/workflows/test.yml` for the workflow configuration.

## GitHub Pages Setup

1. Go to your repository settings
2. Navigate to Pages
3. Select the branch (usually `main`) and folder (`/` root)
4. The site will be available at `https://yourusername.github.io/advent2025/`

