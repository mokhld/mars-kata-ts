export class MarsRover {
  private position: Position;
  constructor(position: Position) {
    this.position = position;
  }

  public move(commands: string) {
    commands.toLowerCase().split('').map((command) => {
      if (this.position.direction.facing === 'W') {
        if (command === 'f') {
          this.position.forward();
        }
        return;
      }

      if (this.position.direction.facing === 'S') {
        if (command === 'f') {
          this.position.forward();
        }
        return;
      }
      this.position.moveAll(command);
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
  public direction: Direction;

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
    }
  }

  public moveAll(command: string) {
    if (command === 'b') {
      this.decreaseY();
    } else if (command === 'f') {
      this.increaseY();
    } else if (command === 'l') {
      this.turnLeft();
    } else if (command === 'r') {
      this.turnRight();
    } else {
      throw Error(`Invalid command '${command}'`);
    }
  }
}
