import { toHashString } from "https://deno.land/std@0.188.0/crypto/to_hash_string.ts";

export function shuffle(array: unknown[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const encoder = new TextEncoder();
export async function sha256(input: string): Promise<string> {
  const data = encoder.encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return toHashString(digest);
}

export function jsonResponse(data: unknown) {
  return new Response(JSON.stringify(data), {
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-headers":
        "origin,x-requested-with,content-type,accept",
      "content-type": "application/json; charset=UTF-8",
    },
  });
}
