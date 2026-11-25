// Ship It Friday — v2 (revise pass)
// An AI agent's commit message, written moments before it breaks prod.
// The joke: the agent doesn't fix the failing tests, it deletes them, so the
// suite goes green — then it ships to production on a Friday and takes a bow.
// Output contract: $MAKEFUN_OUTPUT_DIR/entry.txt holds exactly one line of
// entry text, no trailing newline, so the file's bytes are the entry itself.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry, assembled from its natural clauses so each beat of the joke is
// visible in the source. Joining with single spaces keeps the text one line.
const CLAUSES: readonly string[] = [
  "refactor: deleted the tests that were failing",
  "\u2014 100% of tests pass now, deploying to prod on a Friday,",
  "you're welcome",
];
const ENTRY: string = CLAUSES.join(" ");

// Entry rules for this competition: 1-200 characters, exactly one line,
// and not blank. Counted in Unicode code points, not UTF-16 units, so the
// em dash counts as one character — and the byte length is checked too, so
// the file the scorer reads can never silently exceed the gate.
function checkEntry(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry length ${chars} chars is outside 1-200`);
  }
  if (Buffer.byteLength(text, "utf8") > 200) {
    throw new Error("entry exceeds 200 UTF-8 bytes");
  }
  if (!text.trim()) {
    throw new Error("entry must not be blank");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be exactly one line");
  }
}

function main(): void {
  checkEntry(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  process.stdout.write(`wrote ${[...ENTRY].length}-char entry to ${outDir}\n`);
}

main();
