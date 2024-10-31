import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sitesPath = path.join(__dirname, 'sites');
const sitesFiles = fs.readdirSync(sitesPath);

for (const file of sitesFiles) {
    const filePath = path.join(sitesPath, file);
    const monitor = await import(filePath);
    if ('execute' in monitor.default) {
        monitor.default.execute()
    }
}
