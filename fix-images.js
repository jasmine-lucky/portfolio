// Post-build fix: add GitHub Pages basePath to ALL asset references
// Only needed for GitHub Pages deployment (Netlify doesn't need this)
const fs = require("fs");
const path = require("path");

const basePath = "/portfolio";
const outDir = path.join(__dirname, "out");

let fixedCount = 0;

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf8");
  const before = content;

  // Fix _next/static paths (JS, CSS)
  content = content.replace(/["']\/_next\//g, `"${basePath}/_next/`);

  // Fix public/ asset paths (images, videos)
  content = content.replace(/["']\/images\//g, `"${basePath}/images/`);
  content = content.replace(/["']\/videos\//g, `"${basePath}/videos/`);

  if (content !== before) {
    fs.writeFileSync(filePath, content);
    fixedCount++;
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(html|js|css)$/.test(entry.name)) fixFile(full);
  }
}

walk(outDir);
console.log(`✅ 已修复 ${fixedCount} 个文件的路径（${basePath} 前缀）`);
