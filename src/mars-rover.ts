export class MarsRover {
  private position: Position;
  constructor(position: Position) {
    this.position = position;
  }

  public move(commands: string) {
    commands.toLowerCase().split('').forEach((command) => {
      switch (command) {
        case 'f':
          this.position.forward();
          break;
        case 'b':
          this.position.backward();
          break;
        case 'l':
          this.position.turnLeft();
          break;
        case 'r':
          this.position.turnRight();
          break;
        default:
          throw Error(`Invalid command '${command}'`);
      }
    });
  }
}

export class Direction {
  public facing: string;
  private map = {
    N: { left: 'W', right: 'E' },
    W: { left: 'S', right: 'N' },
    S: { left: 'E', right: 'W' },
    E: { left: 'N', right: 'S' }
  };

  constructor(facing: string) {
    this.facing = facing;
  }

  public left() {
    // @ts-expect-error TODO: fix using enum
    this.facing = this.map[this.facing].left;
  }

  public right() {
    // @ts-expect-error TODO: fix using enum
    this.facing = this.map[this.facing].right;
  }
}

export class Position {
  public static at(x: number, y: number) {
    return {
      facing(directionRaw: string) {
        const direction = new Direction(directionRaw);
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
    if (this.direction.facing === 'N') {
      this.increaseY();
    } else if (this.direction.facing === 'S') {
      this.decreaseY();
    } else if (this.direction.facing === 'W') {
      this.decreaseX();
    } else if (this.direction.facing === 'E') {
      this.increaseX();
    }
  }

  public backward() {
    if (this.direction.facing === 'N') {
      this.decreaseY();
    } else if (this.direction.facing === 'S') {
      this.increaseY();
    } else if (this.direction.facing === 'W') {
      this.increaseX();
    } else if (this.direction.facing === 'E') {
      this.decreaseX();
    }
  }
}
