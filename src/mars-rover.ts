export class MarsRover {
  private static map = {
    f: (position) => position.forward(),
    b: (position) => position.backward(),
    l: (position) => position.turnLeft(),
    r: (position) => position.turnRight(),
  };
  private position: Position;

  constructor(position: Position) {
    this.position = position;
  }

  public move(commands: string) {
    for (const command of commands.split('')) {
      try {
        MarsRover.map[command](this.position);
      } catch (e) {
        if (e.message === "LOST") {
          this.position = this.position.getLost();
          throw Error("LOST");
        } else {
          throw Error(`Invalid command '${command}'`);
        }
      }
    }
  }
}

export class Direction {
  private static map = {
    N: { left: 'W', right: 'E', forward: { x: 0, y: 1 }, backward: { x: 0, y: -1 } },
    W: { left: 'S', right: 'N', forward: { x: -1, y: 0 }, backward: { x: 1, y: 0 } },
    S: { left: 'E', right: 'W', forward: { x: 0, y: -1 }, backward: { x: 0, y: 1 } },
    E: { left: 'N', right: 'S', forward: { x: 1, y: 0 }, backward: { x: -1, y: 0 } }
  };
  public facing: string;

  constructor(facing: string) {
    this.facing = facing;
  }

  public left() {
    return new Direction(Direction.map[this.facing].left);
  }

  public right() {
    return new Direction(Direction.map[this.facing].right);
  }

  public forward() {
    return Direction.map[this.facing].forward;
  }

  public backward() {
    return Direction.map[this.facing].backward;
  }
}

export class Position {
  public static at(x: number, y: number) {
    return {
      withinWorld(world: World) {
        return {
          facing(directionRaw: string) {
            const direction = new Direction(directionRaw);
            return new Position(x, y, direction, world);
          }
        };
      }
    };
  }

  private direction: Direction;
  private x: number;
  private y: number;
  private world: World;

  constructor(x: number, y: number, direction: Direction, world: World) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.world = world;
  }

  public turnLeft() {
    this.direction = this.direction.left();
  }

  public turnRight() {
    this.direction = this.direction.right();
  }

  public forward() {
    this.sumVector(this.direction.forward());
  }

  public backward() {
    this.sumVector(this.direction.backward());
  }

  private sumVector(vector) {
    const newX = this.world.simplifyX(this.x + vector.x);
    const newY = this.world.simplifyY(this.y + vector.y);
    if (!this.world.isValidPosition(newX, newY)) {
      throw Error("LOST");
    } else {
      this.x = newX;
      this.y = newY;
    }
  }

  public getLost() {
    return new Lost(this.x, this.y, this.direction, this.world);
  }
}

export abstract class World {
  public static unlimited(): World {
    return new UnlimitedWorld();
  }

  public static wrapping(width: number, height: number) {
    return new WrappingWorld(width, height);
  }

  public abstract simplifyX(value: number): number;
  public abstract simplifyY(value: number): number;
  public abstract isValidPosition(x: number, y: number): boolean;
}

class WrappingWorld implements World {
  private height: number;
  private width: number;

  constructor(width: number, height: number) {
    this.height = height;
    this.width = width;
  }

  public simplifyX(value: number): number {
    return (value + this.width) % this.width;
  }

  public simplifyY(value: number): number {
    return (value + this.height) % this.height;
  }

  public isValidPosition(x: number, y: number) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }
}

class UnlimitedWorld implements World {
  public simplifyX(value: number): number {
    return value;
  }

  public simplifyY(value: number): number {
    return value;
  }

  public isValidPosition(x: number, y: number): boolean {
    return true;
  }
}

export class Lost extends Position {
  public forward() {
  }

  public backward() {
  }
}