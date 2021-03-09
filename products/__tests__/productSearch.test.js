let request = require("supertest");
request = request("http://localhost:3000/dev");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe.only("search", () => {
  afterAll(() => {
    prisma.$disconnect();
  });
  test("list products with search params", async () => {
    const { body } = await request
      .get("/searchProduct?search=shoe")
      .set("Accept", "application/json")
      .expect(200);
  });
});
