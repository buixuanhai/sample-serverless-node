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
  - [ ] Create analytics_service
  - [ ] Setup kinesis
  - [ ] Create DynamoDB table with activities table
  - [ ] Stream search queries - use SQS
  - [ ] Stream filtering queries - use direct http call
  - [ ] Stream view products - use Kinesis
- Other
  - [ ] Draw diagram
  - [ ] ER model
  - [ ] Explanation for code structure
  - [ ] Steps to run the application

### Commands

- migrate: prisma migrate dev --preview-feature
- seed: prisma db seed --preview-feature
