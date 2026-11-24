// Ship It Friday — one commit message, written moments before breaking prod.
const { mkdirSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");

const line =
  "feat: ship it Friday 4:59pm \u2014 tests pass on my machine, prod is just a vibe, see you Monday (maybe)";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
process.stdout.write(line + "\n");
