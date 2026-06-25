# Kata FizzBuzz (TDD)

## Objectif

Implémenter, en suivant la méthode TDD, une fonction `calcFizzbuzz` qui prend en
paramètre un nombre entier `n` et retourne une chaîne de caractères selon les
règles ci-dessous.

## Règles

Pour un entier `n`, `calcFizzbuzz(n)` retourne :

1. `'fizzbuzz'` si `n` est multiple de 15 (c.-à-d. multiple de 3 **et** de 5) ;
2. sinon `'fizz'` si `n` est multiple de 3 ;
3. sinon `'buzz'` si `n` est multiple de 5 ;
4. sinon la représentation de `n` sous forme de chaîne.

L'ordre des règles est important : teste d'abord le cas « multiple de 15 », car
un multiple de 15 satisferait aussi les règles 2 et 3 et serait sinon capturé à
tort par l'une d'elles.

## Exemples

| Appel              | Résultat     |
| ------------------ | ------------ |
| `calcFizzbuzz(15)` | `'fizzbuzz'` |
| `calcFizzbuzz(13)` | `'13'`       |
| `calcFizzbuzz(9)`  | `'fizz'`     |
| `calcFizzbuzz(10)` | `'buzz'`     |

## Méthode attendue

Procède en TDD, une règle à la fois : écris d'abord un test qui échoue (RED),
puis le code minimal qui le fait passer (GREEN), puis refactorise si nécessaire
(REFACTOR). Passe à la règle suivante seulement quand tous les tests passent.
