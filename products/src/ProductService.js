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

  create = async (product) => {
    const { brandId, ...rest } = product;

    return await prisma.product.create({
      data: { ...rest, brand: { connect: { id: brandId } } },
    });
  };

  update = async (product) => {
    console.log(product);
    const { id, ...body } = product;
    const currentProduct = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!currentProduct) {
      throw new Error("Not found");
    }
    let result = await prisma.product.update({
      where: { id: parseInt(id) },
      data: body,
    });
    return result;
  };

  delete = async (id) => {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!product) {
      throw new Error("Not found");
    }
    let result = await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return result;
  };

  list = async ({
    page = 1,
    pageSize = 5,
    search = "",
    brand = "",
    color = "",
  }) => {
    const colors = color.split(",");

    if (brand || color) {
      await sendSqsMessage({
        type: "filter products",
        payload: { brand, color },
      });
    }

    let result = await prisma.product.findMany({
      skip: (page - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
        brand: {
          name: {
            contains: brand,
            mode: "insensitive",
          },
        },
        OR: colors.map((c) => ({
          color: {
            contains: c,
          },
        })),
      },
      include: {
        brand: true,
      },
    });

    return result;
  };
}

module.exports = ProductService;
