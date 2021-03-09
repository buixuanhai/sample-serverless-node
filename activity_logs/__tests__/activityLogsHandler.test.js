const { createLog } = require("../handler");

describe("activityLogsHandler", () => {
  test("should create log", async () => {
    await createLog({
      body: JSON.stringify({}),
    });
  });
});
