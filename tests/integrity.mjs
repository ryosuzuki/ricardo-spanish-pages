import fs from "node:fs";
import vm from "node:vm";

const files = ["../data/lessons.js", "../data/match-lessons.js", "../data/glosses.js"];
const context = { window: {} };
vm.createContext(context);
for (const file of files) {
  vm.runInContext(fs.readFileSync(new URL(file, import.meta.url), "utf8"), context);
}

const d = context.window.RICARDO_DATA;
const glosses = context.window.RICARDO_GLOSSES;
const errors = [];
if (d.lessons.length < 70) errors.push("fewer than 70 lessons");
if (d.sources.length < 12) errors.push("fewer than 12 sources");
for (const l of d.lessons) {
  const source = d.sources.find(s => s.id === l.source);
  if (!source) errors.push(`${l.id}: missing source`);
  if (!(l.start >= 0 && l.end > l.start)) errors.push(`${l.id}: invalid time`);
  if (source && l.end > source.duration) errors.push(`${l.id}: time exceeds source duration`);
  if (l.audioClip && !fs.existsSync(new URL(`../${l.audioClip}`, import.meta.url))) errors.push(`${l.id}: missing audio clip`);
  for (const k of ["spanish", "japanese", "literal"]) {
    if (!l[k]) errors.push(`${l.id}: missing ${k}`);
  }
  const tokens = l.spanish.match(/[\p{L}\p{M}]+(?:['’][\p{L}\p{M}]+)*/gu) || [];
  for (const token of tokens) {
    const key = token.toLocaleLowerCase("es");
    if (!glosses[key] || glosses[key] === "要確認") errors.push(`${l.id}: missing gloss for ${token}`);
  }
}
if (new Set(d.lessons.map(l => l.id)).size !== d.lessons.length) errors.push("duplicate lesson ids");
if (new Set(d.sources.map(s => s.id)).size !== d.sources.length) errors.push("duplicate source ids");
if (d.words.some(w => w.count < 1)) errors.push("word count must be positive");
if (d.deleted.length !== 20) errors.push("deleted ledger must contain 20 ids");
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`PASS ${d.lessons.length} lessons, ${Object.keys(glosses).length} token glosses, ${d.words.length} words, ${d.sources.length} sources, ${d.deleted.length} recovery records`);
