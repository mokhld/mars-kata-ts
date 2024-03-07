import { Direction, MarsRover, Position } from './mars-rover';

function initialiseRover(x: number, y: number, directionRaw: string) {
  return new MarsRover(Position.at(x, y).facing(directionRaw));
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
    { input: { x: 0, y: 0, direction: 'N' }, commands: 'f', expected: { x: 0, y: 1, direction: 'N' } },
    { input: { x: 0, y: 0, direction: 'N' }, commands: 'b', expected: { x: 0, y: -1, direction: 'N' } },
    { input: { x: 0, y: 0, direction: 'N' }, commands: 'l', expected: { x: 0, y: 0, direction: 'W' } },
  ])('Mars Rover', ({ input, commands, expected }) => {
    test(`moves after receiving one command: ${input.x}, ${input.y}, ${commands}, facing ${input.direction}`, () => {
      const startingPositionRover = initialiseRover(input.x, input.y, input.direction);
      const expectedPositionRover = initialiseRover(expected.x, expected.y, expected.direction);

      startingPositionRover.move(commands);

      expect(startingPositionRover).toEqual(expectedPositionRover);
    });
  });

  describe.each([
    { input: 'N', expected: 'W' },
    { input: 'W', expected: 'S' },
    { input: 'S', expected: 'E' },
    { input: 'E', expected: 'N' },
  ])('Position', ({ input, expected }) => {
    test(`turn left`, () => {
      const direction = new Direction(input);

      direction.left();

      expect(direction).toEqual(new Direction(expected));
    });
  });
});
