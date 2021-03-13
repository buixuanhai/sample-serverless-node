"use strict";
const { PrismaClient } = require("@prisma/client");
const ProductService = require("./ProductService");
const ProductSearchService = require("./ProductSearchService");

const productService = new ProductService();
const productSearchService = new ProductSearchService();

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
  try {
    const result = productSearchService.search(
      event.queryStringParameters || {}
    );
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
