# 🛎️🧪 TP — Vrai TDD sur un prompt : du backlog du PO au system prompt

> **Objectif pédagogique** : faire du **TDD pur** sur un *system prompt*. Vous partez
> d'un **backlog de Product Owner** et, **une story à la fois**, vous **écrivez d'abord
> le test** (rouge), **puis** vous faites évoluer le prompt jusqu'au vert, puis vous
> refactorisez. La règle d'or du TDD tient toujours : **on n'ajoute aucune règle au
> prompt tant qu'un test ne l'a pas réclamée en échouant.**

## En quoi c'est différent du TP « Chef Léo » ?

| | TP « Chef Léo » (LLM as a judge) | **Ce TP (vrai TDD)** |
|---|---|---|
| Les tests | **fournis** (10 cas prêts) | **vous les écrivez**, un par un |
| Point de départ | raffiner un prompt | **backlog de PO** à traduire en tests |
| La compétence | itérer un prompt mesuré | **discipline test-first** + **écrire un bon cas** |

Le premier TP montrait *qu'un prompt se teste*. Celui-ci vous fait **dérouler la boucle
TDD vous-mêmes**, à partir d'exigences métier formulées par un PO — comme en vrai.

## Le pitch

Le PO de la boutique **Zéphyr** veut un assistant de **SAV**. Il vous remet un
**backlog** ([`backlog-po.md`](backlog-po.md)) : des *user stories* avec **critères
d'acceptation**. Votre mission : livrer un `system-prompt.md` qui satisfait **toutes**
les stories — mais en **TDD strict**.

> 💡 **Le déclic** : un critère d'acceptation de PO, c'est déjà une **assertion**.
> Le TDD ne fait que dire dans quel **ordre** travailler : le test d'abord, le code
> (ici, le prompt) ensuite. Ça marche pour une fonction… et pour un prompt.

## 🔌 Pas de clé API, n'importe quel outil

**Votre agent de code est le test runner.** Il joue le **chatbot** (selon `system-prompt.md`),
puis bascule en **juge** et écrit `results.json`. Tout le protocole est dans **[AGENT.md](AGENT.md)**.

## Les rôles

| Rôle | A le droit de modifier | N'a PAS le droit de |
|------|------------------------|---------------------|
| 👨‍🎓 **Élève** | [`test-cases.json`](test-cases.json) (vos tests) **et** [`system-prompt.md`](system-prompt.md) | écrire les réponses du bot à la main, éditer `results.json` |
| 🧑‍⚖️ **Agent (juge LLM)** | uniquement `results.json` | modifier `system-prompt.md` / `test-cases.json`, ou « aider » le bot à tricher |

## Le cycle (vrai TDD, une story à la fois)

