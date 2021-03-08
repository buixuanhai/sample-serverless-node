let request = require("supertest");
const faker = require("faker");
request = request("http://localhost:3000/dev");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("products", () => {
  afterAll(() => {
    prisma.$disconnect();
  });
  describe("create", () => {
    test("should create a product", async () => {
      const product = {
        name: faker.commerce.product(),
        color: faker.commerce.color(),
        price: "99",
      };
      const { body } = await request
        .post("/products/create")
        .send(product)
        .set("Accept", "application/json");
      expect(body).toMatchObject(product);
    });
    test("should validate product payload when create", async () => {
      const product = {
        color: faker.commerce.color(),
        price: "99",
      };
      const { body } = await request
        .post("/products/create")
        .send(product)
        .set("Accept", "application/json")
        .expect(400);
      expect(body).toMatchObject({ message: "Invalid request" });
    });
  });

  describe("update", () => {
    test("should update product", () => {});

    test("should validate product payload when update", () => {});
  });

  describe("delete", () => {
    test("should delete a product", () => {});
  });
});
