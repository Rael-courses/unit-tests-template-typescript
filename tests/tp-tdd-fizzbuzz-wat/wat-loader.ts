import { readFileSync } from "fs";
import { join } from "path";
import wabtInit from "wabt";

export type WatExports = Record<string, (...args: number[]) => number>;

/**
 * Infra (hors TDD) : lit un fichier `.wat` voisin, l'assemble en wasm via wabt,
 * l'instancie et renvoie ses exports. Le code de production sous test est le
 * `.wat` lui-même ; ce loader n'est qu'un harnais d'exécution.
 *
 * Le paramètre de type `T` laisse le test déclarer la forme attendue à la
 * frontière wasm (non typée), p.ex. `loadWatExports<{ calcFizzbuzz(n: number): number }>(…)`.
 */
export async function loadWatExports<T = WatExports>(
  watFileName: string,
): Promise<T> {
  const wabt = await wabtInit();
  const watSource = readFileSync(join(__dirname, watFileName), "utf8");
  const wasmModule = wabt.parseWat(watFileName, watSource);
  const { buffer } = wasmModule.toBinary({});
  wasmModule.destroy();
  const bytes = new Uint8Array(buffer);
  const { instance } = await WebAssembly.instantiate(bytes);
  return instance.exports as unknown as T;
}
