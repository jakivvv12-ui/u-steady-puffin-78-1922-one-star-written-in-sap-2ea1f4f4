// One Star, Written in Sap — a one-line 1-star review from a houseplant
// about the human who owns it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "One star: he repotted me into a coffee mug, waters me with cold tea, and still expects me to thrive.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
if (LINE.length < 1 || LINE.length > 279) {
  throw new Error(`entry must be 1-279 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Round-trip verification: what we wrote is byte-for-byte what is on disk.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("round-trip verification failed: entry.txt mismatch");
}
console.log(`wrote ${outPath} (${LINE.length} chars)`);
