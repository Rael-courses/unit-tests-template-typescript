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

## Méthode de travail (consignée)

Cette section fige la façon exacte de travailler sur ce kata.

### Règles de commit

- **Jamais de commit sans autorisation explicite.**
- **1 commit par étape.** Une « étape » est l'une des trois suivantes :
  1. **Test (RED)** — écriture du test, _pas en entier_, seulement jusqu'à la
     **première erreur de compilation** ou le **premier échec de test**.
  2. **Production (GREEN)** — le **strict nécessaire** pour résoudre cet échec
     précis (compilation _ou_ logique), rien de plus.
  3. **Refactor** — uniquement quand tout est vert ; remaniement à
     comportement constant.
- On **boucle** ainsi, une règle de l'énoncé après l'autre.

### Le cycle TDD en « Ultra baby steps » (mode puriste)

Le point clé : **on n'écrit jamais le test d'un seul bloc**, et **on ne
présuppose rien** (ni le nom de la fonction, ni sa signature, ni son import).
Le code de test est écrit de haut en bas et on s'arrête à la **première** chose
que le **compilateur réclame de lui-même**.

Pour une règle donnée, la séquence est :

1. **Titre + Arrange + Act** — on écrit le `describe`/`it`, l'_Arrange_, puis
   l'_Act_ : l'appel tel qu'on **souhaite** pouvoir l'écrire. C'est cet usage
   (l'Act) qui fait **émerger le nom** de la fonction — pas un `import` écrit à
   l'avance. On s'arrête à la première erreur de compilation (ex.
   `TS2304: Cannot find name 'calcFizzbuzz'`). → **RED (compilation)**
2. **Réparer la compilation** — strict minimum pour faire disparaître _cette_
   erreur : créer la fonction (corps vide / valeur quelconque) et l'`import`
   que le compilateur exige alors. Aucune logique métier. → **GREEN
   (compilation)**
3. **Assert** — on ajoute l'assertion (`expect(result).toBe(expected)`). Le
   test échoue désormais sur la **valeur**. → **RED (logique)**
4. **Implémenter le minimum** — le plus petit code qui fait passer
   l'assertion (souvent une valeur en dur d'abord, puis triangulation). →
   **GREEN (logique)**
5. **Refactor** si pertinent (test toujours vert), puis on passe à la **règle
   suivante** de l'énoncé.

Conventions de test : structure **AAA** (`// Arrange`, `// Act`, `// Assert`),
import de la fonction depuis `"."` (l'implémentation vit dans `index.ts` à côté
du test).
