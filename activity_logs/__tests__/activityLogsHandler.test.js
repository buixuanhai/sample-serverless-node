let request = require("supertest");
request = request("http://localhost:3001/dev");

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

  test("should list logs", async () => {
    const { body } = await request.get("/activityLogs").expect(200);
    console.log(body.length);
  });
});
