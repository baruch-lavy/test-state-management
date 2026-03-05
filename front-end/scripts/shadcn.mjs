import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: npm run ui:shadcn -- <init|add> [...args]");
  process.exit(1);
}

const certPath = join(homedir(), ".certs", "windows-root-cas.pem");
const env = { ...process.env };

if (existsSync(certPath)) {
  env.NODE_EXTRA_CA_CERTS = certPath;
}

const child = spawn("npx", ["shadcn@latest", ...args], {
  stdio: "inherit",
  shell: process.platform === "win32",
  env,
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
