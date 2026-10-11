# Automation Test Case Matrix

**Project:** Web UI & API Automation Testing Framework  
**Framework:** Playwright + TypeScript  
**Total Project Test Cases:** 26

This document provides a summary of the automated test scenarios implemented in the project.

## 1. UI Functional Test Cases

**Application:** TodoMVC

| Test ID | Test Scenario | Expected Result |
|---|---|---|
| TC-001 | Add a valid task | Task appears in the list |
| TC-002 | Submit an empty task | No task is created |
| TC-003 | Complete an existing task | Task is marked completed |
| TC-004 | Edit an existing task | Updated title is displayed |
| TC-005 | Delete a task | Task is removed from the list |
| TC-006 | Filter active and completed tasks | Correct tasks are displayed |

**Automation file:** `tests/todo.spec.ts`

**Execution browsers:** Chromium, Firefox, WebKit

## 2. Public REST API Test Cases

**Application:** JSONPlaceholder

| Test ID | Method | Test Scenario | Expected Result |
|---|---|---|---|
| API-001 | GET | Retrieve existing post | 200; expected fields |
| API-002 | GET | Filter posts by user | 200; matching user IDs |
| API-003 | GET | Retrieve nonexistent post | 404 |
| API-004 | POST | Simulate creating a post | 201; submitted data returned |
| API-005 | PUT | Simulate replacing a post | 200; replacement values returned |
| API-006 | PATCH | Simulate updating a title | 200; updated title returned |
| API-007 | DELETE | Simulate deleting a post | 200; empty JSON response |

**Automation file:** `tests/api/posts.spec.ts`

Note: JSONPlaceholder simulates write operations. These tests do not verify persistent database changes.

## 3. Local API Functional Test Cases

**Application:** Local Task API

| Test ID | Test Scenario | Expected Result |
|---|---|---|
| LOCAL-001 | Create, read, update, and delete task | Changes verified through subsequent requests |
| LOCAL-002 | Submit a task with whitespace-only title | 400 Bad Request |
| LOCAL-003 | Retrieve nonexistent task | 404 Not Found |
| LOCAL-004 | Retrieve task created by fixture | 200; saved task matches fixture |
| LOCAL-005 | Update fixture-created task | 200; updated task values persist |

**Automation files:**

- `tests/api/local-tasks.spec.ts`
- `tests/api/task-fixture.spec.ts`

## 4. Boundary and Negative Test Cases

| Test ID | Test Scenario | Expected Result |
|---|---|---|
| LOCAL-006 | Submit a one-character title | 201 Created |
| LOCAL-007 | Submit a 100-character title | 201 Created |
| LOCAL-008 | Submit an empty title | 400 Bad Request |
| LOCAL-009 | Submit numeric title | 400 Bad Request |
| LOCAL-010 | Submit a 101-character title | 400 Bad Request |
| LOCAL-011 | Submit invalid completed value | 400 Bad Request |
| LOCAL-012 | Submit malformed JSON | 400 Bad Request |
| LOCAL-013 | Submit invalid task update | 400; original values unchanged |

**Automation file:** `tests/api/task-validation.spec.ts`

## 5. Test Case Summary

| Category | Number of Test Cases |
|---|---:|
| UI Functional Tests | 6 |
| Public API Tests | 7 |
| Local API Functional and Fixture Tests | 5 |
| Boundary and Negative Tests | 8 |
| **Total** | **26** |

The 26 cases represent the project-specific automated scenarios. Additional generated Playwright example tests may also be present.

## 6. Execution and Reporting

Execution results are available through Playwright's HTML, JSON, and JUnit reports.

The framework retains screenshots, videos, and traces for failed browser tests.

Cross-browser testing executes the six TodoMVC UI scenarios in three browser engines, producing 18 browser-specific executions.

The latest documented local Chromium execution recorded 28 passing tests, including additional starter tests.

GitHub Actions runs automated checks on repository changes and retains execution artifacts.

## 7. Test Evidence

- [Chromium Execution Results](../evidence/chromium-test-results.png)
- [Cross-Browser Execution Results](../evidence/cross-browser-results.png)
- [Failure Investigation](../evidence/failure-investigation.png)
- [Trace Viewer](../evidence/trace-viewer.png)

The failure investigation screenshots show an intentionally incorrect test assertion used to practice debugging, not a confirmed application defect.