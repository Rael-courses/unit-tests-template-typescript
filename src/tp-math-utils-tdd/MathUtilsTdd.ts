export class MathUtilsTdd {
  public divide(num1: number, num2: number): number {
    if (num2 === 0) {
      throw new Error("Division by zero is not allowed.");
    }

    return num1 / num2;
  }

  public removeDuplicates(arr: number[]) {
    if (arr.length === 0) {
      throw new Error("Array cannot be empty.");
    }

    const uniqueValues = new Set(arr);
    return Array.from(uniqueValues);
  }
}
