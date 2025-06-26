import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "app", "data", "responses.json");
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const list = JSON.parse(raw || "[]");
    const last = list[list.length - 1] || {};
    return new Response(JSON.stringify(last), { status: 200 });
  } catch (err) {
    console.error("latest API error:", err);
    return new Response(JSON.stringify({ error: "Cannot read responses.json" }), { status: 500 });
  }
}
