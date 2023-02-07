# RESTful Web Service

Self learning project - a functional programming model to construct REST APIs performing non-blocking CRUD operations on MongoDB backend

REST APIs are secured with username(email) password authentication - validated against JWT token in request header

## Tech stack & features

- REST APIs with Nodejs - Express framework
- MongoDB for student data storage
- Auth mechanism with "bcrypt" password hashing
- JWT sign/verification with jsonwebtoken
- Rate limiter with "rate-limiter-flexible"
- Bunyan logger with Log mask mechanism
