export function sumNumbers(arr: number[]): number {
  return arr.reduce((sum, num) => sum + num, 0);
}
