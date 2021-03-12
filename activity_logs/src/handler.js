"use strict";

const AWS = require("aws-sdk");
const atob = require("atob");

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000",
  accessKeyId: "DEFAULT_ACCESS_KEY",
  secretAccessKey: "DEFAULT_SECRET",
});
const uuid = require("uuid");

module.exports.createLogHttp = async (event) => {
  console.log("create log from http");
  const body = JSON.parse(event.body ?? "{}");
  const timestamp = new Date().getTime();

  const logEvent = {
    TableName: process.env.ACTIVITY_LOGS_TABLE,
    Item: {
      ...body,
      id: uuid.v1(),
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  await dynamoDb
    .put(logEvent)
    .promise()
    .then((res) => logEvent);

  return {
    statusCode: 201,
    body: event.body,
  };
};

module.exports.createLogSqs = async (event) => {
  const body = JSON.parse(event.Records[0].body ?? "{}");
  console.log("create log from sqs, event type: ", body);
  const timestamp = new Date().getTime();

  const logEvent = {
    TableName: process.env.ACTIVITY_LOGS_TABLE,
    Item: {
      ...body,
      id: uuid.v1(),
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  await dynamoDb
    .put(logEvent)
    .promise()
    .then((res) => logEvent);

  return {
    statusCode: 201,
  };
};

module.exports.createLogKinesis = async (event) => {
  const { partitionKey, data } = event.Records[0].kinesis;
  const timestamp = new Date().getTime();

  const logEvent = {
    TableName: process.env.ACTIVITY_LOGS_TABLE,
    Item: {
      type: partitionKey,
      // decode data from base64
      payload: atob(data),
      id: uuid.v1(),
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  await dynamoDb
    .put(logEvent)
    .promise()
    .then((res) => logEvent);

  return {
    statusCode: 201,
  };
};

module.exports.listLogs = async (event) => {
  const tableData = await dynamoDb
    .scan({
      TableName: process.env.ACTIVITY_LOGS_TABLE,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(tableData.Items),
  };
};
