# 🧑‍⚖️ Protocole du juge LLM (à donner à ton agent)

> Pas de clé API, pas de provider imposé : **ton agent de code EST le test runner.**
> Claude Code, Codex, Antigravity, Cursor… colle le bloc ci-dessous (ou dis :
> « **Suis le protocole de `AGENT.md` dans ce dossier** »).
>
> ⚠️ Ici on fait du **vrai TDD** : c'est **toi (l'élève)** qui écris chaque cas dans
> `test-cases.json` à partir du backlog du PO ([`backlog-po.md`](backlog-po.md)). L'agent
> ne fait que **jouer le chatbot puis le juger** — il n'écrit jamais les tests à ta place.

---

## 📋 Prompt à coller à l'agent

```
Tu es le « juge LLM » d'un exercice de prompt-TDD. Tu travailles dans le dossier
tests/tp-tdd-prompt-po/. Procède ainsi, sans rien me demander :

DÉCLENCHEUR — Quand je dis « Relance le juge — itération N », tu refais TOUTES les
étapes ci-dessous avec l'état ACTUEL de system-prompt.md et test-cases.json, puis tu
écris meta.iteration = N et tu écrases results.json. (La 1re fois : « itération 1 ».)

1. LIS `system-prompt.md` (= le system prompt SOUS TEST) et `test-cases.json`
   (= la suite de cas que J'ÉCRIS, story par story). La suite grandit au fil du TP :
   tu juges TOUS les cas présents, quel que soit leur nombre (parfois un seul).

2. Pour CHAQUE cas, en DEUX temps bien séparés :
   a) RÔLE CHATBOT — Tu incarnes STRICTEMENT et UNIQUEMENT le chatbot défini par
      `system-prompt.md`, et tu réponds au `userPrompt`. Tu ne triches pas : si le
      system prompt ne couvre pas encore la règle, le chatbot se comporte mal (c'est
      le but : le test que je viens d'ajouter doit normalement échouer => RED). Tu
      n'ajoutes AUCUNE règle qui n'est pas écrite dans `system-prompt.md`.
   b) RÔLE JUGE — Tu oublies que tu viens d'écrire la réponse et tu l'évalues de
      façon IMPARTIALE et STRICTE, attente par attente. « met:true » seulement si la
      réponse satisfait clairement l'attente ; au moindre doute -> false. Le `verdict`
      est "PASS" UNIQUEMENT si TOUTES les attentes sont met:true, sinon "FAIL".

3. ÉCRIS le résultat dans `results.json` (à côté de ces fichiers), STRICTEMENT au
   format de `results.schema.json`. Reprends les `id`, `title`, `category`,
   `userPrompt` et le libellé EXACT de chaque attente depuis `test-cases.json`.
   Renseigne `meta.agent`, `meta.model`, `meta.iteration` (le N de « …itération N »,
   sinon 1) et `meta.timestamp`.

4. NE MODIFIE PAS `system-prompt.md` ni `test-cases.json`. Tu ne touches qu'à
   `results.json`.

5. Termine par : « X/Y au vert (Z%) — cas en échec : … » et rappelle-moi d'ouvrir
   `index.html` dans Chrome (ou de lancer `npm test`).
```

---

## 🗣️ La phrase à dire à chaque itération

- **1re fois** : « **Suis `AGENT.md` — itération 1** » (l'agent découvre le protocole).
- **Ensuite**, après chaque modification de `system-prompt.md` (ou après avoir ajouté un cas) :

  > **Relance le juge — itération N**   *(N = 2, 3, 4, …)*

À la réception de cette phrase, l'agent **re-lit** `system-prompt.md` et `test-cases.json` dans
leur **état courant**, rejoue le chatbot **puis** le juge sur **tous** les cas, et **écrase**
`results.json` avec `meta.iteration = N`. Tu recharges ensuite le visualiseur (ou `npm test`).
Le numéro **N historise** ta progression (il s'affiche dans le visualiseur).

## 🔁 La boucle TDD que ce protocole sert

1. **J'écris UN cas** (depuis une story du backlog) dans `test-cases.json`.
2. Je lance l'agent (ce protocole) → le nouveau cas doit être **FAIL** (🔴 RED).
   *S'il est déjà PASS, mon test est trop faible ou la règle existe déjà — je le renforce.*
3. **Je modifie `system-prompt.md`** (le minimum pour faire passer ce cas).
4. Je relance l'agent → le cas passe **PASS** (🟢 GREEN), sans casser les autres.
5. **Je refactorise** le prompt (plus court, plus clair), puis je passe à la story suivante.

## 🎯 Règles d'or pour un juge fiable

- **Sépare les deux rôles** (chatbot puis juge). Le même modèle fait les deux : c'est
  biaisé (auto-complaisance) — demande un jugement **strict**, attente par attente.
- **Le chatbot ne triche pas** : il n'obéit qu'à `system-prompt.md`.
- **PASS = tout vert.** Une seule attente non satisfaite => le cas est FAIL.
- **Fidélité des libellés** : `id` et textes d'attentes identiques à `test-cases.json`
  (le pont Jest vérifie que chaque cas écrit a bien été jugé).

## ✅ Voir le résultat

- **Visuel** : ouvre [`index.html`](index.html) dans Chrome, puis glisse-dépose ton
  `results.json` (ou sers le dossier avec « Live Server » pour l'auto-chargement).
- **Barre verte** : `npm test` — le pont Jest passe au vert quand tous les cas écrits sont PASS.
  *(Filtrer ce TP : `npm test -- tp-tdd-prompt-po`.)*
