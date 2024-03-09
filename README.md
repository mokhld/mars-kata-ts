# Mars Rover Challenge

This project is a solution to the Mars Rover challenge, implemented in TypeScript and tested with Jest. The challenge involves simulating a rover that can move around on a fixed and unlimted grid, following a series of commands, leaving a scent if it 'falls' off.

## Instructions to Run

1. Install the depenedencies via `npm install`
2. Run the tests via `npm run test`

### Additional commands:

- To run the tests in watch mode: `npm run test:watch`
- To check the test coverage: `npm run test:coverage`
- To lint the code: `npm run lint`
- To automatically fix the linting errors: `npm run lint:fix`

## Language and Testing Framework Choices

**TypeScript** was chosen as the primary language for this project due to its static typing and OOP features which make the code more robust and easier to understand.

**Jest** was chosen as the testing framework for its simplicity and powerful features. It's usually my goto in testing, having used Mocha + Chai previuosly for this tier of testing.

## Development Approach

The implementation used **Test-Driven Development (TDD)** with a full commit history of red and green

## **Limitations and Future Improvements**

The current implementation, while functional, has several limitations that could be addressed in future iterations:

- **Input/Output Format** : The program currently lacks the ability to parse the specified input format and output the final positions of the rovers. Future iterations could include functions to parse the input and format the output.

## Design Principles

The code follows the **SOLID principles** :

- **Single Responsibility Principle** : Each class has a single responsibility. For example, the `MarsRover` class is only responsible for moving the rover according to the commands, while the `Position` class is responsible for managing the rover's position.
- **Open-Closed Principle** : The code is open for extension but closed for modification. For example, the `World` class is abstract and can be extended to create different kinds of worlds (like `UnlimitedWorld` and `WrappingWorld`), without needing to modify the existing code.
- **Liskov Substitution Principle** : The subclasses of `World` can be used wherever a `World` is expected, without causing any issues.
- **Interface Segregation Principle** : The classes have specific interfaces. For example, the `Position` class has methods like `forward`, `backward`, `turnLeft`, and `turnRight`, which clearly define what a position can do.
- **Dependency Inversion Principle** : High-level modules do not depend on low-level modules. Both depend on abstractions. For example, the `MarsRover` class depends on the abstraction `Position`, not on the concrete implementation.

## Best Practices

The code also follows other best practices:

- **Error Handling** : The code handles errors and throws meaningful error messages as per the given constraints in the challenge.
- **Immutability** : The `Direction` class returns a new instance when the direction is changed, instead of modifying the existing instance.
- **Use of Abstract Classes** : The code uses abstract classes to define a common interface for similar classes. This makes the code more flexible and easier to extend.
- **Encapsulation** : The internal state of the classes is hidden and can only be accessed through methods. This prevents the state from being modified in unexpected ways.
