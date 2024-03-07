import { MarsRover, Position } from './mars-rover';

describe('Mars Rover', () => {
  test(`cannot accept an invalid command`, () => {
    const input = { x: 0, y: 0, direction: 'N' };
    const startingPositionRover = new MarsRover(Position.at(input.x, input.y).facing(input.direction));

    expect(() => {
      startingPositionRover.move('X');
    }).toThrow("Invalid command 'X'");
  });
});

describe.each([
  { input: { x: 0, y: 0, direction: 'N' }, commands: 'f', expected: { x: 0, y: 1, direction: 'N' } },
  { input: { x: 0, y: 0, direction: 'N' }, commands: 'b', expected: { x: 0, y: -1, direction: 'N' } }
])('Mars Rover', ({ input, commands, expected }) => {
  test(`moves after receiving one command: ${input.x}, ${input.y}, ${commands}, facing ${input.direction}`, () => {
    const startingPositionRover = new MarsRover(
      Position.at(input.x, input.y).facing(input.direction)
    );
    const expectedPositionRover = new MarsRover(
      Position.at(expected.x, expected.y).facing(expected.direction)
    );

    startingPositionRover.move(commands);

    expect(startingPositionRover).toEqual(expectedPositionRover);
  });
});
