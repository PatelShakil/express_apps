# Express.js Learning Playground

This repository contains a collection of Express.js applications and examples, created to explore various concepts and features of the Node.js framework.

## Table of Contents

- [Introduction](#introduction)
- [Core Concepts](#core-concepts)
  - [Third-Party Middleware](#third-party-middleware)
  - [Dynamic Views](#dynamic-views)
  - [Authentication](#authentication)
  - [Security](#security)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Key Technologies & Libraries](#key-technologies--libraries)
- [Node.js Utilities](#nodejs-utilities)
- [Best Practices](#best-practices)
- [Task Runners](#task-runners)
- [Network Programming](#network-programming)
- [Further Exploration](#further-exploration)

## Introduction

This project serves as a hands-on guide to building web applications with Express.js. It covers fundamental concepts, from setting up a basic server to implementing advanced features like authentication and security.

## Core Concepts

### Third-Party Middleware

Middleware functions are the building blocks of an Express.js application. They have access to the request object (`req`), the response object (`res`), and the `next` function in the application’s request-response cycle.

- **`cookie-parser`**: A middleware to parse `Cookie` header and populate `req.cookies` with an object keyed by the cookie names.

### Dynamic Views

Express.js can serve dynamic HTML content by using template engines.

- **EJS (Embedded JavaScript)**: We use EJS as our primary template engine. It lets you embed JavaScript code inside your HTML to generate dynamic content.
  - **Layouts in EJS**: To maintain a consistent structure across pages, we use layouts.
    - **Includes**: Use `<%- include('layout-name') %>` to include partial views (like headers or footers).
    - **Body Content**: A main layout file can be created to wrap around your page content.
      ```html
      <body>
          <%- include('partials/header') %>
          <main>
              <%- body %>
          </main>
          <%- include('partials/footer') %>
      </body>
      ```

- **Other Approaches**:
  - **JAMStack with Express Static**: Serve static files (HTML, CSS, JS) using `express.static` for a fast and secure frontend.
  - **Independent Frontend Frameworks**: Use a separate frontend framework like React or Angular that communicates with the Express.js backend via APIs.

### Authentication

Authentication is the process of verifying the identity of a user.

- **Stateful Authentication**: The server stores session information for each user.
  - **Username & Password**: The classic approach where the user's session is stored on the server.
- **Stateless Authentication**: The server does not store any session information. Each request from the client contains all the information needed for authentication.
  - **JWT (JSON Web Token)**: A compact and self-contained way for securely transmitting information between parties as a JSON object.
  - **API Keys**: A secret token that is sent with each request to identify the application.

- **Authentication Protocols**:
  - **OAuth**: An open standard for access delegation, commonly used to grant websites or applications access to their information on other websites but without giving them the passwords.
  - **SSO (Single Sign-On)**: Allows users to log in with a single ID and password to any of several related, yet independent, software systems. (e.g., Google, GitHub).

### Security

Securing your Express.js application is crucial. Here are some essential middleware and practices:

- **`helmet`**: Helps secure your Express apps by setting various HTTP headers.
- **`morgan`**: An HTTP request logger middleware for Node.js.
- **`express-validator`**: A set of Express.js middleware that wraps `validator.js` validator and sanitizer functions.
- **CSRF Protection**: Middleware to prevent Cross-Site Request Forgery attacks.
- **Rate Limiting**: Middleware to limit repeated requests to public APIs and/or endpoints such as password reset.

## Project Structure

The repository is organized into different Express.js applications, each in its own directory (e.g., `exp-1`, `exp-2`, `mongo1`). A typical project structure includes:

```
/
├── app.js              # Main application file
├── package.json        # Project dependencies and scripts
├── .env                # Environment variables
├── routes/             # Route definitions
├── middleware/         # Custom middleware
├── views/              # EJS templates
├── static/             # Static assets (CSS, images, client-side JS)
└── libs/               # Reusable libraries or helpers
```

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to an application directory**:
    ```bash
    cd exp-1
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Start the server**:
    ```bash
    npm start
    ```

## Key Technologies & Libraries

- **Express.js**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **EJS**: A simple templating language that lets you generate HTML markup with plain JavaScript.
- **JWT**: For implementing stateless authentication.

## Node.js Utilities

- **`npx` (Node Package Execute)**: A package runner tool that comes with npm. It allows you to execute Node.js packages from the command line.
- **`npm` (Node Package Manager)**: The default package manager for Node.js.
- **`nvm` (Node Version Manager)**: A tool to manage multiple active Node.js versions.
- **`openssl`**: A software library for applications that secure communications over computer networks against eavesdropping or need to identify the party at the other end.

## Best Practices

- **Folder Structure**: Organize your files and folders in a logical and scalable way.
- **Credential Stores**: Never hardcode credentials in your code. Use environment variables (`.env`) or a secret management tool like `git-secret` or `node-vault`.

## Task Runners

- **`gulp`**: A streaming build system that helps you automate painful or time-consuming tasks in your development workflow.
- **`grunt`**: A JavaScript task runner that helps you automate repetitive tasks like minification, compilation, unit testing, and linting.

## Network Programming

- **WebSockets**: A communication protocol that provides full-duplex communication channels over a single TCP connection.
  - **Workflow**: `Open` -> `Message` -> `Close` -> `Error`

## Further Exploration

- **API Testing**: Use tools like Postman or Insomnia to test your API endpoints.
- **API Documentation**: Use tools like Swagger to generate and maintain API documentation.
- **OpenAPI Specification (OAS)**: A standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection.
- **API Versioning**: A practice of managing changes to your API and ensuring that client applications continue to function.
