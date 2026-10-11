
import { test, expect } from '../fixtures/task-fixture';

const API_URL = 'http://127.0.0.1:5050';

// LOCAL-004: Verify the fixture creates a task
test('LOCAL-004: Verify automatically created task',
  async ({ request, seededTask }) => {

  const response = await request.get(
    `${API_URL}/api/tasks/${seededTask.id}`
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(seededTask.id);
  expect(body.title).toBe(seededTask.title);
  expect(body.completed).toBe(false);
});

// LOCAL-005: Update a task created by the fixture
test('LOCAL-005: Update automatically created task',
  async ({ request, seededTask }) => {

  const response = await request.put(
    `${API_URL}/api/tasks/${seededTask.id}`,
    {
      data: {
        title: 'Updated through Playwright fixture',
        completed: true
      }
    }
  );

  expect(response.status()).toBe(200);

  // Verify the update was saved
  const verifyResponse = await request.get(
    `${API_URL}/api/tasks/${seededTask.id}`
  );

  expect(verifyResponse.status()).toBe(200);

  const body = await verifyResponse.json();

  expect(body.title).toBe('Updated through Playwright fixture');
  expect(body.completed).toBe(true);
});
