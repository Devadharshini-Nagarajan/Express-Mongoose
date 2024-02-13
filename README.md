
# Overview

This project is a Node.js application built with Express and Mongoose, providing CRUD operations for user, product, and order models. The application incorporates bcrypt for password hashing, JWT for token management, multer for file uploads, and implements a one-to-many relationship.




## Tech Stack

**Server:** Node, Express

**Database:** MongoDB Atlas

**ORM:** Mongoose

**NPM:** cors, bcrypt, body-parser, jsonwebtoken, multer, nodemon


## Features


#### Authentication:
- User authentication is implemented using JWT tokens.
- The application uses a checkAuth middleware to validate JWT tokens for secure routes.


#### File Uploads:
- Multer is used for handling file uploads

#### User Management:
- CRUD operations for user entities.
- Passwords are securely hashed using bcrypt.

#### Product Management:
- CRUD operations for product entities.

#### Order Management:
- CRUD operations for order entities.

