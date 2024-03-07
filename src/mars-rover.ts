export class MarsRover {
  private position: Position;
  constructor(position: Position) {
    this.position = position;
  }

  public move(commands: string) {
    if (commands === 'b') {
      this.position.decreaseY();
    } else if (commands === 'f') {
      this.position.increaseY();
    } else if (commands === 'l') {
      this.position.turnLeft();
    } else {
      throw Error(`Invalid command '${commands}'`);
    }
  }
}

export class Direction {
  private facing: string;
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

  public decreaseY() {
    this.y--;
  }

  public turnLeft() {
    this.direction.left();
  }
}
