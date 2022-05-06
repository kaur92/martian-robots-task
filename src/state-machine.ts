import { Robot } from "./robot";
import { Point } from "./orientation";

export class StateMachine {
  robotStates: Robot[];
  gridRectangle: Point;
  scents: Point[];

  constructor(robotStates: Robot[], gridRectangle: Point) {
    this.robotStates = robotStates;
    this.gridRectangle = gridRectangle;
    this.scents = [];
  }

  getGridRectangle() {
    return this.gridRectangle;
  }

  getScents() {
    return this.scents;
  }

  getRobotStates() {
    return this.robotStates;
  }

  triggerStateMachine() {
    let sb = "";
    for (const state of this.robotStates) {
      this.executeInstructions(state);
      sb = `${sb}${state.getState()} \n`;
    }
    return sb;
  }

  isOnScentedPosition(p: Point) {
    return !!this.getScents().filter((sp) => sp.x === p.x && sp.y === p.y)
      .length;
  }

  isOffGridPosition(p: Point) {
    return (
      p.x > this.gridRectangle.x || p.y > this.gridRectangle.y || p.x < 0 || p.y < 0
    );
  }

  addScent(p: Point) {
    this.scents.push(p);
  }

  executeInstructions(state: Robot) {
    while (state.canExecuteNextInstruction()) {
      if (
        this.isOnScentedPosition(state.getCurrentPosition()) &&
        this.isOffGridPosition(
          state.peekNextInstructionExecutionPositionResult()
        )
      ) {
        state.removeFirstInstruction();
      } else {
        state.executeNextInstruction();
        if (this.isOffGridPosition(state.getCurrentPosition())) {
          state.setLostState(true);
          const prePos = state.getPreviousPosition();
          if (prePos) this.addScent(prePos);
          break;
        }
      }
    }
  }
}
