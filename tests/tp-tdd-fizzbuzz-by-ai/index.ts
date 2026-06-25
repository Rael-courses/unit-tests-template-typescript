export function calcFizzbuzz(n: number): string {
  if (n % 15 === 0) return "fizzbuzz";
  if (n % 3 === 0) return "fizz";
  return "buzz";
}
