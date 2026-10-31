// Builds the static site for GitHub Pages and force-pushes /out to the gh-pages branch.
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const repo = "epilab";
const owner = "sosqska";
const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });

const remote = execSync("git remote get-url origin").toString().trim();
run("npx next build", {
  env: {
    ...process.env,
    NEXT_PUBLIC_BASE_PATH: `/${repo}`,
    NEXT_PUBLIC_SITE_URL: `https://${owner}.github.io/${repo}`,
  },
});

// Without this file GitHub's Jekyll step drops the _next/ folder.
writeFileSync("out/.nojekyll", "");
run("git init -q -b gh-pages", { cwd: "out" });
run("git add -A", { cwd: "out" });
run('git commit -q -m "Deploy"', { cwd: "out" });
run(`git push -f -q ${remote} gh-pages`, { cwd: "out" });
console.log(`\nDeployed: https://${owner}.github.io/${repo}/`);
