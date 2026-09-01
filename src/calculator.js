#!/usr/bin/env node

/*
 * Basic calculator CLI supporting these operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 */

function calculate(operation, leftOperand, rightOperand) {
  const a = Number(leftOperand);
  const b = Number(rightOperand);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error('Both operands must be valid numbers.');
  }

  switch (operation.toLowerCase()) {
    case 'add':
    case '+':
      return a + b;
    case 'subtract':
    case '-':
      return a - b;
    case 'multiply':
    case '*':
      return a * b;
    case 'divide':
    case '/':
      if (b === 0) {
        throw new Error('Division by zero is not allowed.');
      }
      return a / b;
    default:
      throw new Error(
        'Unsupported operation. Use add, subtract, multiply, or divide.'
      );
  }
}

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <number1> <number2>');
  console.log('Supported operations: add, subtract, multiply, divide');
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 3 || args.includes('--help') || args.includes('-h')) {
    printUsage();
    process.exit(args.length === 0 ? 0 : 1);
  }

  const [operation, leftOperand, rightOperand] = args;

  try {
    const result = calculate(operation, leftOperand, rightOperand);
    console.log(`Result: ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    printUsage();
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { calculate, printUsage };
