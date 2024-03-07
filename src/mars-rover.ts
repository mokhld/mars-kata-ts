export class MarsRover {
  private position: Position;
  constructor(position: Position) {
    this.position = position;
  }

  public move(commands: string) {
    if (commands === 'b') {
      this.position.decreaseY();
      return;
    }
    this.position.increaseY();
  }
}

export class Direction {
  private facing: string;
  constructor(facing: string) {
    this.facing = facing;
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
}