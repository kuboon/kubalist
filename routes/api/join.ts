import { HandlerContext } from "$fresh/server.ts";
import { getRoom, kv } from "./_lib/db.ts";
import { jsonResponse } from "./_lib/mod.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const url = new URL(req.url);
  const roomRes = await getRoom(url.searchParams.get("room")!);
  const room = roomRes.value;
  if (room === null) {
    return new Response(null, { status: 404 });
  }
  if (room.cards.length <= room.count) {
    return new Response(null, { status: 400 });
  }
  const card = room.cards[room.count];
  const number = room.numbers[room.count];
  const count = room.count + 1;

  await kv.atomic()
    .check(roomRes)
    .set(roomRes.key, { ...room, count })
    .commit();

  return jsonResponse({ card, number, count });
};
