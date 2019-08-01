const userVal = require("./userValidator");
const keys = require("../config/keys");

const mockRequest = body => {
  return {
    body: body
  };
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("The user validator", () => {
  describe("when attempting to register", () => {
    it("should send back a 400 code if there is no username", async () => {
      const req = mockRequest({ password: "123", key: keys.registerKey });
      const res = mockResponse();
      await userVal.userSignup(req, res, () => {});
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("should send back a 400 code if there is no password", async () => {
      const req = mockRequest({ username: "test", key: keys.registerKey });
      const res = mockResponse();
      await userVal.userSignup(req, res, () => {});
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("should send back 400 if there is no key", async () => {
      const req = mockRequest({ username: "test", password: "123" });
      const res = mockResponse();
      await userVal.userSignup(req, res, () => {});
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("should give 401 code when key is wrong", async () => {
      const req = mockRequest({
        username: "test",
        password: "123",
        key: "nottherightkey"
      });
      const res = mockResponse();
      await userVal.userSignup(req, res, () => {});
      expect(res.status).toHaveBeenCalledWith(401);
    });
    it("should send back 400 if there are additional properties not in the schema", async () => {
      const req = mockRequest({
        username: "test",
        password: "123",
        key: keys.registerKey,
        field: 123
      });
      const res = mockResponse();
      await userVal.userSignup(req, res, () => {});
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("should not send a response if validation is successful", async () => {
      const req = mockRequest({
        username: "test",
        password: "123",
        key: keys.registerKey
      });
      const res = mockResponse();
      await userVal.userSignup(req, res, () => {});
      expect(res.status).not.toBeCalled();
      expect(res.send).not.toBeCalled();
    });
  });
  describe("when attempting to login", () => {
    it("should give 400 when there is no username", async () => {
      const req = mockRequest({ password: "123" });
      const res = mockResponse();
      await userVal.userLogin(req, res, () => {});
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("should give 400 when there is no password", async () => {
      const req = mockRequest({ username: "test" });
      const res = mockResponse();
      await userVal.userLogin(req, res, () => {});
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("should send back 400 if there are additional properties not in the schema", async () => {
      const req = mockRequest({
        username: "test",
        password: "123",
        field: 1233
      });
      const res = mockResponse();
      await userVal.userLogin(req, res, () => {});
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("should not send a response if validation is successful", async () => {
      const req = mockRequest({
        username: "test",
        password: "123"
      });
      const res = mockResponse();
      await userVal.userLogin(req, res, () => {});
      expect(res.status).not.toBeCalled();
      expect(res.send).not.toBeCalled();
    });
  });
});
