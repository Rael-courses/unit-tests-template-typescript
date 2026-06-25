import { readFileSync } from "fs";
import { join } from "path";
import wabtInit from "wabt";

export type WatExports = Record<string, (...args: number[]) => number>;

/**
 * Infra (hors TDD) : lit un fichier `.wat` voisin, l'assemble en wasm via wabt,
 * l'instancie et renvoie ses exports. Le code de production sous test est le
 * `.wat` lui-même ; ce loader n'est qu'un harnais d'exécution.
 */
export async function loadWatExports(watFileName: string): Promise<WatExports> {
  const wabt = await wabtInit();
  const watSource = readFileSync(join(__dirname, watFileName), "utf8");
  const wasmModule = wabt.parseWat(watFileName, watSource);
  const { buffer } = wasmModule.toBinary({});
  wasmModule.destroy();
  const bytes = new Uint8Array(buffer);
  const { instance } = await WebAssembly.instantiate(bytes);
  return instance.exports as unknown as WatExports;
}
