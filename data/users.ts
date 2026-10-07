// Test data lives here, separate from test code.
// To add another login test, add a row below — no test code changes needed.
// These are the public demo accounts from https://www.saucedemo.com.

export const STANDARD_USER = {
  username: 'standard_user',
  password: 'secret_sauce',
};

export const loginScenarios = [
  {
    name: 'valid user logs in',
    username: 'standard_user',
    password: 'secret_sauce',
    error: null, // null means we expect login to succeed
  },
  {
    name: 'locked-out user is blocked',
    username: 'locked_out_user',
    password: 'secret_sauce',
    error: 'Epic sadface: Sorry, this user has been locked out.',
  },
  {
    name: 'wrong password is rejected',
    username: 'standard_user',
    password: 'wrong_password',
    error: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'empty username is rejected',
    username: '',
    password: 'secret_sauce',
    error: 'Epic sadface: Username is required',
  },
];
