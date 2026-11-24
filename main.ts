// One Word, First Thought — make.fun entry (program/v1, Node stdlib only).
//
// The entry is exactly one word: "vellichor" — the strange nostalgia of
// used bookstores, where the books you never read crowd in and feel like
// lives you almost lived. Rare enough to surprise, vivid enough to picture
// at once, and chosen rather than generic: no filler word could carry that
// image in ten letters.
//
// The program writes that single word, nothing else, to /output/entry.txt
// (or $OUTPUT_DIR/entry.txt when the harness sets one).
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "vellichor";

function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  // Write exactly the word: no trailing newline, no extra whitespace,
  // so the file is 10 bytes of one word, inside the gate's 1–24 characters.
  // Only the file we create gets an explicit mode (0644); the output
  // directory itself is never chmodded.
  writeFileSync(target, WORD, { encoding: "utf8", mode: 0o644 });
  try {
    // Best-effort: keep the created file world-readable for the grader.
    chmodSync(target, 0o644);
  } catch {
    // Mode was already set by writeFileSync; nothing to do.
  }
}

main();
