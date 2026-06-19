export function divide(num1: number, num2: number): number {
  if (num2 === 0) {
    throw new Error("Denominator cannot be zero");
  }

  return num1 / num2;
}
