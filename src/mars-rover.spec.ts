import { MarsRover, Position } from './mars-rover';

describe.each([
  {
    input: { x: 0, y: 0, direction: 'N' },
    expected: { x: 0, y: 0, direction: 'N' },
  },
])('Mars Rover', ({ input, expected }) => {
  test(`stays at the landing position: ${input.x}, ${input.y} facing ${input.direction}`, () => {
    const startingPositionRover = new MarsRover(
      Position.at(input.x, input.y).facing(input.direction)
    );
    const expectedPositionRover = new MarsRover(
      Position.at(expected.x, expected.y).facing(expected.direction)
    );

    // no movement
    expect(startingPositionRover).toEqual(expectedPositionRover);
  });
});

describe.each([
  {
    input: { x: 0, y: 0, direction: 'N' },
    commands: 'f',
    expected: { x: 0, y: 1, direction: 'N' },
  },
])('Mars Rover', ({ input, commands, expected }) => {
  test(`moves after receiving one command: ${input.x}, ${input.y} facing ${input.direction}`, () => {
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
