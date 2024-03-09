import { Direction, MarsRover, Position, World } from './mars-rover';

function initialiseRover(x, y, directionRaw, world: World = World.unlimited()) {
  return new MarsRover(Position.at(x, y).withinWorld(world).facing(directionRaw));
}

describe('Mars Rover', () => {
  test(`cannot accept an invalid command`, () => {
    const input = { x: 0, y: 0, direction: 'N' };
    const startingPositionRover = initialiseRover(input.x, input.y, input.direction);

    expect(() => {
      startingPositionRover.move('X');
    }).toThrow("Invalid command 'X'");
  });

  describe.each([
    { input: { x: 0, y: 0, direction: 'N' }, expected: { x: 0, y: 0, direction: 'N' } },
  ])('stays at the landing position', ({ input, expected }) => {
    test(`${input.x}, ${input.y} facing ${input.direction}`, () => {
      const startingPositionRover = initialiseRover(input.x, input.y, input.direction);
      const expectedPositionRover = initialiseRover(expected.x, expected.y, expected.direction);

      // no movement

      expect(startingPositionRover).toEqual(expectedPositionRover);
    });
  });

  describe.each([
    { input: { x: 0, y: 0, direction: 'N' }, commands: 'f', expected: { x: 0, y: 1, direction: 'N' } },
    { input: { x: 0, y: 0, direction: 'N' }, commands: 'b', expected: { x: 0, y: -1, direction: 'N' } },
    { input: { x: 0, y: 0, direction: 'N' }, commands: 'l', expected: { x: 0, y: 0, direction: 'W' } },
    { input: { x: 0, y: 0, direction: 'N' }, commands: 'r', expected: { x: 0, y: 0, direction: 'E' } },
    { input: { x: 0, y: 0, direction: 'N' }, commands: 'ff', expected: { x: 0, y: 2, direction: 'N' } },
    { input: { x: 0, y: 0, direction: 'N' }, commands: 'fb', expected: { x: 0, y: 0, direction: 'N' } },
    { input: { x: 0, y: 0, direction: 'N' }, commands: 'lf', expected: { x: -1, y: 0, direction: 'W' } },
    { input: { x: 0, y: 0, direction: 'S' }, commands: 'f', expected: { x: 0, y: -1, direction: 'S' } },
  ])('moves after receiving commands', ({ input, commands, expected }) => {
    test(`'${commands}': ${input.x}, ${input.y} facing ${input.direction}`, () => {
      const startingPositionRover = initialiseRover(input.x, input.y, input.direction);
      const expectedPositionRover = initialiseRover(expected.x, expected.y, expected.direction);

      startingPositionRover.move(commands);

      expect(startingPositionRover).toEqual(expectedPositionRover);
    });
  });

  describe.each([
    { input: { x: 0, y: 0, direction: 'N' }, commands: 'f', expected: { x: 0, y: 1 } },
    { input: { x: 0, y: 0, direction: 'S' }, commands: 'f', expected: { x: 0, y: -1 } },
    { input: { x: 0, y: 0, direction: 'E' }, commands: 'f', expected: { x: 1, y: 0 } },
    { input: { x: 0, y: 0, direction: 'W' }, commands: 'f', expected: { x: -1, y: 0 } },

    { input: { x: 0, y: 0, direction: 'N' }, commands: 'b', expected: { x: 0, y: -1 } },
    { input: { x: 0, y: 0, direction: 'S' }, commands: 'b', expected: { x: 0, y: 1 } },
    { input: { x: 0, y: 0, direction: 'E' }, commands: 'b', expected: { x: -1, y: 0 } },
    { input: { x: 0, y: 0, direction: 'W' }, commands: 'b', expected: { x: 1, y: 0 } },
  ])('advancing movements never affect direction', ({ input, commands, expected }) => {
    test(`Move '${commands}'. ${input.x}, ${input.y} facing ${input.direction}`, () => {
      const startingPositionRover = initialiseRover(input.x, input.y, input.direction);
      const expectedPositionRover = initialiseRover(expected.x, expected.y, input.direction);

      startingPositionRover.move(commands);

      expect(startingPositionRover).toEqual(expectedPositionRover);
    });
  });

  describe.each([
    { input: 'N', expected: 'W' },
    { input: 'W', expected: 'S' },
    { input: 'S', expected: 'E' },
    { input: 'E', expected: 'N' },
  ])('Turn left', ({ input, expected }) => {
    test(`${input}`, () => {
      const direction = new Direction(input);

      const actual = direction.left();

      expect(actual).toEqual(new Direction(expected));
    });
  });

  describe.each([
    { input: 'N', expected: 'E' },
    { input: 'W', expected: 'N' },
    { input: 'S', expected: 'W' },
    { input: 'E', expected: 'S' },
  ])('Turn Right', ({ input, expected }) => {
    test(`${input}`, () => {
      const direction = new Direction(input);

      const actual = direction.right();

      expect(actual).toEqual(new Direction(expected));
    });
  });

  describe.each([
    { side: 'left', input: { x: 0, y: 0, direction: 'W' } },
    { side: 'right', input: { x: 15, y: 0, direction: 'E' } },
    { side: 'up', input: { x: 0, y: 15, direction: 'N' } },
    { side: 'down', input: { x: 0, y: 0, direction: 'S' } },
  ])('falls off the edge of the grid', ({ side, input }) => {
    test(`on the ${side}:`, () => {
      const world = World.wrapping(16, 16);
      const startingPositionRover = initialiseRover(input.x, input.y, input.direction, world);

      expect(() => {
        startingPositionRover.move('f');
      }).toThrow("LOST");
    });
  });

  describe.each([
    { side: 'left', input: { x: 0, y: 0, direction: 'W' }, expected: { x: 0, y: 0 } },
    { side: 'right', input: { x: 15, y: 0, direction: 'E' }, expected: { x: 15, y: 0 } },
    { side: 'up', input: { x: 0, y: 15, direction: 'N' }, expected: { x: 0, y: 15 } },
    { side: 'down', input: { x: 0, y: 0, direction: 'S' }, expected: { x: 0, y: 0 } },
  ])('ignores command to move off the edge from a position where a previous rover has fallen off', ({ side, input, expected }) => {
    test(`on the ${side}:`, () => {
      const world = World.wrapping(16, 16);
      const startingPositionRover1 = initialiseRover(input.x, input.y, input.direction, world);
      const startingPositionRover2 = initialiseRover(input.x, input.y, input.direction, world);
      const expectedPositionRover = initialiseRover(expected.x, expected.y, input.direction, world);

      // First rover falls off the edge
      expect(() => {
        startingPositionRover1.move('f');
      }).toThrow("LOST");

      // Second rover ignores the command to move off the edge
      startingPositionRover2.move('f');
      expect(startingPositionRover2).toEqual(expectedPositionRover);
    });
  });

  describe.each([
    { input: { x: 51, y: 0, direction: 'N' }, commands: 'f', expected: { x: 51, y: 1, direction: 'N' } },
    { input: { x: 0, y: 51, direction: 'N' }, commands: 'f', expected: { x: 0, y: 52, direction: 'N' } },
  ])('cannot move beyond maximum coordinates', ({ input, commands, expected }) => {
    test(`'${commands}': ${input.x}, ${input.y} facing ${input.direction}`, () => {
      const startingPositionRover = initialiseRover(input.x, input.y, input.direction);

      expect(() => {
        startingPositionRover.move(commands);
      }).toThrow("Coordinates out of bounds");
    });
  });

  test('cannot accept an instruction string longer than 100 characters', () => {
    const input = { x: 0, y: 0, direction: 'N' };
    const startingPositionRover = initialiseRover(input.x, input.y, input.direction);
    const longInstruction = 'f'.repeat(101);

    expect(() => {
      startingPositionRover.move(longInstruction);
    }).toThrow("Instruction string too long");
  });

});