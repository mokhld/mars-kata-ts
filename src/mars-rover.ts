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
        } else if (e.message === "Coordinates out of bounds") {
          throw Error("Coordinates out of bounds");
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
    if ((newX < -50 || newX > 50) || (newY < -50 || newY > 50)) {
      throw Error("Coordinates out of bounds");
    } else if (!this.world.isValidPosition(newX, newY)) {
      if (this.world.isLostPosition(this.x, this.y, this.direction.facing)) {
        return;
      }
      if (this.world instanceof WrappingWorld) {
        this.world.addLostPosition(this.x, this.y, this.direction.facing);
      }
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
  public isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x <= 50 && y >= 0 && y <= 50;
  }
  public abstract isLostPosition(x: number, y: number, direction: string): boolean;
}

class WrappingWorld extends World {
  private height: number;
  private width: number;
  private lostPositions: { x: number, y: number, direction: string }[] = [];

  constructor(width: number, height: number) {
    super();
    this.height = height;
    this.width = width;
  }

  public simplifyX(value: number): number {
    return value;
  }

  public simplifyY(value: number): number {
    return value;
  }

  public isValidPosition(x: number, y: number) {
    return super.isValidPosition(x, y) && x < this.width && y < this.height;
  }

  public isLostPosition(x: number, y: number, direction: string) {
    return this.lostPositions.some(pos => pos.x === x && pos.y === y && pos.direction === direction);
  }

  public addLostPosition(x: number, y: number, direction: string) {
    this.lostPositions.push({ x, y, direction });
  }
}

class UnlimitedWorld extends World {
  public simplifyX(value: number): number {
    return value;
  }

  public simplifyY(value: number): number {
    return value;
  }

  public isValidPosition(x: number, y: number) {
    return x >= -50 && x <= 50 && y >= -50 && y <= 50;
  }

  public isLostPosition(): boolean {
    return false;
  }
}

export class Lost extends Position {
  public forward() {
  }

  public backward() {
  }
}