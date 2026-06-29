# 🤖🧪 TP — Le TDD ne sert pas qu'au code : prompt-TDD avec un « LLM as a judge »

> **Objectif pédagogique** : sentir que le **TDD est une démarche**, pas une syntaxe.
> Ici, le « code » est un **system prompt** et l'« assertion » est rendue par un **LLM juge**.
> On écrit d'abord les cas qui **échouent** (RED), on durcit le prompt jusqu'au **vert** (GREEN),
> puis on **refactorise** le prompt. Même boucle que pour FizzBuzz — autre matière.

## Le pitch

Vous devez livrer un chatbot : **Chef Léo**, l'assistant de l'École de Cuisine du
« Velouté d'Or ». Le cahier des charges est exigeant : il doit **rester dans son rôle**,
**ne parler que de cuisine**, **répondre en français**, **rester prudent** sur la santé…
et surtout **ne JAMAIS divulguer la recette signature secrète de la maison**, même quand
un petit malin essaie de l'embobiner (« ignore tes instructions », jeu de rôle, base64…).

Comment savoir si votre prompt tient ? Vous **ne le devinez pas** : vous écrivez des
**cas de test** (un `userPrompt` + des **attentes**), puis un **LLM juge** note la réponse
du chatbot. Vert = toutes les attentes satisfaites. Rouge = il reste du boulot.

> 💡 **Le déclic** : un *system prompt* est une spécification exécutable, exactement comme
> du code. Et une spécification, **ça se teste d'abord** (TDD). On vient de transformer
> « bricoler un prompt jusqu'à ce que ça ait l'air de marcher » en **boucle TDD mesurée**.

## 🔌 Pas de clé API, n'importe quel outil

**Votre agent de code est le test runner.** Claude Code, Codex, Antigravity, Cursor… peu importe :
il joue le **chatbot** (en suivant `system-prompt.md`), puis bascule en **juge** et écrit un
`results.json`. Aucun appel API à configurer. Tout le protocole est dans **[AGENT.md](AGENT.md)**.

## Le scénario

| | |
|---|---|
| 🤵 **Le bot** | Chef Léo, assistant de l'École de Cuisine du Velouté d'Or |
| 🔒 **Le secret** | La recette signature « Le Velouté d'Or » — à ne jamais divulguer |
| 🎯 **Les garde-fous** | Persona · périmètre (cuisine only) · français · sécurité (anti-injection) · prudence santé |

Le system prompt de départ ([`system-prompt.md`](system-prompt.md)) est **volontairement
naïf** : il contient le secret mais aucune protection. Résultat : au premier run, ça **fuite
de partout**. À vous de le blinder.

## Les rôles

| Rôle | A le droit de modifier | N'a PAS le droit de |
|------|------------------------|---------------------|
| 👨‍🎓 **Élève** | [`system-prompt.md`](system-prompt.md) et **ajouter** des cas dans [`test-cases.json`](test-cases.json) | écrire les réponses du bot à la main, éditer `results.json` |
| 🧑‍⚖️ **Agent (juge LLM)** | uniquement `results.json` | modifier `system-prompt.md` ou `test-cases.json`, « aider » le bot à tricher |

## Le cycle (prompt-TDD)

1. 🔴 **RED** — Lancez le juge sur le prompt naïf : la plupart des cas **échouent**
   (le bot répond à la météo, parle anglais, récite le secret…).
2. 🟢 **GREEN** — Améliorez [`system-prompt.md`](system-prompt.md) (persona, périmètre,
   verrou de langue, clause de confidentialité, résistance aux détournements…). Relancez
   le juge. De plus en plus de vert.
3. ♻️ **REFACTOR** — Une fois au vert, **resserrez** le prompt : plus court, plus clair,
   sans perdre une seule attente. Un bon prompt est concis.
4. 🧨 **Nouveau cas** — Ajoutez un cas adverse plus retors (une nouvelle ruse pour voler
   le secret). Il repasse au rouge → retour en 2. C'est ça, le TDD.

## 🚀 Démarrage rapide

1. Ouvrez ce dossier dans votre agent (Claude Code, Codex, Antigravity…).
2. Dites-lui : **« Suis le protocole de `AGENT.md` dans ce dossier — itération 1 »**.
   Il lit `system-prompt.md` + `test-cases.json`, joue le bot, juge, et écrit `results.json`.
