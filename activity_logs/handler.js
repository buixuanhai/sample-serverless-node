"use strict";

const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000",
  accessKeyId: "DEFAULT_ACCESS_KEY",
  secretAccessKey: "DEFAULT_SECRET",
});
const uuid = require("uuid");

module.exports.createLog = async (event) => {
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

  const tableData = await dynamoDb
    .scan({
      TableName: process.env.ACTIVITY_LOGS_TABLE,
    })
    .promise();

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
