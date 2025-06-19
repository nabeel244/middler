
import { promises as fs } from 'fs';
import path from 'path';

export async function appendResponse(data) {
  const filePath = path.join(process.cwd(), 'public', 'data', 'responses.json');
  try {
    // Ensure directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    // Read current file
    let content = [];
    try {
      const raw = await fs.readFile(filePath, 'utf-8');
      content = JSON.parse(raw);
    } catch (_) {
      content = [];
    }
    content.push({ createdAt: new Date().toISOString(), ...data });
    await fs.writeFile(filePath, JSON.stringify(content, null, 2));
  } catch (err) {
    console.error('[appendResponse] error', err);
  }
}
