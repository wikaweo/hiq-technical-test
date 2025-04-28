1. How long time did you end up spending on this coding test?

I spent approximately 6 hours on the test in total. That includes planning, setting up the environment, coding both frontend and backend, testing, and writing documentation.

2. Explain why you chose the code structure(s) you used in your solution and any other specific choices you made.

I structured the project as a typical fullstack setup:

- The frontend and backend are placed in separate folders within the same root project directory. This separation keeps responsibilities clear and mimics how teams often work in real-world environments.
- The backend is implemented as a minimal ASP.NET Core Web API. Since the functionality is relatively small and focused (uploading and processing a file), a minimal API makes the code clean, concise, and easy to follow.
- All business logic is handled in one place in the backend for simplicity. With more time or complexity, I’d break it into services.
- The frontend is a simple React app with a single upload form and result display, using Vite for a fast development environment.

Technology Choices

- ASP.NET Core: 
  I chose this because it’s a modern, powerful, and scalable framework that I’m comfortable with. It also aligns with technologies often used in professional settings.

- React + Vite: 
  React is widely used, flexible, and perfect for building dynamic UIs. Vite offers a faster and lighter alternative to Create React App, which improves development experience.

- Vite also provides:

  - Instant server start: Vite leverages native ES modules in the browser, allowing it to start the development server instantly without bundling.
  - Lightning-fast hot module replacement (HMR): Vite updates only the modules that have changed, resulting in near-instantaneous updates during development.
  - Optimized build process: For production, Vite uses Rollup under the hood to bundle the code efficiently.

  These features contribute to a more efficient and enjoyable development workflow.

- REST API:
  I used a standard RESTful endpoint to handle file uploads and processing. It keeps the frontend/backend loosely coupled and easy to expand.

- CORS configuration:
  I enabled CORS to ensure smooth communication between the local frontend and backend during development, which is essential in any real-world setup.

- Regex for word replacement:
  Using regular expressions made it easy to match whole words and handle case-insensitive replacements in a clean way.

These choices were made to reflect how I would approach a real-world assignment – focusing on clean architecture, maintainability, and a realistic development workflow.

Automated Testing

To ensure the core logic of the application works reliably, I added unit tests for the backend text processing function. This logic was separated into a static class (`TextProcessor`) to make it easily testable and independent of any API or file handling code.

The unit tests are written using xUnit and cover key scenarios:
- Identifying the most used word correctly
- Replacing it with `foo` and `bar` in the original text
- Handling edge cases like empty input, a single word, or strings with no valid words

This test-driven approach reflects how I work in production environments – by isolating business logic and verifying it with automated tests to reduce bugs and ensure maintainability.

3. What would you add to your solution if you had more time?

If I had more time, I would consider:

- Add integration tests for the API endpoint to ensure end-to-end reliability.
- Improving the frontend UI with more feedback (loading state, error handling, file type validation)
- Using a more robust backend structure, e.g. breaking logic into services or controllers
- Dockerizing both frontend and backend for easy deployment
- Adding a basic **CI/CD pipeline using GitHub Actions or Azure DevOps
- Supporting larger files or async processing for scalability
- Supporting other types of files, not only txt files
- Adding integration tests for the API endpoint
- Testing frontend behavior with mock API responses
- Including code coverage analysis with tools like Coverlet

4. What did you think of this recruitment test?

I really liked the test – it’s practical, open-ended, and reflects a real-world use case well. It allowed me to demonstrate fullstack capabilities without being overly complex. The instructions were clear, and I appreciated the freedom in choosing tools and structuring the solution.