
import { test, expect } from '@playwright/test';

const API_URL = 'http://127.0.0.1:5050';

// LOCAL-001: Complete CRUD lifecycle
test('LOCAL-001: Create, read, update and delete a task',
  async ({ request }) => {

  // STEP 1: Create a task
  const createResponse = await request.post(
    `${API_URL}/api/tasks`,
    {
      data: {
        title: 'Prepare QA internship portfolio'
      }
    }
  );

  expect(createResponse.status()).toBe(201);

  const createdTask = await createResponse.json();

  expect(createdTask.title).toBe(
    'Prepare QA internship portfolio'
  );
  expect(createdTask.completed).toBe(false);
  expect(typeof createdTask.id).toBe('string');

  const taskId = createdTask.id;
  let deleted = false;

  try {
    // STEP 2: Read saved task
    const getResponse = await request.get(
      `${API_URL}/api/tasks/${taskId}`
    );

    expect(getResponse.status()).toBe(200);

    const savedTask = await getResponse.json();

    expect(savedTask.id).toBe(taskId);
    expect(savedTask.title).toBe(createdTask.title);

    // STEP 3: Update the task
    const updateResponse = await request.put(
      `${API_URL}/api/tasks/${taskId}`,
      {
        data: {
          title: 'Completed QA internship portfolio',
          completed: true
        }
      }
    );

    expect(updateResponse.status()).toBe(200);

    // STEP 4: Verify update was saved
    const verifyResponse = await request.get(
      `${API_URL}/api/tasks/${taskId}`
    );

    const updatedTask = await verifyResponse.json();

    expect(verifyResponse.status()).toBe(200);
    expect(updatedTask.title).toBe(
      'Completed QA internship portfolio'
    );
    expect(updatedTask.completed).toBe(true);

    // STEP 5: Delete the task
    const deleteResponse = await request.delete(
      `${API_URL}/api/tasks/${taskId}`
    );

    expect(deleteResponse.status()).toBe(204);
    deleted = true;

    // STEP 6: Verify task no longer exists
    const missingResponse = await request.get(
      `${API_URL}/api/tasks/${taskId}`
    );

    expect(missingResponse.status()).toBe(404);

  } finally {
    // Clean up if a previous assertion failed
    if (!deleted) {
      await request.delete(`${API_URL}/api/tasks/${taskId}`);
    }
  }
});

// LOCAL-002: Reject an invalid task
test('LOCAL-002: Reject task with empty title',
  async ({ request }) => {

  const response = await request.post(
    `${API_URL}/api/tasks`,
    {
      data: {
        title: '   '
      }
    }
  );

  expect(response.status()).toBe(400);

  const body = await response.json();

  expect(body.error).toBe('Invalid task data');
});

// LOCAL-003: Return 404 for missing task
test('LOCAL-003: Reject unknown task ID',
  async ({ request }) => {

  const response = await request.get(
    `${API_URL}/api/tasks/not-a-real-id`
  );

  expect(response.status()).toBe(404);

  const body = await response.json();

  expect(body.error).toBe('Task not found');
});
