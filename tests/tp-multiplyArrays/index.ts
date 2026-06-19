export function multiplyArrays(arr1: number[], arr2: number[]): number[] {
  if (arr1.length === 0 || arr2.length === 0) {
    throw new Error("Arrays cannot be empty");
  }

  if (arr1.length !== arr2.length) {
    throw new Error("Arrays must have the same length");
  }

  const result: number[] = [];
  for (let i = 0; i < arr1.length; i++) {
    const product = arr1[i]! * arr2[i]!;
    result.push(product);
  }
  return result;
}
