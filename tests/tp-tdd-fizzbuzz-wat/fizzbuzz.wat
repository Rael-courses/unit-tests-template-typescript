(module
  ;; calcFizzbuzz(n) -> code : 3 = fizzbuzz, 1 = fizz, 2 = buzz, 0 = nombre
  (func (export "calcFizzbuzz") (param $n i32) (result i32)
    (local $isFizz i32) ;; n multiple de 3
    (local $isBuzz i32) ;; n multiple de 5
    (local.set $isFizz (i32.eqz (i32.rem_u (local.get $n) (i32.const 3))))
    (local.set $isBuzz (i32.eqz (i32.rem_u (local.get $n) (i32.const 5))))
    ;; multiple de 3 ET de 5 -> 3 (fizzbuzz)
    (if (i32.and (local.get $isFizz) (local.get $isBuzz))
      (then (return (i32.const 3))))
    ;; multiple de 3 -> 1 (fizz)
    (if (local.get $isFizz)
      (then (return (i32.const 1))))
    ;; multiple de 5 -> 2 (buzz)
    (if (local.get $isBuzz)
      (then (return (i32.const 2))))
    ;; sinon -> 0 (nombre)
    (i32.const 0)))
