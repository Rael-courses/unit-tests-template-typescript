# 🧬 TP — Mutation Arena

> **Objectif pédagogique** : découvrir que la **couverture de code ment**, et mesurer
> *objectivement* la qualité d'une suite de tests avec le **mutation testing**.
> C'est le capstone chiffré du parcours : le « codeur malhonnête » vous demandait
> *« combien de tests suffisent ? »* — ici, Stryker vous répond avec un nombre.

## Le pitch

La couverture (coverage) vous dit *quelles lignes sont exécutées*. Elle ne dit **pas**
si vos tests **vérifient** quoi que ce soit : un test sans assertion donne 100 % de
couverture. Le **mutation testing** répond à la vraie question :

> **« Si je casse le code, est-ce qu'un test hurle ? »**

[Stryker](https://stryker-mutator.io/) prend l'implémentation **correcte** de `BowlingGame`,
y injecte des dizaines de petits bugs (les **mutants** : `+` → `-`, `<` → `<=`,
`=== 10` → `!== 10`, suppression de ligne…), et relance vos tests pour chaque mutant.

- 🟢 **Mutant tué (killed)** : au moins un test échoue → bravo, votre test l'a attrapé.
- 🔴 **Mutant survivant (survived)** : tous vos tests restent verts malgré le bug → **trou dans votre suite**.

Le **mutation score** = % de mutants tués. C'est votre note.

## Le jeu

1. La suite de départ ([tests/tp-mutation-arena/BowlingGame.test.ts](../../tests/tp-mutation-arena/BowlingGame.test.ts))
   est **verte** et couvre ~100 % des lignes. Pourtant elle laisse des **mutants survivants**.
2. Lancez l'arène :
   ```
   npm run test:mutation
   ```
3. Ouvrez le rapport HTML : **`reports/mutation/mutation.html`**. Chaque mutant survivant
   est surligné dans le code source, à la ligne exacte.
4. 🎯 **Mission : ajoutez des tests jusqu'à un mutation score de 100 % (zéro survivant).**
   Vous n'avez le droit de modifier QUE le fichier de tests — jamais `BowlingGame.ts`.

## Règles & barème

| Rôle | Modifie | Ne touche pas à |
|------|---------|------------------|
| 👨‍🎓 **Élève** | `tests/tp-mutation-arena/BowlingGame.test.ts` | `src/tp-mutation-arena/BowlingGame.ts`, la config Stryker |

- **Score de l'équipe = mutation score final** atteint dans le temps imparti (ex. 20 min).
- Bonus : **le moins de tests possible** pour atteindre 100 %. Un bon test tue plusieurs mutants à la fois ; empiler des tests redondants ne fait pas monter le score.
- À la fin, comparez : deux équipes peuvent être à 100 % avec un nombre de tests très différent → discussion sur ce qu'est un test *à forte valeur*.

## Pourquoi le Bowling est un bon cas d'école

Le calcul du score combine **arithmétique** (bonus additionnés), **conditions de bord**
(`=== 10` pour un strike, `< 10` pour la boucle de frames) et **branches** (open frame /
spare / strike). Résultat : Stryker génère des mutants subtils que la suite « évidente »
(caniveau, tous les 1, un spare, un strike) **ne tue pas**. Les survivants typiques :

- la **partie parfaite** (12 strikes = 300) n'est pas testée → la gestion de la 10e frame / la borne de boucle survit ;
- une partie **100 % de spares** n'est pas testée → un mutant sur le bonus de spare survit.

À vous de trouver lesquels — le rapport HTML vous montre exactement où.

## 💡 Lien avec le TP précédent

Un **mutant survivant**, c'est exactement une **triche que le « codeur malhonnête » aurait pu garder** :
le bug passe vos tests. Le mutation testing automatise donc, à grande échelle, ce que vous faisiez
à la main contre l'IA — et chiffre le résultat.

## Note technique

- Outils : `@stryker-mutator/core` + `@stryker-mutator/jest-runner` (déjà en devDependencies).
- Config : [stryker.config.json](../../stryker.config.json) — Stryker ne mute **que** ce dossier
  (`mutate: src/tp-mutation-arena/**`) et réutilise votre `jest.config.js` existant.
- Le dossier `reports/` (rapport HTML) et `.stryker-tmp/` peuvent être ajoutés au `.gitignore`.
