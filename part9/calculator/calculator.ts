export type Operation = "multiply" | "add" | "divide";

export const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b;
    case "add":
      return a + b;
    case "divide":
      if (b === 0) throw new Error("Can`t divide by 0!");
      return a / b;
    default:
      throw new Error("Operation was not multiply, add or divide!");
  }
};

try {
  console.log(calculator(1, 10, "add"));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

console.log(process.argv);
