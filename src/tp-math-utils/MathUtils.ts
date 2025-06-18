export class MathUtils {
  public multiply(a: number, b: number): number {
    return a * b;
  }

  public divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Division by zero is not allowed.");
    }

    return a / b;
  }

  public multiplyArrays(arr1: number[], arr2: number[]): number[] {
    if (arr1.length === 0 || arr2.length === 0) {
      throw new Error("Arrays must not be empty.");
    }

    if (arr1.length !== arr2.length) {
      throw new Error("Arrays must be of the same length.");
    }

    return arr1.map((value, index) => {
      const v1 = value;
      const v2 = arr2[index]!; // Non-null assertion since we checked lengths

      return this.multiply(v1, v2);
    });
  }
}
