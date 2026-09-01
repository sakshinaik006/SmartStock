# Security Policy

## Overview

SmartStock is a hackathon project and is currently an MVP/prototype. Security practices are being implemented progressively as the project develops.

The project is designed to avoid exposing sensitive credentials through source control and to validate data before processing it through the backend.

## Supported Versions

As SmartStock is currently under active development, security fixes will generally be applied to the latest version of the project.

| Version                    | Supported |
| -------------------------- | --------- |
| Latest development version | ✅         |
| Older versions             | ❌         |

## Data Handling

SmartStock may process inventory-related information such as:

* Product names
* SKU identifiers
* Barcode values
* Stock quantities
* Reorder points
* Inventory transaction information

The current prototype is not intended for storing highly sensitive personal, financial, medical, or authentication information.

## Security Practices

The project follows these practices:

* API input validation using Pydantic
* Database interaction through SQLAlchemy
* Configuration through environment variables
* No intentional storage of passwords or sensitive credentials in source code
* Separation of frontend and backend components
* Database credentials should be stored outside the repository
* Production secrets should not be committed to Git

## Environment Variables

Sensitive configuration should be stored in environment variables rather than directly in source code.

Example:

```env
DATABASE_URL=your_database_connection_string
```

Actual credentials must never be committed to the repository.

## Reporting a Vulnerability

If you discover a security vulnerability in SmartStock, please do not publicly disclose the vulnerability before it has been reviewed.

Report the issue through the project's GitHub repository or contact the project maintainer.

When reporting a vulnerability, please include:

1. A clear description of the issue
2. Steps to reproduce it
3. The potential impact
4. Any suggested mitigation, if available

## Scope

SmartStock is currently a hackathon MVP and has not undergone a formal third-party security audit or penetration test.

Security mechanisms may change as authentication, multi-client access control, deployment infrastructure, and additional backend functionality are introduced.

## Disclaimer

SmartStock is provided as a development and demonstration project. Users should not deploy the current prototype for handling sensitive or production-critical inventory data without implementing appropriate authentication, authorization, secure deployment, database security, logging, backups, and other production security controls.
