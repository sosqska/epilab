// Builds the static site for GitHub Pages and force-pushes /out to the gh-pages branch.
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const repo = "epilab";
const owner = "sosqska";
// Own domain. Set to "" to go back to https://sosqska.github.io/epilab/
const domain = "epilab-kielce.pl";
const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });

const remote = execSync("git remote get-url origin").toString().trim();
const siteUrl = domain ? `https://${domain}` : `https://${owner}.github.io/${repo}`;
run("npm run build", {
  env: {
    ...process.env,
    // On its own domain the site lives at the root, so no sub-path.
    NEXT_PUBLIC_BASE_PATH: domain ? "" : `/${repo}`,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
});

// Without this file GitHub's Jekyll step drops the _next/ folder.
writeFileSync("out/.nojekyll", "");
// The branch is force-pushed every time, so the domain file must be recreated on each deploy.
if (domain) writeFileSync("out/CNAME", `${domain}\n`);
run("git init -q -b gh-pages", { cwd: "out" });
run("git add -A", { cwd: "out" });
run('git commit -q -m "Deploy"', { cwd: "out" });
run(`git push -f -q ${remote} gh-pages`, { cwd: "out" });
console.log(`\nDeployed: ${siteUrl}/`);
