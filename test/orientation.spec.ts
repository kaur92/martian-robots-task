import { Direction, rotateLeft, rotateRight } from "../src/orientation";

describe("Orientation:", () => {
  describe("rotateRight: ", () => {
    it("Should rotate N to E", () => {
      expect(rotateRight(Direction.N)).toEqual("E");
    });

    it("Should rotate E to S", () => {
      expect(rotateRight(Direction.E)).toEqual("S");
    });

    it("Should rotate S to W", () => {
      expect(rotateRight(Direction.S)).toEqual("W");
    });

    it("Should rotate W to N", () => {
      expect(rotateRight(Direction.W)).toEqual("N");
    });
  });

  describe("rotateLeft: ", () => {
    it("Should rotate N to W", () => {
      expect(rotateLeft(Direction.N)).toEqual("W");
    });

    it("Should rotate E to N", () => {
      expect(rotateLeft(Direction.E)).toEqual("N");
    });

    it("Should rotate S to E", () => {
      expect(rotateLeft(Direction.S)).toEqual("E");
    });

    it("Should rotate W to S", () => {
      expect(rotateLeft(Direction.W)).toEqual("S");
    });
  });
});
