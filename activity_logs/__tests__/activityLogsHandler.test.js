let request = require("supertest");
request = request("http://localhost:3000/dev");

describe("activityLogsHandler", () => {
  test("should create log", async () => {
    await request
      .post("/activityLogs")
      .send({
        type: "search",
        payload: "shoe",
      })
      .set("Accept", "application/json")
      .expect(201);
  });
});
