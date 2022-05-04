import { add } from "../src/calc";

describe("test add function", () => {
  test("should return 40 for add(10,30)", () => {
    expect(add(10, 30)).toBe(40);
  });
});
