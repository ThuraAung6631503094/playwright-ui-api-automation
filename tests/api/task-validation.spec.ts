
import { test, expect } from '../fixtures/task-fixture';
import { taskData } from '../../test-data/tasks';

const API_URL = 'http://127.0.0.1:5050/api/tasks';

// Test minimum and maximum accepted title lengths
const validCases = [
  {
    id: 'LOCAL-006',
    description: 'minimum title length',
    title: 'A'
  },
  {
    id: 'LOCAL-007',
    description: 'maximum title length',
    title: 'A'.repeat(100)
  }
];

for (const scenario of validCases) {
  test(`${scenario.id}: Accept ${scenario.description}`,
    async ({ request }) => {

    const response = await request.post(API_URL, {
      data: { title: scenario.title }
    });

    expect(response.status()).toBe(201);

    const created = await response.json();

    try {
      expect(created.title).toBe(scenario.title);

      // Verify the task was saved
      const readResponse = await request.get(
        `${API_URL}/${created.id}`
      );

      expect(readResponse.status()).toBe(200);

      const saved = await readResponse.json();
      expect(saved.title).toBe(scenario.title);

    } finally {
      // Remove the task after testing
      if (typeof created.id === 'string') {
        const cleanup = await request.delete(
          `${API_URL}/${created.id}`
        );

        expect(cleanup.status()).toBe(204);
      }
    }
  });
}

// Test invalid task inputs
const invalidCases = [
  {
    id: 'LOCAL-008',
    description: 'empty title',
    payload: {
      title: taskData.invalid.emptyTitle
    }
  },
  {
    id: 'LOCAL-009',
    description: 'numeric title',
    payload: {
      title: taskData.invalid.numericTitle
    }
  },
  {
    id: 'LOCAL-010',
    description: 'title longer than 100 characters',
    payload: {
      title: taskData.invalid.tooLongTitle
    }
  },
  {
    id: 'LOCAL-011',
    description: 'invalid completed value',
    payload: {
      title: taskData.valid.title,
      completed: 'yes'
    }
  }
];

for (const scenario of invalidCases) {
  test(`${scenario.id}: Reject ${scenario.description}`,
    async ({ request }) => {

    const response = await request.post(API_URL, {
      data: scenario.payload
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.error).toBe('Invalid task data');
  });
}

// LOCAL-012: Reject malformed JSON

test('LOCAL-012: Reject malformed JSON',
  async ({ request }) => {

  // Send deliberately malformed JSON as raw bytes
  const response = await request.post(API_URL, {
    headers: {
      'Content-Type': 'application/json'
    },
    data: Buffer.from('{"title":')
  });

  // Verify the server rejects the malformed JSON
  expect(response.status()).toBe(400);

  const body = await response.json();

  expect(body.error).toBe(
    'Invalid JSON or request body'
  );
});

// LOCAL-013: Reject invalid updates and preserve original data
test('LOCAL-013: Invalid update must not change saved task',
  async ({ request, seededTask }) => {

  // Attempt an invalid update
  const updateResponse = await request.put(
    `${API_URL}/${seededTask.id}`,
    {
      data: {
        title: taskData.invalid.tooLongTitle,
        completed: true
      }
    }
  );

  expect(updateResponse.status()).toBe(400);

  // Retrieve the original task
  const readResponse = await request.get(
    `${API_URL}/${seededTask.id}`
  );

  expect(readResponse.status()).toBe(200);

  const savedTask = await readResponse.json();

  // Verify that the invalid update was not saved
  expect(savedTask.id).toBe(seededTask.id);
  expect(savedTask.title).toBe(seededTask.title);
  expect(savedTask.completed).toBe(seededTask.completed);
});
