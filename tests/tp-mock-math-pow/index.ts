export function listToSquares(inputList: number[]): string[] {
  return inputList.map((num) => String(Math.pow(num, 2)).padStart(3, "0"));
}
