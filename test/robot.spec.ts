import { Robot } from "../src/robot";
import { Direction, Instruction } from "../src/orientation";

describe("Robot test:", () => {
  describe("Constructor: ", () => {
    let robot: Robot;

    beforeEach(() => {
      robot = new Robot(Direction.N, { x: 10, y: 15 });
    });

    it("Should create the robot instance", () => {
      expect(robot).toBeDefined();
    });

    it("Should create a robot with the given initial direction", () => {
      expect(robot.getDirection()).toEqual("N");
    });

    it("Should create a robot with the given initial position", () => {
      expect(robot.getCurrentPosition()).toMatchObject({ x: 10, y: 15 });
    });

    it("Should not have previous position", () => {
      expect(robot.getPreviousPosition()).toEqual(null);
    });

    it("Should create a robot with empty instructions", () => {
      expect(robot.getInstructions()).toEqual([]);
    });

    it("Should create a robot without lost state", () => {
      expect(robot.getLostState()).toEqual(false);
    });
  });
  describe("Move test:", () => {
    let robot: Robot;

    describe("Direction change:", () => {
      beforeEach(() => {
        robot = new Robot(Direction.N, { x: 11, y: 35 });
      });

      describe("Sideways turn:", () => {
        it("Changes direction by turning left", () => {
          expect(robot.rotate(Instruction.L)).toEqual("W");
        });

        it("Changes direction by turning right", () => {
          expect(robot.rotate(Instruction.R)).toEqual("E");
        });
      });

      it("Goes North 1 position forward", () => {
        expect(robot.move(Instruction.F)).toMatchObject({ x: 11, y: 36 });
      });

      describe("Lost state:", () => {
        it("Changes to true", () => {
          robot.setLostState(true);
          expect(robot.getLostState()).toEqual(true);
        });

        it("Changes to false", () => {
          robot.setLostState(false);
          expect(robot.getLostState()).toEqual(false);
        });
      });
    });
  });

  describe("Lost state:", () => {
    let robot: Robot;
    beforeEach(() => {
      robot = new Robot(Direction.N, { x: 11, y: 35 });
    });
    describe("Update state:", () => {
      it("Changes to true", () => {
        robot.setLostState(true);
        expect(robot.getLostState()).toEqual(true);
      });

      it("Changes to false", () => {
        robot.setLostState(false);
        expect(robot.getLostState()).toEqual(false);
      });
    });
  });

  describe("Instructions:", () => {
    let robot: Robot;
    beforeEach(() => {
      robot = new Robot(Direction.S, { x: 11, y: 35 });
    });
    describe("Execute instruction:", () => {
      it("Should return error for no instructions", () => {
        expect(() => robot.executeNextInstruction()).toThrowError();
      });

      it("Should execute L", () => {
        robot.addInstruction([Instruction.L]);
        robot.executeNextInstruction();
        expect(robot.getDirection()).toBe("E");
      });

      it("Should execute R", () => {
        robot.addInstruction([Instruction.R]);
        robot.executeNextInstruction();
        expect(robot.getDirection()).toBe("W");
      });

      it("Goes back to the initial direction by turning left 4 times", () => {
        robot.addInstruction([Instruction.L, Instruction.L, Instruction.L, Instruction.L]);
        robot.executeNextInstruction();
        robot.executeNextInstruction();
        robot.executeNextInstruction();
        robot.executeNextInstruction();
        expect(robot.getDirection()).toEqual("S");
      });

      it("Goes back to the initial direction by turning left 4 times", () => {
        robot.addInstruction([Instruction.R, Instruction.R, Instruction.R, Instruction.R]);
        robot.executeNextInstruction();
        robot.executeNextInstruction();
        robot.executeNextInstruction();
        robot.executeNextInstruction();
        expect(robot.getDirection()).toEqual("S");
      });
    });

    describe("All commands instruction: ", () => {
      it("executes FRFFLFF", () => {
        const instructions = [
          Instruction.F,
          Instruction.R,
          Instruction.F,
          Instruction.F,
          Instruction.L,
          Instruction.F,
          Instruction.F,
        ];
        robot.addInstruction(instructions);
        for (const inst in instructions) {
          robot.executeNextInstruction();
        }
        expect(robot.getCurrentPosition()).toEqual({ x: 9, y: 32 });
        expect(robot.getDirection()).toEqual("S");
      });

      it("does not execute wrong command", () => {
        expect(() => {
          const instructions: Instruction[] = [];
          robot.addInstruction(instructions);
          robot.executeNextInstruction();
        }).toThrowError();
      });
    });
  });
});
