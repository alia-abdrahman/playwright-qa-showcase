/**
 * Test data for data-driven login tests.
 *
 * Separating test DATA from test LOGIC is a core automation principle: to add a new
 * login scenario, add an entry here — the test code stays untouched. The spec loops
 * over this table, so one row produces one test.
 *
 * These are the public demo accounts published on https://www.saucedemo.com.
 */

export interface LoginScenario {
  /** Human-readable name shown in the test report. */
  description: string;
  username: string;
  password: string;
  /** Whether we expect the login to succeed. */
  expectSuccess: boolean;
  /** For failures: the exact error banner text SauceDemo shows. */
  expectedError?: string;
}

/** The valid account used by the E2E / cart / checkout flows. */
export const STANDARD_USER = {
  username: 'standard_user',
  password: 'secret_sauce',
};

/** Positive + negative scenarios exercised by tests/ui/login.spec.ts. */
export const loginScenarios: LoginScenario[] = [
  {
    description: 'valid standard user logs in successfully',
    username: 'standard_user',
    password: 'secret_sauce',
    expectSuccess: true,
  },
  {
    description: 'locked-out user is rejected with a locked message',
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectSuccess: false,
    expectedError: 'Epic sadface: Sorry, this user has been locked out.',
  },
  {
    description: 'valid username with wrong password is rejected',
    username: 'standard_user',
    password: 'wrong_password',
    expectSuccess: false,
    expectedError: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    description: 'empty username is rejected',
    username: '',
    password: 'secret_sauce',
    expectSuccess: false,
    expectedError: 'Epic sadface: Username is required',
  },
];
