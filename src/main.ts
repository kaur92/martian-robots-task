import * as lineReader from "line-reader";
import * as path from "path";
import { Direction, Instruction } from "./orientation";
import { Robot } from "./robot";
import { StateMachine } from "./state-machine";

let gridRectangle: string = "";
const robots: Robot[] = [];
let currentRobot: Robot;

const parseRobert = (robotStr: string): Robot => {
  const splitStr = robotStr.trim().split(" ");
  if (splitStr.length !== 3) {
    throw Error("Invalid robot state input");
  }

  const direction = splitStr[2] as keyof typeof Direction;
  const x = Number(splitStr[0]);
  const y = Number(splitStr[1]);

  if (!Direction[direction] || typeof x !== "number" || typeof y !== "number") {
    throw Error("Invalid robot state input");
  }

  return new Robot(Direction[direction], { x, y });
};

const parseRobertInstructions = (instructionsStr: string): Instruction[] => {
  const splitStr = instructionsStr.trim().split("");
  const instructions: Instruction[] = [];

  if (splitStr.length === 0) {
    throw Error("Invalid instruction input");
  }

  for (const i of splitStr) {
    const instruction = i as keyof typeof Instruction;
    if (!Instruction[instruction]) {
      throw Error("Invalid instruction input");
    }
    instructions.push(Instruction[instruction]);
  }

  return instructions;
};

const createStateMachine = (): StateMachine => {
  const splitStr = gridRectangle.trim().split(" ");

  if (splitStr.length !== 2) {
    throw Error("Invalid grid rectangle input");
  }

  const x = Number(splitStr[0]);
  const y = Number(splitStr[1]);

  if (typeof x !== "number" || typeof y !== "number") {
    throw Error("Invalid robot state input");
  }

  return new StateMachine(robots, { x, y });
};

lineReader.open(path.join(__dirname, "../input.txt"), function (err, reader) {
  if (err) throw err;
  if (reader.hasNextLine()) {
    try {

      // rectangle grid
      reader.nextLine(function (err: unknown, line: string | undefined) {
        if (err) throw err;
        if (line !== undefined ) gridRectangle = line.trim();
      });

      while(reader.hasNextLine()) {

        // parse robot
        reader.nextLine(function (err: unknown, line: string | undefined) {
          if (err) throw err;
          if (line !== undefined ) currentRobot = parseRobert(line);
        });

        // parse instructions
        reader.nextLine(function (err: unknown, line: string | undefined) {
          if (err) throw err;
          if (line !== undefined ) currentRobot.addInstruction(parseRobertInstructions(line));
          robots.push(currentRobot);
        });

        if (reader.hasNextLine()) {
          // ignore empty line
          reader.nextLine(function (err: unknown, line: string | undefined) {
            if (err) throw err;
          });
        }
      }

      // state machine
      const stateMachine = createStateMachine();
      console.log(`Output\n${stateMachine.triggerStateMachine()}`);

    } catch (e) {
      console.log(e);
    } finally {
      reader.close(function (err: unknown) {
        if (err) throw err;
      });
    }

  } else {
    reader.close(function (err: unknown) {
      if (err) throw err;
    });
  }
});
