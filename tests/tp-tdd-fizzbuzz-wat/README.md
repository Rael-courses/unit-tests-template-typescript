# Kata FizzBuzz en WebAssembly Text (WAT) — TDD ultra baby steps

## Pourquoi cette aventure

Rejouer le kata FizzBuzz avec la méthode TDD « ultra baby steps » (voir
[`docs/workflows/TDD-BY-AI-WORKFLOW.md`](../../docs/workflows/TDD-BY-AI-WORKFLOW.md))
dans un langage **exotique** et **sans installer d'environnement** :
l'assembleur **WebAssembly Text**.

L'assemblage `.wat` → `.wasm` se fait via le paquet `wabt` (dev-dependency), et
l'exécution + les assertions via le **Jest** déjà présent dans le projet — zéro
toolchain natif (ni MASM, ni GCC, ni WSL).

## Contrat adapté (entiers, pas de chaînes)

L'assembleur manipule très bien les **entiers** et très mal les **chaînes**
(formater un nombre ou renvoyer une string = gestion mémoire manuelle). On adapte
donc le contrat : la fonction exportée renvoie un **code entier**, et le mapping
vers la chaîne FizzBuzz vivrait côté hôte (hors assembleur).

`calcFizzbuzz(n: i32) -> i32` :

| Cas        | Condition      | Code |
| ---------- | -------------- | ---- |
| `fizzbuzz` | `n % 15 == 0`  | `3`  |
| `fizz`     | `n % 3 == 0`   | `1`  |
| `buzz`     | `n % 5 == 0`   | `2`  |
| nombre     | sinon          | `0`  |

L'ordre « tester le multiple de 15 en premier » reste valable (un multiple de 15
satisfait aussi les conditions de 3 et de 5).

## Harnais

- `fizzbuzz.wat` — le code de production **sous TDD** (l'assembleur).
- `wat-loader.ts` — **infra (hors TDD)** : lit le `.wat`, l'assemble (`wabt`),
  l'instancie, renvoie ses exports.
- `index.test.ts` — les tests Jest, écrits en baby steps.

Méthode de travail (RED → GREEN → REFACTOR, 1 commit par étape, jamais sans
autorisation) : celle de
[`docs/workflows/TDD-BY-AI-WORKFLOW.md`](../../docs/workflows/TDD-BY-AI-WORKFLOW.md).
