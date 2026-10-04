import { test, expect } from '@playwright/test';

/**
 * API testing with Playwright's built-in `request` fixture — no browser involved.
 *
 * Target: restful-booker (https://restful-booker.herokuapp.com), a public practice API.
 * We exercise a full CRUD lifecycle plus token auth:
 *   auth -> create -> read -> update -> delete -> verify deletion
 *
 * Covering the API layer catches contract and data regressions that a UI test would
 * either miss or report as a confusing front-end failure.
 */

const BASE = 'https://restful-booker.herokuapp.com';

// A fresh booking payload used to create a record.
const newBooking = {
  firstname: 'Test',
  lastname: 'User',
  totalprice: 250,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-10-01',
    checkout: '2026-10-05',
  },
  additionalneeds: 'Breakfast',
};

test.describe('restful-booker API — booking lifecycle', () => {
  test('auth returns a token', async ({ request }) => {
    const res = await request.post(`${BASE}/auth`, {
      data: { username: 'admin', password: 'password123' },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.token).toBeTruthy();
  });

  test('create, read, update, and delete a booking', async ({ request }) => {
    // --- Auth: get a token for the protected update/delete calls ---
    const authRes = await request.post(`${BASE}/auth`, {
      data: { username: 'admin', password: 'password123' },
    });
    expect(authRes.ok()).toBeTruthy();
    const token = (await authRes.json()).token as string;

    // --- CREATE ---
    const createRes = await request.post(`${BASE}/booking`, {
      headers: { Accept: 'application/json' },
      data: newBooking,
    });
    expect(createRes.status()).toBe(200);
    const created = await createRes.json();
    const bookingId = created.bookingid as number;
    expect(bookingId).toBeGreaterThan(0);
    expect(created.booking.firstname).toBe(newBooking.firstname);

    // --- READ ---
    const getRes = await request.get(`${BASE}/booking/${bookingId}`, {
      headers: { Accept: 'application/json' },
    });
    expect(getRes.status()).toBe(200);
    const fetched = await getRes.json();
    expect(fetched.lastname).toBe(newBooking.lastname);
    expect(fetched.totalprice).toBe(newBooking.totalprice);

    // --- UPDATE (requires the auth token via cookie) ---
    const updatedPayload = { ...newBooking, firstname: 'Test-Updated', totalprice: 500 };
    const putRes = await request.put(`${BASE}/booking/${bookingId}`, {
      headers: {
        Accept: 'application/json',
        Cookie: `token=${token}`,
      },
      data: updatedPayload,
    });
    expect(putRes.status()).toBe(200);
    const updated = await putRes.json();
    expect(updated.firstname).toBe('Test-Updated');
    expect(updated.totalprice).toBe(500);

    // --- DELETE ---
    const deleteRes = await request.delete(`${BASE}/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` },
    });
    // restful-booker returns 201 Created on a successful delete (quirky but real).
    expect(deleteRes.status()).toBe(201);

    // --- VERIFY DELETION: the record should now be gone (404) ---
    const verifyRes = await request.get(`${BASE}/booking/${bookingId}`);
    expect(verifyRes.status()).toBe(404);
  });
});
