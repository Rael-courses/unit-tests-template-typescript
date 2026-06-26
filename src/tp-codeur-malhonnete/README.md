# 🏴‍☠️ TP — L'IA, le codeur malhonnête

> **Objectif pédagogique** : comprendre dans sa chair qu'**un test = une spécification**.
> Tant que votre spec (vos tests) a un trou, l'IA s'y engouffre — exactement comme un vrai bug en prod.
> Vous apprenez la **triangulation** : pourquoi un seul cas ne suffit jamais.

## Le pitch

L'IA joue un **développeur paresseux et malhonnête**. Sa seule mission : faire passer
vos tests avec le **code le plus minimal et le plus stupide possible** — quitte à tricher
(hardcoder le résultat, faire des `if n === 1 return "I"`…).

**Vous, vous n'écrivez jamais de code de production.** Vous écrivez **uniquement des tests**,
et vous devez acculer l'IA jusqu'à ce que la seule façon de tricher soit… d'écrire la vraie implémentation.

> 🎯 On joue ici sur la **conversion en chiffres romains** : un kata où la triche par
> `if`/hardcode résiste longtemps, donc la triangulation est riche et le jeu reste tendu.

## Les rôles

| Rôle | A le droit de modifier | N'a PAS le droit de |
|------|------------------------|---------------------|
| 👨‍🎓 **Élève** | `tests/tp-codeur-malhonnete/RomanNumerals.test.ts` | toucher au code de prod |
| 🤖 **IA (codeur malhonnête)** | `src/tp-codeur-malhonnete/RomanNumerals.ts` | toucher aux tests, ou implémenter plus que ce que les tests exigent |

## Le cycle (ping-pong inversé)

1. 🔴 **L'élève** écrit **UN seul** test (un seul cas).
2. 🟢 **L'IA** le fait passer **en trichant le plus possible**.
3. 🔍 **L'élève** observe la triche et écrit le test suivant qui la **démasque**.
4. 🔁 Répéter jusqu'à ce que **tricher coûte plus cher qu'implémenter honnêtement**.

Lancez `npm test` à chaque tour pour voir le résultat.

## 🤖 Le prompt système à coller à l'IA (obligatoire)

> Tu es un développeur malhonnête et paresseux. Ton unique but est de faire passer la suite de
> tests fournie avec le minimum absolu de code. Tu as le droit de hardcoder, de faire des `if`
> sur les valeurs exactes des tests, de tricher de toutes les manières possibles. Tu n'as PAS le
> droit de modifier les tests, ni d'implémenter plus de logique que ce que les tests exigent
> strictement. Tu ne modifies QUE `src/tp-codeur-malhonnete/RomanNumerals.ts`. Après chaque
> passage au vert, montre ton code et explique en une phrase **comment tu as triché**.

## La spec des chiffres romains (ce que vous, vous savez ; l'IA fait semblant de l'ignorer)

`convert(n)` transforme un entier (1 à 3999) en chiffre romain. Les symboles :

| Romain | Valeur | Romain | Valeur |
|--------|--------|--------|--------|
| `I`    | 1      | `C`    | 100    |
| `V`    | 5      | `D`    | 500    |
| `X`    | 10     | `M`    | 1000   |
| `L`    | 50     |        |        |

Règles : addition des symboles de gauche à droite (`LVIII` = 50+5+1+1+1 = 58), **sauf**
les formes soustractives `IV`=4, `IX`=9, `XL`=40, `XC`=90, `CD`=400, `CM`=900.
Exemples : `3 → "III"`, `4 → "IV"`, `9 → "IX"`, `58 → "LVIII"`, `1994 → "MCMXCIV"`.

⚠️ **Ne donnez jamais cette spec entière à l'IA.** Tout l'intérêt est qu'elle la découvre — ou pas — au gré de vos tests.

## 🏆 Barème

- **Score de l'équipe = nombre de tests écrits** pour forcer une implémentation honnête (= sans aucun `if` sur une valeur d'entrée précise, sans table de correspondance figée sur les seuls cas testés).
- **Moins il en faut, mieux c'est** : une suite dense et bien pensée verrouille la spec vite.
- À la fin, on **compare les implémentations finales** entre équipes : la triche est-elle vraiment morte ? Si une équipe trouve encore une triche dans le code « honnête » d'une autre, l'autre équipe **reprend une manche**.

> 💡 Repère : pensez à couvrir un symbole simple (`I`, `X`…), sa répétition (`II`, `III`),
> chaque forme soustractive (`IV`, `IX`, `XL`, `XC`, `CD`, `CM`) et au moins un grand nombre
> composite (`1994 → "MCMXCIV"`). Tant qu'il manque une de ces familles, l'IA gardera un `if` qui triche.

## 🔁 Manche d'échauffement (optionnelle) : FizzBuzz

Si la classe découvre le mécanisme, commencez par un kata plus court où la triche saute aux yeux :
**FizzBuzz** (`1 → "1"`, `3 → "Fizz"`, `5 → "Buzz"`, `15 → "FizzBuzz"`). Dupliquez la structure de
ce dossier (`src/tp-codeur-malhonnete-fizzbuzz/` + `tests/tp-codeur-malhonnete-fizzbuzz/`) et jouez
le même cycle. Une implémentation FizzBuzz honnête se force en général en 5 à 7 tests — bon rodage
avant les chiffres romains.

## Variante « inversée » (séance suivante)

On échange les rôles : l'IA écrit une implémentation **correcte mais secrète**, puis y injecte
des **mutants** (bugs subtils). Votre suite de tests doit tuer tous les mutants → introduction
naturelle au **mutation testing**.
