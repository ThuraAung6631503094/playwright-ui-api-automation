
import { test as base, expect } from '@playwright/test';
import { taskData } from '../../test-data/tasks';

const API_URL = 'http://127.0.0.1:5050';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TaskFixtures = {
  seededTask: Task;
};

export const test = base.extend<TaskFixtures>({
  seededTask: async ({ request }, use) => {
    // Create a fresh task before the test
    const response = await request.post(
      `${API_URL}/api/tasks`,
      { data: taskData.valid }
    );

    expect(response.status()).toBe(201);

    const task: Task = await response.json();
    expect(typeof task.id).toBe('string');

    try {
      // Provide the created task to the test
      await use(task);
    } finally {
      // Clean up after the test, even if it fails
      const cleanupResponse = await request.delete(
        `${API_URL}/api/tasks/${task.id}`
      );

      expect([204, 404]).toContain(cleanupResponse.status());
    }
  }
});

export { expect };
