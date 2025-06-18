export class MathUtilsTdd {
  public divide(num1: number, num2: number) {
    if (num2 === 0) {
      throw new Error("Division by zero is not allowed.");
    }

    return num1 / num2;
  }
}
