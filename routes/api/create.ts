import { jsonResponse, sha256, shuffle } from "./_lib/mod.ts";
import { kv } from "./_lib/db.ts";
import { FreshContext } from "$fresh/server.ts";
import { v1 } from "$std/uuid/mod.ts";

export const handler = async (
  req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  const url = new URL(req.url);
  const cards = url.searchParams.get('cards')!.split(",");
  shuffle(cards);
  const numbers = Array(cards.length)
    .fill(null)
    .map((_, i) => i + 1);
  shuffle(numbers);
  const key = v1.generate() as string;
  const id = await sha256(key);
  const expireIn = 7 * 24 * 60 * 60 * 1000;
  await kv.set(["rooms", id], {
    count: 0,
    cards,
    numbers,
    created_at: new Date(),
  }, { expireIn });
  return jsonResponse({ key, id, cards, numbers });
};
