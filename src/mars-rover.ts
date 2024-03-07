interface PositionOperations {
  increaseY: () => void;
  decreaseY: () => void;
  increaseX: () => void;
  decreaseX: () => void;
}

type DirectionType = 'N' | 'W' | 'S' | 'E';

type MapType = {
  [K in DirectionType]: {
    left: DirectionType,
    right: DirectionType,
    forward: (t: PositionOperations) => void,
    backward: (t: PositionOperations) => void
  }
};

export class MarsRover {
  private static map = {
    f: (position: { forward: () => void; }) => position.forward(),
    b: (position: { backward: () => void; }) => position.backward(),
    l: (position: { turnLeft: () => void; }) => position.turnLeft(),
    r: (position: { turnRight: () => void; }) => position.turnRight(),
  };

  private position: Position;
  constructor(position: Position) {
    this.position = position;
  }

  public move(commands: string) {
    commands.toLowerCase().split('').forEach((command) => {
      if (this.isValidCommand(command)) {
        MarsRover.map[command](this.position);
      } else {
        throw Error(`Invalid command '${command}'`);
      }
    });
  }

  private isValidCommand(command: string): command is keyof typeof MarsRover.map {
    return command in MarsRover.map;
  }
}


export class Direction {
  public facing: DirectionType;
  private static map: MapType = {
    N: { left: 'W', right: 'E', forward: (t) => t.increaseY(), backward: (t) => t.decreaseY() },
    W: { left: 'S', right: 'N', forward: (t) => t.decreaseX(), backward: (t) => t.increaseX() },
    S: { left: 'E', right: 'W', forward: (t) => t.decreaseY(), backward: (t) => t.increaseY() },
    E: { left: 'N', right: 'S', forward: (t) => t.increaseX(), backward: (t) => t.decreaseX() }
  };

  constructor(facing: DirectionType) {
    this.facing = facing;
  }

  public left() {
    this.facing = Direction.map[this.facing].left;
  }

  public right() {
    this.facing = Direction.map[this.facing].right;
  }

  public forward(x: PositionOperations) {
    Direction.map[this.facing].forward(x);
  }

  public backward(x: PositionOperations) {
    Direction.map[this.facing].backward(x);
  }
}

export class Position {
  public static at(x: number, y: number) {
    return {
      facing(directionRaw: string) {
        if (!['N', 'W', 'S', 'E'].includes(directionRaw)) {
          throw new Error(`Invalid direction '${directionRaw}'. Must be one of 'N', 'W', 'S', 'E'.`);
        }

        const direction = new Direction(directionRaw as DirectionType);
        return new Position(x, y, direction);
      },
    };
  }

  private x: number;
  private y: number;
  private direction: Direction;

  private constructor(x: number, y: number, direction: Direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  public increaseY() {
    this.y++;
  }

  public increaseX() {
    this.x++;
  }

  public decreaseY() {
    this.y--;
  }

  public decreaseX() {
    this.x--;
  }

  public turnLeft() {
    this.direction.left();
  }

  public turnRight() {
    this.direction.right();
  }

  public forward() {
    this.direction.forward(this);
  }

  public backward() {
    this.direction.backward(this);
  }
}
