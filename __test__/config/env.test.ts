/* eslint-disable @typescript-eslint/no-var-requires */
describe("env", () => {
  describe("schema", () => {
    it("should validate the schema successfully", () => {
      expect.assertions(1);
      expect(() => {
        import("../../src/config/env");
      }).not.toThrowError();
    });
  });

  describe("environment variables", () => {
    const DEFAULT_ENV = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...DEFAULT_ENV };
    });

    afterAll(() => {
      process.env = DEFAULT_ENV;
    });

    it("should throw an error if required environment variables are missing", () => {
      expect.assertions(1);
      delete process.env.MONGODB_HOST;
      const expectedErrorMessage =
        'Config validation error: "MONGODB_HOST" is required';
      expect(() => {
        require("../../src/config/env");
      }).toThrowError(expectedErrorMessage);
    });

    it("should configure MONGODB_URL", () => {
      expect.assertions(1);
      process.env.MONGODB_NAME = "db";
      const { env } = require("../../src/config/env");
      expect(env.MONGODB_URL).toEqual("mongodb://root:pass@localhost:27017/db");
    });
  });
});
