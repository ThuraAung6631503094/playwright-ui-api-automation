# Automation Test Plan

**Project:** Web UI & API Automation Testing Framework  
**Version:** 1.0  
**Test Framework:** Playwright with TypeScript  
**Test Environment:** Local development and GitHub Actions CI  
**Prepared by:** Thura Aung

## 1. Introduction

This test plan defines the testing objectives, scope, methodology, test environment, and completion criteria for the Web UI & API Automation Testing Framework.

The project demonstrates practical software quality assurance techniques through automated testing of web application functionality, REST API behavior, and a locally developed task management API.

## 2. Testing Objectives

The objectives are to:

- Verify essential web application functionality.
- Validate API responses and HTTP status codes.
- Verify CRUD operations and saved application state.
- Identify input validation and boundary-related defects.
- Confirm consistent UI behavior across browser engines.
- Maintain independent and repeatable automated tests.
- Provide evidence through execution reports, screenshots, and traces.
- Execute automated tests through continuous integration.

## 3. Scope of Testing

### In Scope

**UI Functional Testing**

- Create tasks.
- Reject empty task submissions.
- Complete existing tasks.
- Edit task descriptions.
- Delete tasks.
- Filter active and completed tasks.

**API Testing**

- GET, POST, PUT, PATCH, and DELETE requests.
- HTTP status code validation.
- JSON response validation.
- CRUD lifecycle and saved-state verification.
- Negative testing and boundary value analysis.
- Malformed JSON handling.
- Invalid update rejection.
- Automated test-data setup and cleanup.

**Cross-Browser Testing**

- Chromium
- Firefox
- WebKit

**Continuous Integration**

- Automated execution through GitHub Actions.
- Test result and evidence generation.
- CI failure reporting.

### Out of Scope

The current implementation does not provide comprehensive production security testing, performance testing, accessibility certification, or complete authentication and authorization coverage.

JSONPlaceholder write operations are simulated. The local practice API uses in-memory data storage instead of a persistent production database.

## 4. Applications Under Test

| Application | Testing purpose |
|---|---|
| TodoMVC | UI functional testing |
| JSONPlaceholder | REST API testing |
| Local Task API | CRUD, validation, and integration exercises |

TodoMVC: https://demo.playwright.dev/todomvc/

JSONPlaceholder: https://jsonplaceholder.typicode.com/

Local Task API: http://127.0.0.1:5050

## 5. Test Strategy

### Functional Testing

Verify that implemented application features behave according to their expected requirements.

### Negative Testing

Submit invalid data and verify that the API rejects requests with the expected status codes and error responses.

### Boundary Value Analysis

Test minimum, maximum, and out-of-range input values to evaluate validation behavior.

### API Integration Testing

Verify that operations against the running local API change and preserve application state as expected.

### Cross-Browser Testing

Execute the same UI test scenarios across Chromium, Firefox, and WebKit.

### Regression Testing

Re-execute automated tests after changes to identify unexpected behavior.

## 6. Test Environment and Tools

| Tool | Purpose |
|---|---|
| Playwright | Browser and API automation |
| TypeScript | Test implementation |
| Node.js | Local API runtime |
| VS Code | Development environment |
| GitHub | Repository hosting |
| GitHub Actions | Continuous integration |
| HTML, JSON, JUnit reports | Execution results |
| Trace Viewer | Failure investigation |

## 7. Test Data Management

Test data is maintained through reusable TypeScript modules and Playwright fixtures.

Fixture-based tests create their own task resources before execution and clean them up afterward.

This approach reduces test dependencies and helps maintain consistent execution results.

## 8. Entry Criteria

Testing can begin when:

- Dependencies and Playwright browsers are installed.
- Target applications are accessible.
- The local API server can start successfully.
- Test cases and expected results are defined.
- Required test data is available.

## 9. Exit Criteria

The automated testing cycle is considered successful when:

- All required tests have executed.
- Critical test cases have passed.
- Unexpected failures have been investigated.
- Execution reports are available.
- Test evidence is reviewed.
- CI jobs complete successfully.

Passing automated tests does not guarantee that an application is free from defects.

## 10. Defect Investigation

When a test fails, investigate the failure using terminal output, HTML reports, screenshots, videos, and traces.

Classify the cause as an application defect, test implementation defect, test data issue, or environmental problem.

Document reproducible application defects separately from intentionally failing demonstration tests.

## 11. Risks and Limitations

- External API availability can affect test execution.
- Browser and operating system differences may affect results.
- In-memory storage resets when the local server restarts.
- Automated tests cover only implemented scenarios.
- Unstable networks or test data can introduce intermittent failures.

## 12. Test Deliverables

- Automated Playwright test scripts
- Test case matrix
- Page Object Model
- Reusable fixtures and test data
- Automated execution reports
- Selected test evidence
- GitHub Actions workflow
- Project README documentation

## 13. Test Maintenance

Review automated tests when application functionality changes.

Keep expected outcomes aligned with documented application behavior, investigate failures, and update reusable components when necessary.