
import { test, expect } from '@playwright/test';

const API_URL = 'https://jsonplaceholder.typicode.com';

// API-001: Retrieve an existing post
test('API-001: Get a post successfully', async ({ request }) => {
  const response = await request.get(`${API_URL}/posts/1`);

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  const body = await response.json();

  expect(body.id).toBe(1);
  expect(body.userId).toBe(1);
  expect(typeof body.title).toBe('string');
  expect(body.title.length).toBeGreaterThan(0);
});

// API-002: Filter posts by user ID
test('API-002: Filter posts by user', async ({ request }) => {
  const response = await request.get(`${API_URL}/posts`, {
    params: { userId: 1 }
  });

  expect(response.status()).toBe(200);

  const posts = await response.json();

  expect(Array.isArray(posts)).toBe(true);
  expect(posts.length).toBeGreaterThan(0);

  for (const post of posts) {
    expect(post.userId).toBe(1);
  }
});

// API-003: Request a nonexistent post
test('API-003: Return 404 for nonexistent post', async ({ request }) => {
  const response = await request.get(`${API_URL}/posts/999999`);

  expect(response.status()).toBe(404);
});

test('API-004: Create a new post', async ({ request }) => {
  const newPost = {
    title: 'QA Automation Testing',
    body: 'Learning API testing with Playwright',
    userId: 1
  };

  const response = await request.post(`${API_URL}/posts`, {
    data: newPost
  });

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.title).toBe(newPost.title);
  expect(body.body).toBe(newPost.body);
  expect(body.userId).toBe(newPost.userId);
  expect(body.id).toBe(101);
});

test('API-005: Replace an existing post', async ({ request }) => {
  const updatedPost = {
    id: 1,
    title: 'Updated QA Test',
    body: 'Updated through Playwright API automation',
    userId: 1
  };

  const response = await request.put(`${API_URL}/posts/1`, {
    data: updatedPost
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(1);
  expect(body.title).toBe(updatedPost.title);
  expect(body.body).toBe(updatedPost.body);
  expect(body.userId).toBe(updatedPost.userId);
});

test('API-006: Update only the post title', async ({ request }) => {
  const response = await request.patch(`${API_URL}/posts/1`, {
    data: {
      title: 'Playwright QA Automation'
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(1);
  expect(body.title).toBe('Playwright QA Automation');
  expect(typeof body.body).toBe('string');
  expect(body.body.length).toBeGreaterThan(0);
});

test('API-007: Delete an existing post', async ({ request }) => {
  const response = await request.delete(`${API_URL}/posts/1`);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toEqual({});
});
