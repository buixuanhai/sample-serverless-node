let request = require("supertest");

request = request("http://localhost:3000/dev");

describe("products", () => {
  describe("create", () => {
    test("should create a product", async () => {
      const { body } = await request.get("/products/create");
      console.log(body);
    });
  });
});
