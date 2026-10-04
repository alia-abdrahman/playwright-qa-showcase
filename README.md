# Playwright QA Showcase 🎭

[![Playwright Tests](https://github.com/alia-abdrahman/playwright-qa-showcase/actions/workflows/playwright.yml/badge.svg)](https://github.com/alia-abdrahman/playwright-qa-showcase/actions/workflows/playwright.yml)

A compact, real end-to-end **test automation framework** built with **Playwright + TypeScript**.
It demonstrates UI E2E testing (Page Object Model), API testing, cross-browser execution, rich
HTML reporting, and a CI/CD pipeline on GitHub Actions.

> Built as a portfolio project to demonstrate a transition from **manual QA** to **automation testing**.

---

## 🚀 What this project demonstrates

| Capability | Where to find it | Why it matters in a QA role |
|---|---|---|
| **UI End-to-End testing** | `tests/ui/checkout.spec.ts` | Full user journey: login → cart → checkout → confirmation |
| **Page Object Model (POM)** | `pages/` | Maintainable framework design — locators in one place |
| **Data-driven testing** | `data/users.ts` + `tests/ui/login.spec.ts` | One test block → many scenarios (positive + negative) |
| **API testing** | `tests/api/booking.spec.ts` | Auth token + full CRUD, no browser needed |
| **Cross-browser** | `playwright.config.ts` | Same tests on Chromium, Firefox & WebKit |
| **CI/CD pipeline** | `.github/workflows/playwright.yml` | Tests run automatically on every push/PR |
| **Reporting & debugging** | HTML report + Trace Viewer | Screenshots, video, and step-by-step traces on failure |

---

## 🧱 Project structure

```
playwright-qa-showcase/
├── pages/                  # Page Object Model — one class per page
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/
│   ├── ui/                 # Browser tests
│   │   ├── login.spec.ts   # data-driven login (valid + 3 negative cases)
│   │   ├── cart.spec.ts    # add / remove items
│   │   └── checkout.spec.ts# full E2E purchase flow
│   └── api/
│       └── booking.spec.ts # REST API CRUD + auth
├── data/users.ts           # test data (data-driven source)
├── playwright.config.ts    # browsers, reporter, traces, baseURL
└── .github/workflows/      # CI pipeline
```

**Applications under test (public practice sites):**
- UI: [SauceDemo](https://www.saucedemo.com)
- API: [restful-booker](https://restful-booker.herokuapp.com)

---

## ▶️ How to run

```bash
# 1. Install dependencies (one time)
npm install
npx playwright install         # downloads the browsers

# 2. Run everything (all browsers)
npm test

# Useful variants:
npm run test:chromium          # just Chromium (fastest)
npm run test:ui                # only the UI tests
npm run test:api               # only the API tests
npm run test:headed            # WATCH the browser drive itself (great for demos)
npm run test:debug             # step through tests with the Playwright Inspector

# 3. Open the HTML report after a run
npm run report
```

Explore how selectors are generated (a great learning tool):

```bash
npm run codegen                # records your clicks into Playwright code
```

---

## 🛠️ Tech stack

- [Playwright](https://playwright.dev/) `@playwright/test`
- TypeScript
- Node.js
- GitHub Actions (CI)
