import { StateMachine } from "../src/state-machine";
import { Robot } from "../src/robot";
import { Direction, Instruction } from "../src/orientation";

describe("Robert test:", () => {
  describe("Constructor: ", () => {
    let stateMachine: StateMachine;
    let robot1: Robot;
    let robot2: Robot;
    let robot3: Robot;
    beforeEach(() => {
      robot1 = new Robot(Direction.E, { x: 1, y: 1 });
      robot2 = new Robot(Direction.N, { x: 3, y: 2 });
      robot3 = new Robot(Direction.W, { x: 0, y: 3 });
      stateMachine = new StateMachine([robot1, robot2, robot3], { x: 5, y: 3 });
    });
    it("E2E Test", () => {
      //RFRFRFRF
      robot1.addInstruction([
        Instruction.R,
        Instruction.F,
        Instruction.R,
        Instruction.F,
        Instruction.R,
        Instruction.F,
        Instruction.R,
        Instruction.F,
      ]);
      //FRRFLLFFRRFLL
      robot2.addInstruction([
        Instruction.F,
        Instruction.R,
        Instruction.R,
        Instruction.F,
        Instruction.L,
        Instruction.L,
        Instruction.F,
        Instruction.F,
        Instruction.R,
        Instruction.R,
        Instruction.F,
        Instruction.L,
        Instruction.L,
      ]);
      //LLFFFLFLFL
      robot3.addInstruction([
        Instruction.L,
        Instruction.L,
        Instruction.F,
        Instruction.F,
        Instruction.F,
        Instruction.L,
        Instruction.F,
        Instruction.L,
        Instruction.F,
        Instruction.L,
      ]);
      expect(stateMachine.triggerStateMachine()).toEqual(
        "1 1 E \n3 3 N LOST \n2 3 S \n"
      );
    });
  });
});
