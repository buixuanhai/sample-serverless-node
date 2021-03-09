# vdc-node-exam

### TODOs

- Products CRUD
  - [x] Create
  - [x] Update
  - [x] Delete
  - [x] Get
- Seed data
  - [x] Products
  - [x] Brands
- Product search
  - [x] By name
- Product filter
  - [ ] By price
- Streaming and store data for analytics.
  - [x] Create activity_logs service
  - [x] Create DynamoDB activity_log table
  - [x] Stream search queries - use direct http call
  - [ ] Stream view queries - use SQS
  - [ ] Stream view products - use Kinesis
- Other
  - [ ] Draw diagram
  - [ ] ER model
  - [ ] Explanation for code structure
  - [ ] Steps to run the application

### Commands

- reset: npx prisma migrate reset --preview-feature
- migrate: npx prisma migrate dev --preview-feature
- seed: npx prisma db seed --preview-feature
- generate: npx prisma generate

- send sqs message: aws sqs --endpoint-url http://localhost:9324 send-message --queue-url http://localhost:9324/queue/ActivityLogsQueue --message-body "MyFirstMessage"
- sls dynamodb install
- sls dynamodb start
