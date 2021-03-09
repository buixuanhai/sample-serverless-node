"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");

module.exports.create = async (event) => {
  let result;
  const { brandId, ...rest } = JSON.parse(event.body);
  try {
    result = await prisma.product.create({
      data: { ...rest, brand: { connect: { id: brandId } } },
    });
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request" }),
    };
  }
  return {
    statusCode: 201,
    body: JSON.stringify(result),
  };
};

module.exports.update = async (event) => {
  const { id } = event.pathParameters;

  let result;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!product) {
      throw new Error("Not found");
    }
    result = await prisma.product.update({
      where: { id: parseInt(id) },
      data: JSON.parse(event.body),
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

module.exports.delete = async (event) => {
  const { id } = event.pathParameters;
  let result;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!product) {
      throw new Error("Not found");
    }
    result = await prisma.product.delete({
      where: { id: parseInt(id) },
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

module.exports.get = async (event) => {
  const { id } = event.pathParameters;
  let product;
  try {
    product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!product) {
      throw new Error("Not found");
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};

module.exports.list = async (event) => {
  const { page = 1, pageSize = 5, search = "" } =
    event.queryStringParameters || {};
  let result;
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
