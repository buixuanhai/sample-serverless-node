"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");
const AWS = require("aws-sdk");
const ProductService = require("./ProductService");

const sqs = new AWS.SQS({
  region: "us-east-1",
  endpoint: "http://localhost:9324",
  accessKeyId: "DEFAULT_ACCESS_KEY",
  secretAccessKey: "DEFAULT_SECRET",
});

const kinesis = new AWS.Kinesis({
  region: "eu-west-1",
  accessKeyId: "local",
  secretAccessKey: "local",
  endpoint: "http://localhost:4567",
});

const productService = new ProductService();

module.exports.create = async (event) => {
  try {
    let result = await productService.create(JSON.parse(event.body));
    return {
      statusCode: 201,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request" }),
    };
  }
};

module.exports.update = async (event) => {
  const { id } = event.pathParameters;

  try {
    const result = await productService.update({
      id,
      ...JSON.parse(event.body),
    });
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request" }),
    };
  }
};

module.exports.delete = async (event) => {
  const { id } = event.pathParameters;
  try {
    let result = await productService.delete(id);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request" }),
    };
  }
};

async function sendSqsMessage(payload) {
  try {
    console.log("sending message");
    await sqs
      .sendMessage({
        QueueUrl: "http://localhost:9324/queue/ActivityLogsQueue",
        MessageBody: JSON.stringify(payload),
      })
      .promise();
    console.log("message sent");
  } catch (error) {
    console.log(error);
  }
}

module.exports.get = async (event) => {
  const { id } = event.pathParameters;
  try {
    let product;
    product = productService.get(id);
    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request" }),
    };
  }
};

module.exports.list = async (event) => {
  try {
    let result = await productService.list(event.queryStringParameters || {});
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request" }),
    };
  }
};

module.exports.search = async (event) => {
  const { page = 1, pageSize = 5, search = "" } =
    event.queryStringParameters || {};
  let result;

  if (search) {
    axios.post("http://localhost:3000/dev/activityLogs", {
      type: "search",
      payload: search,
    });
  }
  try {
    result = await prisma.product.findMany({
      skip: (page - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request" }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
