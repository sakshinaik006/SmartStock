# Contributing to SmartStock

Thank you for your interest in contributing to SmartStock.

SmartStock is an open-source hackathon project focused on lightweight inventory management and decision support for small logistics providers.

## How to Contribute

### 1. Fork the Repository

Create your own fork of the SmartStock repository on GitHub.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/SmartStock.git
cd SmartStock
```

### 3. Create a Branch

Create a separate branch for your changes.

```bash
git checkout -b feature/your-feature-name
```

Examples:

```text
feature/barcode-improvements
feature/inventory-search
fix/reorder-alert
docs/setup-guide
```

### 4. Make Your Changes

Keep changes focused and avoid modifying unrelated parts of the project.

For new features, consider:

* Updating the relevant frontend components
* Updating backend APIs where required
* Validating user input
* Updating documentation
* Testing the feature locally

### 5. Test Your Changes

Before submitting a pull request:

* Run the frontend locally
* Run the backend locally
* Test the affected functionality
* Check for console or API errors
* Verify that existing functionality still works

### 6. Commit Your Changes

Use clear commit messages.

Example:

```bash
git add .
git commit -m "Add inventory search functionality"
```

### 7. Push Your Branch

```bash
git push origin feature/your-feature-name
```

### 8. Open a Pull Request

Create a pull request against the main SmartStock repository.

Please explain:

* What was changed
* Why the change was needed
* How it was tested
* Any limitations or known issues

## Code Guidelines

### Frontend

* Keep components modular
* Use meaningful component and variable names
* Avoid unnecessary duplication
* Maintain responsive UI behavior

### Backend

* Validate API inputs
* Keep API routes organized
* Use appropriate HTTP status codes
* Avoid exposing sensitive configuration
* Keep database operations separate from presentation logic where practical

### Documentation

Update the documentation when your changes affect:

* Setup instructions
* API behavior
* Features
* Configuration
* Project structure

## Reporting Bugs

When reporting a bug, include:

1. A short description
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Screenshots or error messages where useful
6. Browser/OS information when relevant

## Feature Requests

Feature requests are welcome.

Please describe:

* The problem the feature solves
* The proposed solution
* How it would benefit SmartStock users

## Security Issues

Do not publicly disclose sensitive security vulnerabilities.

Please follow the process described in [`SECURITY.md`](SECURITY.md).

## Code of Conduct

By participating in this project, you agree to follow the project's [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

## License

By contributing to SmartStock, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
