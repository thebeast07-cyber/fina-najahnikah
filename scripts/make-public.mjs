// scripts/make-public.mjs
import { promises as fs } from "fs";
import path from "path";

const root = process.cwd();
const outDir = path.join(root, "public");

// Yang ingin disalin ke public (opsional: assets/css kalau ada)
const items = ["index.html", "dashboard.html", "dist", "assets", "css"];

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  for (const item of items) {
    const src = path.join(root, item);
    if (!(await exists(src))) {
      console.log(`↪︎ skip ${item} (not found)`);
      continue;
    }
    const dest = path.join(outDir, item);
    await fs.cp(src, dest, { recursive: true, force: true }); // Node 16.7+/18+
    console.log(`✓ copied ${item} -> public/${item}`);
  }
  console.log("✅ public ready");
}

main().catch(err => {
  console.error("❌ make-public failed:", err);
  process.exit(1);
});
