import { getRoom, kv } from "./_lib/db.ts";
import { jsonResponse, sha256, shuffle } from "./_lib/mod.ts";
import { HandlerContext } from "$fresh/server.ts";

export const handler = async (req: Request, _ctx: HandlerContext): Promise<Response> => {
  const url = new URL(req.url);
  const key = url.searchParams.get("key")!;
  const roomId = url.searchParams.get("room")!;
  const id = await sha256(key);
  if (id !== roomId) {
    return new Response(null, { status: 400 });
  }

  const roomRes = await getRoom(roomId);
  const room = roomRes.value;
  if (room === null) {
    return new Response(null, { status: 404 });
  }
  const { cards, numbers } = room;
  shuffle(cards);
  shuffle(numbers);
  await kv.atomic()
    .check(roomRes)
    .set(roomRes.key, { cards, numbers, count: 0 })
    .commit(); 
  
  return jsonResponse({ ok: true, cards, numbers });
};
