// Next 16 static export writes route-segment prefetch files as `__next.<segment>/__PAGE__.txt`,
// but the client router requests `__next.<segment>.__PAGE__.txt`. Static hosts then return 404 and
// prefetching silently falls back. This copies each nested file to the dotted name the client expects.
import { copyFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

let copied = 0;

function flatten(dir, prefix, target) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) flatten(path, `${prefix}.${name}`, target);
    else {
      copyFileSync(path, join(target, `${prefix}.${name}`));
      copied++;
    }
  }
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (!statSync(path).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(path, name, dir);
    else walk(path);
  }
}

walk("out");
console.log(`flatten-segments: ${copied} prefetch files aliased`);
