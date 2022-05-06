import { Direction, Instruction, Point, rotateLeft, rotateRight } from "./orientation";

export class Robot {
  direction: Direction;
  currentPosition: Point;
  previousPosition: Point | null;
  instructions: Instruction[];
  isLost: boolean;

  constructor(direction: Direction, position: Point) {
    this.direction = direction;
    this.currentPosition = position;
    this.previousPosition = null;
    this.instructions = [];
    this.isLost = false;
  }

  getDirection() {
    return this.direction;
  }

  getCurrentPosition() {
    return this.currentPosition;
  }

  getPreviousPosition() {
    return this.previousPosition;
  }

  setLostState(isLost: boolean) {
    this.isLost = isLost;
  }

  getLostState() {
    return this.isLost;
  }

  getInstructions() {
    return this.instructions;
  }

  addInstruction(instructions: Instruction[]) {
    this.instructions.push(...instructions);
  }

  removeFirstInstruction() {
    if (!this.instructions.length) throw Error("No instruction");
    const [firstInstruction, ...otherInstructions] = this.instructions;
    this.instructions = otherInstructions;
    return firstInstruction;
  }

  canExecuteNextInstruction() {
    return !!this.instructions.length;
  }

  executeNextInstruction() {
    if (!this.instructions.length) throw Error("No instruction");

    const m = this.removeFirstInstruction();

    switch (m) {
      case Instruction.F:
        this.previousPosition = this.currentPosition;
        this.currentPosition = this.move(m);
        break;
      default:
        this.direction = this.rotate(m);
    }
  }

  peekNextInstructionExecutionPositionResult() {
    if (!this.instructions.length) throw Error("No instruction");
    return this.move(this.instructions[0]);
  }

  rotate(m: Instruction) {
    if (m === Instruction.R) {
      return rotateRight(this.direction);
    } else {
      return rotateLeft(this.direction);
    }
  }

  move(m: Instruction) {
    const x: number = this.currentPosition.x;
    const y: number = this.currentPosition.y;

    if (m === Instruction.F) {
      switch (this.getDirection()) {
        case Direction.N:
          return { x, y: y + 1 };
        case Direction.S:
          return { x, y: y - 1 };
        case Direction.E:
          return { x: x + 1, y };
        case Direction.W:
          return { x: x - 1, y };
      }
    }
    return this.currentPosition;
  }
}
