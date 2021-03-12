- [vdc-node-exam](#vdc-node-exam)
  - [Introduction](#introduction)
  - [Code structures](#code-structures)
  - [TODOs](#todos)
  - [Step to run application](#step-to-run-application)
  - [API enpoints](#api-enpoints)
  - [Commands](#commands)

## vdc-node-exam

### Introduction

This node application is used to demonstrate

- Building microservices on AWS
- Serverless backend using AWS Lambda
- Communication between services using
  - Direct http calls
  - Simple Queue Service (SQS)
  - Near real-time data streaming using AWS Kinesis
- Infrastructure as code (defined in serverless.yaml)
- Integration tests

### Code structures

- Each service is separated into its own folder and contains
  - serverless.yaml: define service resource using Cloudformation syntax
  - **tests**: unit test for application
  - src/\*: contain code for the service

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

### TODOs

- Products CRUD
  - [x] Create
  - [x] Update
  - [x] Delete
  - [x] Get
  - [x] List
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
  - [ ] ER model
  - [ ] Explanation for code structure
  - [x] Steps to run the application
  - [x] List curl commands to test apis

### Step to run application

- global requirements
  - Docker
  - npm install -g serverless
- in root folder
  - docker-compose up
- in products folder
  - npm install
  - npm start
  - npm test (optional)
- in activity_logs folder
  - npm install
  - sls dynamodb install
  - sls dynamodb start
  - npm start
  - npm test (optional)

### API enpoints

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

### Commands

- reset: `npx prisma migrate reset --preview-feature`
- migrate: `npx prisma migrate dev --preview-feature`
- seed: `npx prisma db seed --preview-feature`
- generate: `npx prisma generate`

- send a sqs message: `aws sqs --endpoint-url http://localhost:9324 send-message --queue-url http://localhost:9324/queue/ActivityLogsQueue --message-body "MyFirstMessage"`
- `sls dynamodb install`
- `sls dynamodb start`
