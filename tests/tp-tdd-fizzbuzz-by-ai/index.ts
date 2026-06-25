const FIZZ_DIVISOR = 3;
const BUZZ_DIVISOR = 5;
const FIZZ = "fizz";
const BUZZ = "buzz";

export function calcFizzbuzz(n: number): string {
  const isFizz = n % FIZZ_DIVISOR === 0;
  const isBuzz = n % BUZZ_DIVISOR === 0;

  if (isFizz && isBuzz) return FIZZ + BUZZ;
  if (isFizz) return FIZZ;
  if (isBuzz) return BUZZ;
  return String(n);
}
