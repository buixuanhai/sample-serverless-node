- [vdc-node-exam](#vdc-node-exam)
  - [Introduction](#introduction)
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
  - [ ] List curl commands to test apis

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

| Entity  | Endpoint                                              | Method | Description          |
| ------- | ----------------------------------------------------- | ------ | -------------------- |
| Product | http://localhost:3000/dev/products                    | POST   | Create a new product |
| Product | http://localhost:3000/dev/products/{id}               | GET    | Get a product        |
| Product | http://localhost:3000/dev/products/{id}               | DELETE | Detete a product     |
| Product | http://localhost:3000/dev/products/{id}               | POST   | Update a product     |
| Product | http://localhost:3000/dev/products?search=productName | GET    | Search products      |
| Product | http://localhost:3000/dev/products?page=2&pageSize=10 | GET    | Custom pagination    |
| Product | http://localhost:3000/dev/products?color=red,blue     | GET    | Filter by colors     |
| Product | http://localhost:3000/dev/products?brand=dior         | GET    | Filter by brand      |

### Commands

- reset: npx prisma migrate reset --preview-feature
- migrate: npx prisma migrate dev --preview-feature
- seed: npx prisma db seed --preview-feature
- generate: npx prisma generate

- send a sqs message: aws sqs --endpoint-url http://localhost:9324 send-message --queue-url http://localhost:9324/queue/ActivityLogsQueue --message-body "MyFirstMessage"
- sls dynamodb install
- sls dynamodb start