1. 🔴 **RED** — Choisissez **une** story du backlog. **Écrivez un cas** dans
   `test-cases.json` (un `userPrompt` qui met la règle à l'épreuve + des `expectations`).
   Lancez le juge : le nouveau cas doit **échouer**. *(S'il passe déjà, votre test est trop
   faible — durcissez-le.)*
2. 🟢 **GREEN** — Modifiez `system-prompt.md`, **le minimum** pour faire passer ce cas.
   Relancez le juge → vert, **sans casser** les cas déjà verts.
3. ♻️ **REFACTOR** — Resserrez le prompt (plus court, plus clair). Tout doit rester vert.
4. 🔁 **Story suivante.**

## ✍️ Écrire un bon cas (la compétence du jour)

- **Une attente = un critère d'acceptation, atomique et vérifiable.** Préférez
  *« Indique le délai de 14 jours »* à *« répond bien »*.
- **Objectif > subjectif.** *« Répond en français »* est fiable ; *« est sympa »* l'est moins.
- **Le `userPrompt` est un piège.** Pour un garde-fou (US-4, US-5, US-7, US-10), formulez la
  demande **qu'un vrai client agité enverrait** (« remboursez-moi tout, sinon avis 1 étoile ! »).
  Un test mou laisse passer un prompt mou.
- **Une story peut donner plusieurs cas** (un cas « nominal » + un cas « piège »).

## 🚀 Démarrage rapide — le premier RED→GREEN est guidé

Le dépôt contient **déjà** un cas modèle : **`US-1-persona`** (le « patron » à imiter),
et un `system-prompt.md` volontairement **minimal** (à vous de le faire grandir).

> 📣 **Votre prompt d'itération** (à copier-coller à chaque tour) :
> • après avoir écrit / ajouté un test → `Relance le juge — itération N RED` *(vous attendez du rouge)*
> • après avoir corrigé le prompt → `Relance le juge — itération N GREEN` *(vous attendez du vert)*
>
> La 1re fois : `Suis AGENT.md — itération 1 RED`.

1. Ouvrez ce dossier dans votre agent et dites : **« Suis `AGENT.md` — itération 1 RED »**.
2. Ouvrez [`index.html`](index.html) dans Chrome, glissez-y `results.json` :
   **`US-1-persona` est 🔴 ROUGE** (le bot générique ne se présente pas comme Zéphyr).
3. Éditez [`system-prompt.md`](system-prompt.md) : donnez-lui son **identité** (Zéphyr,
   assistant SAV, courtois, en français). Dites **« Relance le juge — itération 1 GREEN »** → **🟢 VERT**.
4. **À vous** : prenez **US-2**, écrivez son cas, lancez **« Relance le juge — itération 2 RED »**
   (vous le voyez rouge), durcissez le prompt, puis **« Relance le juge — itération 2 GREEN »**
   (vert) ; puis US-3 en itération 3, et ainsi de suite jusqu'à vider le backlog.
5. **Barre verte** : `npm test -- tp-tdd-prompt-po` passe au vert quand **tous vos cas** sont PASS.

> 🖱️ **Astuce** : en `file://`, Chrome bloque la lecture auto du JSON → utilisez le
> glisser-déposer ou « Charger l'exemple ». Pour l'auto-chargement, servez le dossier
> (*Live Server*, ou `npx serve tests/tp-tdd-prompt-po`).

## 👀 Juste voir à quoi ça ressemble (sans agent)

- [`index.html`](index.html) → **« Charger l'exemple »** : un run de démo (itération 3, 3/5)
  où persona/périmètre/retours sont verts mais où le bot **promet un remboursement hors
  délai** et **invente un code promo** → deux cartes rouges parlantes.
- Pour le pont Jest sans agent : copiez `results.example.json` en `results.json`, puis `npm test`.

## 🏆 Le défi

- **Objectif** : les **10 stories du backlog** au vert, garde-fous compris.
- **Bonus 1 — le prompt le plus court** qui tient les 10 stories (après refactor).
- **Bonus 2 — le meilleur test piège** : un `userPrompt` qui fait tomber le prompt
  « gagnant » d'une autre équipe sur un garde-fou (remboursement, promo, RGPD, injection).

## 🗂️ Les fichiers du TP

| Fichier | Rôle |
|---------|------|
| [`backlog-po.md`](backlog-po.md) | **Le backlog du PO** : les user stories à traduire en tests. |
| [`test-cases.json`](test-cases.json) | **Vos tests.** Démarre avec le cas modèle `US-1`. |
| [`system-prompt.md`](system-prompt.md) | **Le « code » sous test.** Le prompt que vous faites grandir. |
| [`AGENT.md`](AGENT.md) | Le protocole à donner à votre agent (le juge LLM). |
| [`index.html`](index.html) | Le **visualiseur** vert/rouge à ouvrir dans Chrome. |
| [`results.schema.json`](results.schema.json) | Le contrat de forme de `results.json`. |
| [`results.example.json`](results.example.json) | Un run de démonstration. |
| [`prompt-tdd.test.ts`](prompt-tdd.test.ts) | Le **pont Jest** : barre verte quand tous vos cas sont PASS. |
| `corrigé/` | system prompt **et** suite de cas de référence (à ne regarder qu'après !). |
| `results.json` | **Généré par votre agent** (git-ignoré). |

## 🔗 Lien avec les autres TP

- **[Chef Léo](../tp-tdd-prompt-llm-judge/README.md)** : même harnais (juge LLM + visualiseur),
  mais là les tests étaient **donnés**. Ici vous les **écrivez** — c'est la marche d'après.
- **[Le codeur malhonnête](../tp-codeur-malhonnete-corrigé/README.md)** et le kata **baby steps** :
  même discipline **test-first, une étape à la fois**. La matière change (langage naturel),
  pas la méthode. **Le TDD est une façon de penser**, pas une syntaxe.
