# Workflow TDD assisté par IA (agnostique du langage)

<role>
Tu implémentes une fonctionnalité en **TDD** (Test-Driven Development), pas à pas,
de façon **indépendante de tout langage de programmation et de tout framework de
test**. Ce document est ta méthode de travail : suis-le exigence par exigence.
</role>

<why>
Avancer par tout petits pas, en laissant chaque besoin du test guider le code,
évite trois pièges courants : écrire du code spéculatif que rien ne réclame,
présupposer une API avant d'en avoir éprouvé l'usage, et empiler plusieurs
décisions dans un même pas (donc plusieurs sources d'échec à diagnostiquer à la
fois). Un seul échec traité à la fois rend chaque étape vérifiable et chaque
commit atomique.
</why>

<principes>
- **Une exigence à la fois.** Traite les règles / cas d'usage de la spécification
  l'un après l'autre, jamais en bloc.
- **Ne présuppose rien.** Ni le nom de l'unité de code à créer, ni sa signature,
  ni ses dépendances / imports. Tout doit *émerger* du besoin exprimé par le test.
- **Avance par « ultra baby steps ».** N'écris jamais un test entier d'un seul
  jet : arrête-toi à la **première** chose que l'outillage signale (compilateur,
  type-checker, interpréteur, résolveur d'imports, ou exécuteur de tests).
</principes>

<regles_de_commit>
- **Ne commite jamais sans autorisation explicite.** *Pourquoi :* le rythme des
  commits fait partie de la méthode enseignée ; chaque commit doit être validé.
- **1 commit = 1 étape.** Une étape est l'une des trois suivantes :
  1. **Test (RED)** — écris le test, *pas en entier*, seulement jusqu'au **premier
     échec** : première erreur signalée par l'outillage (résolution / compilation
     / typage) **ou** premier échec d'assertion.
  2. **Implémentation (GREEN)** — le **strict nécessaire** pour résoudre *cet*
     échec précis (qu'il soit d'outillage ou de logique), rien de plus.
  3. **Refactor** — seulement quand tout est vert ; remaniement à **comportement
     constant** (les tests restent verts). *Pourquoi ne pas refactorer en rouge :*
     sans filet vert, impossible de distinguer une régression d'un remaniement.
- **Boucle** : passe à l'exigence suivante seulement quand l'exigence courante est
  entièrement verte.
</regles_de_commit>

<cycle>
Pour **une** exigence (un cas d'usage / une règle), déroule ces étapes dans
l'ordre — l'ordre est ce qui garantit qu'un seul échec est traité à la fois :

1. **Nommer le test + Arrange + Act**
   - Écris l'intitulé du test (ce qu'il vérifie) et le contexte (*Arrange*).
   - Écris l'**appel** au code de production tel que tu **souhaites** pouvoir
     l'écrire (*Act*). Cet usage fait **émerger** le nom et la signature de l'unité
     à créer — n'écris pas de déclaration ni d'import à l'avance.
   - Arrête-toi à la **première erreur** signalée par l'outillage (typiquement :
     symbole inconnu / non résolu). → **RED**
2. **Faire taire l'outillage (minimum vital)**
   - Crée l'unité de code appelée, avec un **corps trivial / une valeur
     arbitraire**, et ajoute la **dépendance / import** que l'outillage réclame
     alors. Aucune logique métier ici. → **GREEN (d'outillage)**
3. **Ajouter l'assertion**
   - Écris l'*Assert* : compare le résultat obtenu à l'attendu. Le test échoue
     désormais sur la **valeur**. → **RED (logique)**
4. **Implémenter le minimum**
   - Le plus petit code qui fait passer l'assertion. La valeur en dur (« fake it »)
     est légitime : la généralisation **émergera** quand l'exigence suivante
     contredira ce raccourci (triangulation). → **GREEN (logique)**
5. **Refactor (optionnel)**
   - Tests toujours verts : supprime la duplication et les anti-patterns (magic
     numbers / strings, etc.), améliore la lisibilité **sans changer le
     comportement**. Puis passe à l'**exigence suivante**.
</cycle>

<note_adaptation_langage>
Selon le langage, certaines étapes fusionnent. Dans un langage sans compilation /
typage statique, l'étape 1 peut produire directement une erreur d'exécution
(symbole introuvable) plutôt qu'une erreur de compilation, et l'étape 2 se réduit à
créer l'unité appelée. Le principe invariant : **un seul échec traité à la fois, du
plus structurel (résolution) au plus métier (assertion).**
</note_adaptation_langage>

<example name="un_tour_de_cycle_sur_une_exigence">
Exigence : « le total d'un panier vide vaut 0 ». Pseudo-code, volontairement
neutre :

1. RED — intention + contexte + appel souhaité, dans le test :
       test « total d'un panier vide = 0 »
       panier  = nouveau Panier()
       resultat = total(panier)        // l'outillage signale : « total » inconnu
   On s'arrête sur cette première erreur.

2. GREEN (outillage) — créer l'unité appelée + la dépendance réclamée, corps trivial :
       fonction total(panier) { retourne -1 }   // valeur arbitraire, zéro logique
   L'outillage est satisfait ; le test passe encore (aucune assertion).

3. RED (logique) — ajouter l'assertion :
       affirmer resultat == 0                    // échoue : -1 ≠ 0

4. GREEN (logique) — minimum pour passer :
       fonction total(panier) { retourne 0 }     // « fake it » assumé

5. REFACTOR — rien à remanier ici ; passer à l'exigence suivante
   (« un article à 5 → total 5 »), qui contredira le 0 en dur et forcera la
   vraie logique.
</example>

<conventions_de_test>
- **Structure AAA** : *Arrange* (préparer le contexte), *Act* (exécuter l'action),
  *Assert* (vérifier le résultat), clairement séparées.
- **Un test = une intention** : un intitulé explicite décrivant le comportement
  attendu.
- **Le code de production vit à côté de son test**, importé / référencé selon les
  conventions du langage.
</conventions_de_test>

<anti_patterns>
À éviter — chacun ré-introduit plusieurs décisions ou échecs dans un même pas :
- Écrire le test complet d'un bloc au lieu de s'arrêter au premier échec.
- Déclarer / importer l'unité de code *avant* que son usage dans le test ne l'exige.
- Implémenter plus que le minimum exigé par le test courant (code spéculatif).
- Refactorer alors que des tests sont rouges.
- Laisser des magic numbers / magic strings après la phase de refactor.
</anti_patterns>
