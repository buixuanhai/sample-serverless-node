let request = require("supertest");

request = request("http://localhost:3000/dev");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("products", () => {
  afterAll(() => {
    prisma.$disconnect();
  });
  describe("create", () => {
    test("should create a product", async () => {
      // const { body } = await request.get("/products/create");
      // console.log(body);
      const allProducts = await prisma.product.findMany();
      console.log(allProducts);
    });
  });
});
