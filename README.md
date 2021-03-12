Table of contents

- [Sample serverless node](#sample-serverless-node)
  - [Introduction](#introduction)
  - [Tech stack](#tech-stack)
  - [Code structures](#code-structures)
  - [Microservices workflows](#microservices-workflows)
  - [Database ER diagram](#database-er-diagram)
  - [Architecture diagram](#architecture-diagram)
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

- At root directory: contains `docker-compose.yaml` for local development environment. This contains several images
  - postgres database
  - sqs
  - kinesis
  - dynamodb
- Each service is separated into its own folder and contains
  - serverless.yaml: define service resource using Cloudformation syntax
  - tests: unit test for application
  - src/\*: contains code for the service

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

### Microservices workflows

- CRUD product
- Direct HTTP: from `products` service, when search products, the search term is logged by calling http api of `activity_logs` service with payload is search term. This is for demonstration purpose only. We shouldn't do this in production.
- SQS workflow: when filter products by color or brand, the filters are sent as a SQS message to a ActivityLogsQueue, the `activity_logs` service process messages from the queue and process it (saving into database)
- Kinesis workflow: when view a product, the a record is put to kinese ActivityLogsStream, `activity_logs` service poll records and process them (saving into database)

### Database ER diagram

![ER diagram](https://github.com/buixuanhai/sample-serverless-node/blob/main/er-diagram.PNG)

### Architecture diagram

![Architecture diagram](https://github.com/buixuanhai/sample-serverless-node/blob/main/architecture.PNG)

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
  - [x] Stream view products - use Kinesis
- Other
  - [x] Draw architecture diagram
  - [x] Draw ER model
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

### Curl commands to test apis

Located in [curl-command.md](https://github.com/buixuanhai/sample-serverless-node/blob/main/curl-command.md) file

### Commands

- reset: `npx prisma migrate reset --preview-feature`
- migrate: `npx prisma migrate dev --preview-feature`
- seed: `npx prisma db seed --preview-feature`
- generate: `npx prisma generate`

- send a sqs message: `aws sqs --endpoint-url http://localhost:9324 send-message --queue-url http://localhost:9324/queue/ActivityLogsQueue --message-body "MyFirstMessage"`
- put a kinesis record, data must be base64: `aws kinesis --endpoint-url http://localhost:4567 put-record --stream-name ActivityLogsStream --partition-key "view product" --data "TXlGaXJzdE1lc3NhZ2UK"`
- `sls dynamodb install`
- `sls dynamodb start`
