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
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: "99",
        brandId: 1,
      };

      await request
        .post("/products")
        .send(product)
        .set("Accept", "application/json")
        .expect(201);
    });
    test("should validate product payload when create", async () => {
      // product missing name
      const product = {
        color: faker.commerce.color(),
        price: "99",
      };
      const { body } = await request
        .post("/products")
        .send(product)
        .set("Accept", "application/json")
        .expect(400);
      expect(body).toMatchObject({ message: "Invalid request" });
    });
  });

  describe("update", () => {
    test("should update product", async () => {
      const product = {
        color: faker.commerce.color(),
        name: faker.commerce.productName(),
        price: "99",
      };

      const { body } = await request
        .post("/products/1")
        .send(product)
        .set("Accept", "application/json")
        .expect(200);
      expect(body).toMatchObject(product);
    });

    test("should validate product id when update", async () => {
      const product = {
        color: faker.commerce.color(),
        price: "99",
      };

      const { body } = await request
        .post("/products/999")
        .send(product)
        .set("Accept", "application/json")
        .expect(400);
      expect(body).toMatchObject({ message: "Invalid request" });
    });
  });

  describe("delete", () => {
    test("should delete a product", async () => {
      const product = {
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: "99",
        brandId: 1,
      };

      const {
        body: { id },
      } = await request
        .post("/products")
        .send(product)
        .set("Accept", "application/json");

      const { body } = await request
        .delete(`/products/${id}`)
        .send()
        .set("Accept", "application/json")
        .expect(200);

      expect(body).toMatchObject({ ...product, id: parseInt(id) });
    });
  });

  describe("get", () => {
    test("should get a product", async () => {
      await request
        .get("/products/1")
        .set("Accept", "application/json")
        .expect(200);
    });
  });

  describe.only("list", () => {
    test("list products with default pagination", async () => {
      const { body } = await request
        .get("/products")
        .set("Accept", "application/json")
        .expect(200);

      body.forEach((item, index) => {
        expect(item.id).toBe(index + 1);
      });
    });

    test("list products with custom pagination", async () => {
      const { body } = await request
        .get("/products/?page=2&pageSize=5")
        .set("Accept", "application/json")
        .expect(200);

      body.forEach((item, index) => {
        expect(item.id).toBe(index + 6);
      });
    });
    test("list products with search params", () => {});
  });
});
