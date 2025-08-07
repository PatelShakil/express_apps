## Third Party Middleware

> cookie-parser

### Integrate dynamic views in express web app any of the following approaches can be used

> Independent ReactJs or Angular

> Use Template Engine eJs
- We're using ejs for template engine UI

> Use Express Static for JAMStack

## Implementing Layout in EJS
1> ```<%- include('layout-name') %>```

2> Create a layout.js

````
<body>
<%-include()%>
    <main>
        <%-body%>
    </main>
</body>
````
## MongoDB
- Database-Agnostic approach
  > Abstraction layer of ORM above the native databases.

- Schema - Structure of Collection
  
## Authentication

> StateFul Authentication
  - Username & Password
> Stateless Authentication
  - API Key or JWT token

#### Authentication Protocols
> Third party authentication
  - OAuth
> SSO
  - Google
  - Github

### Security API Endpoints
- Use Helmet.js to secure Express apps by setting various HTTP headers.
- Use Morgan.js for logging HTTP requests in Express apps.
- Use Express Validator for validating and sanitizing user input.
- Use CSRF protection middleware to prevent Cross-Site Request Forgery attacks.
- Use Rate Limiting middleware to prevent brute-force attacks.