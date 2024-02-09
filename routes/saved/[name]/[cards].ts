import { compileFile } from "https://esm.sh/v128/pug@3.0.2/deno/pug.bundle.mjs";
import { FreshContext } from "$fresh/server.ts";

const page = compileFile("_view/index.pug");
export const handler = (_req: Request, ctx: FreshContext): Response => {
  const { name, cards } = ctx.params;
  return new Response(page({ name, cards }), {
    headers: { "content-type": "text/html; charset=UTF-8" },
  })
};
