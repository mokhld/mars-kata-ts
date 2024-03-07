export class MarsRover {
  private position: Position;
  constructor(position: Position) {
    this.position = position;
  }

  public move(commands: string) {
    commands.toLowerCase().split('').map((command) => {
      if (this.position.direction.facing === 'W') {
        if (command === 'f') {
          this.position.decreaseX();
        }
        return;
      }

      if (command === 'b') {
        this.position.decreaseY();
      } else if (command === 'f') {
        this.position.increaseY();
      } else if (command === 'l') {
        this.position.turnLeft();
      } else if (command === 'r') {
        this.position.turnRight();
      } else {
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
  public direction: Direction;

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

  public decreaseX() {
    this.x--;
  }

  public turnLeft() {
    this.direction.left();
  }

  public turnRight() {
    this.direction.right();
  }
}
