/// <reference lib="deno.unstable" />
export const kv = await Deno.openKv();

export type Room = {
  count: number;
  cards: string[];
  numbers: number[];
  created_at: Date;
};

export const getRoom = async (id: string) => {
  return await kv.get<Room>(["rooms", id]);
}
