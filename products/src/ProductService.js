const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");
const AWS = require("aws-sdk");

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

class ProductService {
  get = async (id) => {
    let product;

    product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    console.log("put record to kinesis stream");
    await kinesis
      .putRecord({
        StreamName: "ActivityLogsStream",
        PartitionKey: `view product by id ${id}`,
        Data: JSON.stringify(product),
      })
      .promise();

    if (!product) {
      throw new Error("Not found");
    }
    try {
    } catch (error) {
      console.log(error);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid request" }),
      };
    }

    return product;
  };

  create = () => {};

  update = () => {};

  delete = () => (list = () => {});
}

module.exports = ProductService;
