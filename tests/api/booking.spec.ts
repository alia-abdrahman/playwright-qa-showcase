import { test, expect } from '@playwright/test';

// API tests use Playwright's `request` fixture — no browser, so they run in
// milliseconds. Target: restful-booker, a free practice API.
// Checking the API directly catches backend bugs that a UI test would only
// show as a confusing front-end failure.

const BASE = 'https://restful-booker.herokuapp.com';

const booking = {
  firstname: 'Test',
  lastname: 'User',
  totalprice: 250,
  depositpaid: true,
  bookingdates: { checkin: '2026-10-01', checkout: '2026-10-05' },
};

test('logging in returns an auth token', async ({ request }) => {
  const response = await request.post(`${BASE}/auth`, {
    data: { username: 'admin', password: 'password123' },
  });

  expect(response.status()).toBe(200);
  expect((await response.json()).token).toBeTruthy();
});

test('a booking can be created, read back, and deleted', async ({ request }) => {
  // Create.
  const created = await request.post(`${BASE}/booking`, { data: booking });
  expect(created.status()).toBe(200);

  const bookingId = (await created.json()).bookingid;

  // Read it back and check the data was saved correctly.
  const fetched = await request.get(`${BASE}/booking/${bookingId}`);
  expect(fetched.status()).toBe(200);
  expect(await fetched.json()).toMatchObject({
    firstname: 'Test',
    lastname: 'User',
    totalprice: 250,
  });

  // Delete needs a token, sent as a cookie.
  const auth = await request.post(`${BASE}/auth`, {
    data: { username: 'admin', password: 'password123' },
  });
  const token = (await auth.json()).token;

  const deleted = await request.delete(`${BASE}/booking/${bookingId}`, {
    headers: { Cookie: `token=${token}` },
  });
  expect(deleted.status()).toBe(201); // this API returns 201 on delete

  // The booking really is gone.
  const gone = await request.get(`${BASE}/booking/${bookingId}`);
  expect(gone.status()).toBe(404);
});
