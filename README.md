# Playwright QA Showcase 🎭

[![Playwright Tests](https://github.com/alia-abdrahman/playwright-qa-showcase/actions/workflows/playwright.yml/badge.svg)](https://github.com/alia-abdrahman/playwright-qa-showcase/actions/workflows/playwright.yml)

A small test automation framework built with **Playwright + TypeScript**.
10 automated tests cover a real web shop end to end, plus a REST API — and they run
automatically on GitHub Actions on every push.

> Built as a portfolio project to show my move from **manual QA** to **automation testing**.

---

## ▶️ How to run it

```bash
npm install              # install, one time
npx playwright install   # download the browser, one time

npm test                 # run all 10 tests (takes a few seconds)
npm run test:headed      # watch the browser drive itself — best for a demo
npm run report           # open the HTML report from the last run
```

Only part of the suite:

```bash
npm run test:ui          # the 8 browser tests
npm run test:api         # the 2 API tests
```

---

## 🚀 What it covers

| What | Where | Why it matters |
|---|---|---|
| **End-to-end user journey** | `tests/ui/checkout.spec.ts` | login → add to cart → checkout → order confirmed |
| **Page Object Model** | `pages/` | Selectors live in one place, so UI changes mean a one-file fix |
| **Data-driven tests** | `data/users.ts` + `tests/ui/login.spec.ts` | One loop creates 4 tests: 1 positive, 3 negative |
| **API testing** | `tests/api/booking.spec.ts` | Auth token + create/read/delete, no browser needed |
| **CI pipeline** | `.github/workflows/playwright.yml` | Tests run on every push and pull request |
| **Failure evidence** | `playwright.config.ts` | Screenshot, video and replayable trace whenever a test fails |

---

## 🧱 How it is organised

```
pages/                    # Page Object Model — one class per page
  LoginPage.ts
  InventoryPage.ts        # the products page
  CartPage.ts
  CheckoutPage.ts
tests/
  ui/login.spec.ts        # data-driven login: valid + 3 invalid cases
  ui/cart.spec.ts         # add and remove items
  ui/checkout.spec.ts     # the full purchase journey
  api/booking.spec.ts     # REST API: auth, create, read, delete
data/users.ts             # test data, kept out of the test code
playwright.config.ts      # browser, base URL, reporting, retries
```

Each test file is short on purpose: the "how do I click this" detail sits in `pages/`,
so the tests themselves read like a description of what a user does.

**Sites under test** (both free public practice sites):
- UI — [SauceDemo](https://www.saucedemo.com)
- API — [restful-booker](https://restful-booker.herokuapp.com)

---

## 🛠️ Built with

Playwright · TypeScript · Node.js · GitHub Actions

Runs on Chromium by default to keep it fast. Firefox and WebKit are two commented-out
lines in `playwright.config.ts` — uncomment them and the same tests run on all three.
