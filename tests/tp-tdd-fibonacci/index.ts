export function calcFibonacci(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  const n1 = calcFibonacci(n - 1);
  const n2 = calcFibonacci(n - 2);

  return n2 + n1;
}
