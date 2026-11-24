// Warning Label for Humans: One Line, Big Laugh
// Writes a single-line safety warning label for human beings to /output/entry.txt.
// Node 22 stdlib only. Gate: 1-160 UTF-8 characters, non-blank, single line.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "WARNING: This human may nod, smile, and agree with you while understanding absolutely nothing you just said.";

const MAX_CHARS = 160;

// Guard: the gate requires 1-160 characters, not only whitespace, one line.
if (LINE.length < 1 || LINE.length > MAX_CHARS) {
  throw new Error(`entry length ${LINE.length} outside 1-${MAX_CHARS} characters`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is blank");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
const words = LINE.trim().split(/\s+/);
if (words.length < 5) {
  throw new Error(`entry has only ${words.length} words, expected at least 5`);
}
// Pin the exact authored length so any accidental edit to the line fails loudly.
const EXPECTED_CHARS = 108;
if (LINE.length !== EXPECTED_CHARS) {
  throw new Error(`entry length ${LINE.length}, expected exactly ${EXPECTED_CHARS}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(`wrote ${LINE.length} chars, ${words.length} words to /output/entry.txt`);
