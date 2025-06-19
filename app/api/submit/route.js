
import { appendResponse } from '@/utils/local-file';

export async function POST(request) {
  try {
    const body = await request.json();
    await appendResponse(body);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}
