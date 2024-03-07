import { MarsRover, Position } from './mars-rover';

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
});

describe.each([
  { input: { x: 0, y: 0, direction: 'N' }, commands: 'f', expected: { x: 0, y: 1, direction: 'N' } },
  { input: { x: 0, y: 0, direction: 'N' }, commands: 'b', expected: { x: 0, y: -1, direction: 'N' } },
  { input: { x: 0, y: 0, direction: 'N' }, commands: 'l', expected: { x: 0, y: 0, direction: 'E' } },
])('Mars Rover', ({ input, commands, expected }) => {
  test(`moves after receiving one command: ${input.x}, ${input.y}, ${commands}, facing ${input.direction}`, () => {
    const startingPositionRover = initialiseRover(input.x, input.y, input.direction);
    const expectedPositionRover = initialiseRover(expected.x, expected.y, expected.direction);

    startingPositionRover.move(commands);

    expect(startingPositionRover).toEqual(expectedPositionRover);
  });
});
