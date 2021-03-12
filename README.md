Table of contents

- [Sample serverless node](#sample-serverless-node)
  - [Introduction](#introduction)
  - [Tech stack](#tech-stack)
  - [Code structures](#code-structures)
  - [Workflows](#workflows)
  - [TODOs](#todos)
  - [Steps to run application](#steps-to-run-application)
  - [API endpoints](#api-endpoints)
  - [Curl commands](#curl-commands)
  - [Commands](#commands)

## Sample serverless node

### Introduction

This node application is used to demonstrate

- Building microservices on AWS
- Serverless backend
- Communication between services using
  - Direct http calls
  - Message queue (SQS)
  - Near real-time data streaming using AWS Kinesis
- Infrastructure as code (defined in serverless.yaml)
- Integration tests using `supertest`

### Tech stack

- AWS Lambda + with IAM role
- Amazon SQS
- Amazon Kinesis
- AWS Cloudformation
- `supertest` library for integration test
- AWS DynamoDB
- PostgreSQL
- Docker

### Code structures

- At root directory: contains `docker-compose.yaml` for local development environment. This contain several images
  - postgres database
  - sqs
  - kinesis
  - dynamodb
- Each service is separated into its own folder and contains
  - serverless.yaml: define service resource using Cloudformation syntax
  - tests: unit test for application
  - src/\*: contain code for the service

Example for products service

```
products
├── __tests__ <-- teet folder
│   └── productHandler.test.js
├── prisma
├── src
│   └── handler.js <-- main handler file
├── .env <-- dot env file
├── .env.dev <-- dot env file
├── package.json
└── serverless.yaml <-- define service resources
```

### Workflows

- CRUD product
- SQS workflow
- Kinesis workflow

### TODOs

- Products CRUD
  - [x] Create
  - [x] Update
  - [x] Delete
  - [x] Get
  - [x] List
  - [x] List with custom pagination
- Seed data
  - [x] Products
  - [x] Brands
- Product search
  - [x] By name
- Product filter
  - [x] By color
  - [x] Brand
- Streaming and store data for analytics.
  - [x] Store search products logs - use direct http call
  - [x] Store view product logs - use SQS
  - [ ] Stream view products - use Kinesis
- Other
  - [ ] Draw architecture diagram
  - [ ] Draw ER model
  - [x] Explanation for code structure
  - [x] Steps to run the application
  - [x] List curl commands to test apis

### Steps to run application

- global requirements
  - Docker
  - `npm install -g serverless`
- from root folder
  - `docker-compose up`
- from products folder
  - `npm install`
  - `npm start`
  - `npm test` (optional)
- from activity_logs folder
  - `npm install`
  - `serverless dynamodb install`
  - `serverless dynamodb start`
  - `npm start`
  - `npm test` (optional)

### API endpoints

| Entity        | Endpoint                                              | Method | Description          |
| ------------- | ----------------------------------------------------- | ------ | -------------------- |
| Product       | http://localhost:3000/dev/products                    | POST   | Create a new product |
| Product       | http://localhost:3000/dev/products/{id}               | GET    | Get a product        |
| Product       | http://localhost:3000/dev/products/{id}               | DELETE | Detete a product     |
| Product       | http://localhost:3000/dev/products/{id}               | PUT    | Update a product     |
| Product       | http://localhost:3000/dev/products                    | GET    | List products        |
| Product       | http://localhost:3000/dev/products?search=productName | GET    | Search products      |
| Product       | http://localhost:3000/dev/products?page=2&pageSize=10 | GET    | Custom pagination    |
| Product       | http://localhost:3000/dev/products?color=red,blue     | GET    | Filter by colors     |
| Product       | http://localhost:3000/dev/products?brand=dior         | GET    | Filter by brand      |
| Activity Logs | http://localhost:3000/activityLogs                    | GET    | List activity logs   |
| Activity Logs | http://localhost:3000/activityLogs                    | POST   | Create activity logs |

### Curl commands

Located in curl-command.md file

### Commands

- reset: `npx prisma migrate reset --preview-feature`
- migrate: `npx prisma migrate dev --preview-feature`
- seed: `npx prisma db seed --preview-feature`
- generate: `npx prisma generate`

- send a sqs message: `aws sqs --endpoint-url http://localhost:9324 send-message --queue-url http://localhost:9324/queue/ActivityLogsQueue --message-body "MyFirstMessage"`
- `sls dynamodb install`
- `sls dynamodb start`
