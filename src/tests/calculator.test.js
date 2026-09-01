const { calculate } = require('../calculator');

describe('calculator operations', () => {
  test.each([
    ['addition from image', 'add', 2, 3, 5],
    ['addition with symbol', '+', 2, 3, 5],
    ['subtraction from image', 'subtract', 10, 4, 6],
    ['subtraction with symbol', '-', 10, 4, 6],
    ['multiplication from image', 'multiply', 45, 2, 90],
    ['multiplication with symbol', '*', 45, 2, 90],
    ['division from image', 'divide', 20, 5, 4],
    ['division with symbol', '/', 20, 5, 4],
    ['addition with decimal inputs', 'add', 3.5, 2.25, 5.75],
    ['subtraction with negative numbers', 'subtract', -8, 3, -11],
    ['multiplication with zero', 'multiply', 0, 123, 0],
    ['division with decimal result', 'divide', 9, 2, 4.5]
  ])('calculates %s', (_, operation, leftOperand, rightOperand, expected) => {
    expect(calculate(operation, leftOperand, rightOperand)).toBe(expected);
  });

  test('supports mixed-case operation names', () => {
    expect(calculate('MULTIPLY', 7, 6)).toBe(42);
    expect(calculate('DivIdE', 18, 3)).toBe(6);
  });

  test('throws when one of the operands is not a valid number', () => {
    expect(() => calculate('add', 'abc', 4)).toThrow('Both operands must be valid numbers.');
    expect(() => calculate('multiply', 6, 'xyz')).toThrow('Both operands must be valid numbers.');
  });

  test('throws for unsupported operations', () => {
    expect(() => calculate('modulus', 10, 3)).toThrow(
      'Unsupported operation. Use add, subtract, multiply, or divide.'
    );
  });

  test('throws for division by zero', () => {
    expect(() => calculate('divide', 10, 0)).toThrow('Division by zero is not allowed.');
    expect(() => calculate('/', 10, 0)).toThrow('Division by zero is not allowed.');
  });
});
