# Playwright API Testing Project

This project contains automated API tests using Playwright and generates Allure HTML reports. You can run tests locally, generate reports, and view them online via GitHub Pages.

## Overview

- Run automated API tests using Playwright.  
- Generate interactive Allure HTML reports.  
- View reports online via GitHub Pages.  
- Organized repository with separate folders for tests, utilities, and test data.

## Setup and Running Tests

- Clone the repository and navigate into it:  
  `git clone https://github.com/MariaTaskin01/Playwright_API_Testing_02.git`  
  `cd Playwright_API_Testing_02`

- Install all dependencies:  
  `npm install`

- (Optional) Install Allure CLI globally:  
  `npm install -g allure-commandline --save-dev`

- Run all tests:  
  `npx playwright test`

- Run a specific test file:  
  `npx playwright test tests/your_test_file.spec.js`

- Open Playwright Test UI for interactive testing:  
  `npx playwright test --ui`

## Generating and Viewing Allure Reports

- Run tests to generate raw results in the `allure-results` folder.  
- Generate an interactive HTML report:  
  `npx allure generate allure-results --clean -o allure-report`

- Open the report in browser:  
  `npx allure open`

- Report includes test summaries, execution timelines, pass/fail statistics, and graphs.

## Viewing Reports Online via GitHub Pages

- HTML report is hosted via GitHub Pages from the `allure-report` folder.  
- Open the GitHub Pages URL in a browser to view the report.  
- Browsing the repository directly on GitHub only shows source files; the rendered report is accessible via the Pages link.

## Repository Structure

- `tests/` – Playwright test files  
- `utils/` – Utility scripts  
- `test-data/` – Test data files  
- `allure-results/` – Raw results (ignored in GitHub)  
- `allure-report/` – Generated HTML report (served via GitHub Pages)  
- `package.json` and `package-lock.json` – Dependency management  
- `playwright.config.js` – Playwright configuration  
- `README.md` – Project documentation

## Updating GitHub Pages Report

- Regenerate the HTML report from the latest test results.  
- Deploy the `allure-report` folder to the `/docs` folder of the main branch.  

## Notes

- The `allure-results` folder is only for local report generation and is not pushed to GitHub.  
- GitHub Pages allows sharing interactive reports online.  
- Automated deployment ensures the report stays up-to-date.
