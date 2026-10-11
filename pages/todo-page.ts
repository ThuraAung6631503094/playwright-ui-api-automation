
import { type Locator, type Page } from '@playwright/test';

export class TodoPage {
  readonly newTaskInput: Locator;
  readonly tasks: Locator;
  readonly remainingCount: Locator;

  constructor(private readonly page: Page) {
    this.newTaskInput = page.getByPlaceholder('What needs to be done?');
    this.tasks = page.locator('.todo-list li');
    this.remainingCount = page.locator('.todo-count');
  }

  // Open the application
  async goto(): Promise<void> {
    await this.page.goto('https://demo.playwright.dev/todomvc/');
  }

  // Find a specific task
  task(name: string): Locator {
    return this.tasks.filter({ hasText: name });
  }

  // Add a new task
  async addTask(name: string): Promise<void> {
    await this.newTaskInput.fill(name);
    await this.newTaskInput.press('Enter');
  }

  // Mark a task as completed
  async completeTask(name: string): Promise<void> {
    await this.task(name).locator('.toggle').check();
  }

  // Edit an existing task
  async editTask(oldName: string, newName: string): Promise<void> {
    const task = this.task(oldName);

    await task.locator('label').dblclick();

    const editInput = task.locator('.edit');
    await editInput.fill(newName);
    await editInput.press('Enter');
  }

  // Delete an existing task
  async deleteTask(name: string): Promise<void> {
    const task = this.task(name);

    await task.hover();
    await task.locator('.destroy').click();
  }

  // Filter displayed tasks
  async filterBy(
    filter: 'All' | 'Active' | 'Completed'
  ): Promise<void> {
    await this.page.getByRole('link', {
      name: filter,
      exact: true
    }).click();
  }
}
