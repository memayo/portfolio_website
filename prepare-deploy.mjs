import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const output = path.join(root, 'deploy-ready');
const excludedAssets = new Set([
  path.normalize('image/Group 13.png'),
  path.normalize('image/Group 15.png'),
]);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

await cp(path.join(root, '_ds'), path.join(output, '_ds'), { recursive: true });
await cp(path.join(root, 'assets'), path.join(output, 'assets'), {
  recursive: true,
  filter(source) {
    const relative = path.relative(path.join(root, 'assets'), source);
    return !excludedAssets.has(path.normalize(relative));
  },
});

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (!entry.isFile() || !/\.(?:js|css)$/.test(entry.name)) continue;
  await cp(path.join(root, entry.name), path.join(output, entry.name));
}

const html = await readFile(path.join(root, 'PortfolioSite.dc.html'), 'utf8');
await writeFile(path.join(output, 'index.html'), html);

console.log(`Deploy package created at ${output}`);
