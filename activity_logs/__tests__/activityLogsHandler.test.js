const { hello } = require("../handler");

describe("activityLogsHandler", () => {
  test("should create log", async () => {
    await hello({
      body: JSON.stringify({}),
    });
  });
});
