const recipeVal = require("./recipeValidator");

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

describe("The recipe validator", () => {
  it("should respond with 400 if name is not sent", async () => {
    const req = mockRequest({});
    const res = mockResponse();
    await recipeVal(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });
  it("should respond with 400 if there are properties outside of the schema", async () => {
    const req = mockRequest({ name: "name", field: 123 });
    const res = mockResponse();
    await recipeVal(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
