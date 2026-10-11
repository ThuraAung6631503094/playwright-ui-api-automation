
import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todo-page';

// TC-001: Add a valid task
test('TC-001: User can add a new task', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('Write QA test cases');

  await expect(todo.tasks).toHaveCount(1);
  await expect(todo.task('Write QA test cases')).toBeVisible();
  await expect(todo.remainingCount).toContainText('1 item left');
});

// TC-002: Reject an empty task
test('TC-002: User cannot add an empty task', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('   ');

  await expect(todo.tasks).toHaveCount(0);
});

// TC-003: Complete an existing task
test('TC-003: User can complete a task', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('Complete QA assignment');
  await todo.completeTask('Complete QA assignment');

  await expect(todo.task('Complete QA assignment')).toHaveClass(
    /completed/
  );
  await expect(todo.remainingCount).toContainText('0 items left');
});

// TC-004: Edit an existing task
test('TC-004: User can edit an existing task', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('Learn JavaScript');
  await todo.editTask('Learn JavaScript', 'Learn TypeScript');

  await expect(
    todo.task('Learn TypeScript').locator('label')
  ).toHaveText('Learn TypeScript');

  await expect(todo.task('Learn JavaScript')).toHaveCount(0);
});

// TC-005: Delete an existing task
test('TC-005: User can delete a task', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('Temporary QA task');
  await todo.deleteTask('Temporary QA task');

  await expect(todo.tasks).toHaveCount(0);
});

// TC-006: Filter active and completed tasks
test('TC-006: User can filter active and completed tasks', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('Write test cases');
  await todo.addTask('Run automation tests');

  await todo.completeTask('Write test cases');

  // Verify active filter
  await todo.filterBy('Active');

  await expect(todo.tasks).toHaveCount(1);
  await expect(todo.task('Run automation tests')).toBeVisible();

  // Verify completed filter
  await todo.filterBy('Completed');

  await expect(todo.tasks).toHaveCount(1);
  await expect(todo.task('Write test cases')).toBeVisible();

  // Verify all tasks
  await todo.filterBy('All');

  await expect(todo.tasks).toHaveCount(2);
});
