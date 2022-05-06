enum Direction {
  N = "N",
  E = "E",
  S = "S",
  W = "W",
}

enum Instruction {
  F = "F",
  L = "L",
  R = "R",
}

interface Point {
  x: number;
  y: number;
}

const rotateRight = (d: Direction): Direction => {
  switch (d) {
    case Direction.N:
      return Direction.E;
    case Direction.E:
      return Direction.S;
    case Direction.S:
      return Direction.W;
    case Direction.W:
      return Direction.N;
  }
};

const rotateLeft = (d: Direction): Direction => {
  switch (d) {
    case Direction.N:
      return Direction.W;
    case Direction.E:
      return Direction.N;
    case Direction.S:
      return Direction.E;
    case Direction.W:
      return Direction.S;
  }
};

export { Direction, Instruction, Point, rotateRight, rotateLeft };