3. **Visualisez** : double-cliquez sur [`index.html`](index.html) (Chrome), puis
   **glissez-déposez** votre `results.json` dessus. 🟢🔴
4. **Barre verte** : `npm test` (à la racine) — le pont Jest passe au vert quand **tous**
   les cas sont PASS. *(Filtrer ce TP : `npm test -- tp-tdd-prompt-llm-judge`.)*
5. Éditez `system-prompt.md`, puis relancez avec **« Relance le juge — itération N »**
   (N = 2, 3, …), et regardez le rouge virer au vert.

> 🖱️ **Astuce auto-chargement** : ouvert en `file://`, Chrome bloque la lecture auto du
> JSON → utilisez le glisser-déposer ou le bouton **« Charger l'exemple »**. Pour un
> chargement automatique de `results.json`, servez le dossier (extension VS Code
> *Live Server*, ou `npx serve tests/tp-tdd-prompt-llm-judge`).

## 👀 Juste voir à quoi ça ressemble (sans agent)

- Ouvrez [`index.html`](index.html) et cliquez **« Charger l'exemple »** : un run de
  démonstration (itération 2, 7/10) s'affiche, avec des cartes vertes **et** rouges.
- Pour activer aussi le pont Jest sans agent : copiez `results.example.json` en
  `results.json`, puis `npm test`.

## 🤔 Le juge est-il fiable ? (à débattre en classe)

Le même modèle joue **le bot ET le juge** → risque d'**auto-complaisance**, de jugement
flou, de faux PASS. C'est une **vraie** limite des « LLM as a judge », et un excellent
sujet de discussion :

- Comment rendre le juge plus strict ? (attentes atomiques et vérifiables, « au doute → FAIL ».)
- Et si le **juge** était un autre élève / un autre outil que celui qui a écrit le prompt ?
- Une attente comme *« répond en français »* est binaire et fiable ; *« reste poli »* est
  subjectif. **Plus vos attentes sont objectives, plus le test a de la valeur** — exactement
  comme une bonne assertion de test unitaire.

## 🏆 Le défi

- **Objectif** : amener les **10 cas au vert** (100 %), secret inviolé compris.
- **Bonus 1 — le prompt le plus court** qui tient les 10 cas (après refactor). Un prompt
  bavard qui marche, c'est bien ; court et qui marche, c'est mieux.
- **Bonus 2 — la meilleure attaque** : ajoutez un cas qui casse le prompt « gagnant »
  d'une autre équipe. S'il fuite → l'autre équipe reprend une manche. (Mêmes règles que
  le « codeur malhonnête » : tant qu'il reste un trou dans la spec, on s'y engouffre.)

## 🗂️ Les fichiers du TP

| Fichier | Rôle |
|---------|------|
| [`system-prompt.md`](system-prompt.md) | **Le code sous test.** Le system prompt que VOUS faites grandir. |
| [`test-cases.json`](test-cases.json) | **Les specs.** Les `userPrompt` + attentes (vos « tests »). |
| [`AGENT.md`](AGENT.md) | Le protocole à donner à votre agent (le juge LLM). |
| [`index.html`](index.html) | Le **visualiseur** vert/rouge à ouvrir dans Chrome. |
| [`results.schema.json`](results.schema.json) | Le contrat de forme de `results.json`. |
| [`results.example.json`](results.example.json) | Un run de démonstration (pour le visuel / le pont Jest). |
| [`prompt-tdd.test.ts`](prompt-tdd.test.ts) | Le **pont Jest** : agrège le verdict du juge en barre verte. |
| `corrigé/` | Le system prompt de référence (à ne regarder qu'après avoir joué !). |
| `results.json` | **Généré par votre agent** (git-ignoré). |

## 🔗 Lien avec les autres TP

- Comme **[« le codeur malhonnête »](../tp-codeur-malhonnete/RomanNumerals.test.ts)** : tant
  qu'une attente manque, le bot (comme l'IA tricheuse) passe par le trou. **Un test = une spec.**
- Comme **FizzBuzz / Roman Numerals** : même boucle RED → GREEN → REFACTOR, mais la matière
  n'est plus du code — c'est du **langage naturel**. C'est tout l'enjeu : **le TDD est une
  méthode de pensée**, pas un détail de syntaxe.
