import { compileFile } from "https://esm.sh/v128/pug@3.0.2/deno/pug.bundle.mjs";

const page = compileFile("_view/index.pug");
export const handler = (): Response => {
  return new Response(page({ cards: "人狼,狂人,村人" }), {
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
};
