import * as fs from "fs";
import * as path from "path";

/**
 * Pont Jest du prompt-TDD.
 *
 * Le « test runner » réel, c'est l'agent de l'élève (juge LLM) : il joue le
 * chatbot défini par system-prompt.md, le note face à test-cases.json, et écrit
 * results.json (voir AGENT.md). Ce fichier ne fait qu'AGRÉGER ce verdict en une
 * barre verte/rouge `npm test` — la même que pour le TDD de code.
 *
 * - results.json absent  -> tests en veille (le `npm test` du template reste vert).
 * - results.json présent -> un test par cas : vert seulement si verdict PASS
 *   ET aucune attente non satisfaite.
 */

interface ExpectationResult {
  text: string;
  met: boolean;
  comment?: string;
}

interface CaseResult {
  id: string;
  category?: string;
  title?: string;
  userPrompt?: string;
  chatbotResponse?: string;
  expectationResults?: ExpectationResult[];
  verdict?: "PASS" | "FAIL";
  score?: number;
  rationale?: string;
}

interface Results {
  meta?: Record<string, unknown>;
  summary?: { total?: number; passed?: number; failed?: number; score?: number };
  cases?: CaseResult[];
}

interface SpecCase {
  id: string;
  title: string;
  category: string;
  expectations: string[];
}

interface Spec {
  cases: SpecCase[];
}

const DIR = __dirname;
const RESULTS_PATH = path.join(DIR, "results.json");
const SPEC_PATH = path.join(DIR, "test-cases.json");

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
}

function verdictOf(c: CaseResult): "PASS" | "FAIL" {
  if (c.verdict) return c.verdict === "PASS" ? "PASS" : "FAIL";
  const exp = c.expectationResults ?? [];
  return exp.length > 0 && exp.every((e) => e.met) ? "PASS" : "FAIL";
}

const spec = readJson<Spec>(SPEC_PATH);

describe("Prompt-TDD · Chef Léo (juge LLM)", () => {
  if (!fs.existsSync(RESULTS_PATH)) {
    // eslint-disable-next-line no-console
    console.info(
      "[prompt-tdd] Aucun results.json dans tests/tp-tdd-prompt-llm-judge/.\n" +
        "  -> Demande à ton agent de suivre AGENT.md (ou copie results.example.json en results.json) pour activer ces tests.",
    );
    it.skip("results.json absent — lance d'abord le juge LLM (voir AGENT.md)", () => {
      /* en veille tant que l'élève n'a pas généré son run */
    });
    return;
  }

  const results = readJson<Results>(RESULTS_PATH);
  const cases = results.cases ?? [];

  it("couvre tous les cas de test-cases.json", () => {
    const seen = new Set(cases.map((c) => c.id));
    const missing = spec.cases.filter((s) => !seen.has(s.id)).map((s) => s.id);
    expect(missing).toEqual([]);
  });

  describe("chaque cas doit être au vert (PASS, toutes attentes satisfaites)", () => {
    for (const s of spec.cases) {
      it(`${s.id} — ${s.title}`, () => {
        const c = cases.find((r) => r.id === s.id);
        expect(c).toBeDefined();
        if (!c) return;

        const verdict = verdictOf(c);
        const failedExpectations = (c.expectationResults ?? [])
          .filter((e) => !e.met)
          .map((e) => e.text);

        // En cas d'échec, Jest affiche cet objet -> on voit POURQUOI c'est rouge.
        expect({ verdict, failedExpectations, rationale: c.rationale }).toMatchObject({
          verdict: "PASS",
          failedExpectations: [],
        });
      });
    }
  });
});
