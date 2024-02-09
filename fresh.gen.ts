// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_lib_db from "./routes/api/_lib/db.ts";
import * as $api_lib_mod from "./routes/api/_lib/mod.ts";
import * as $api_create from "./routes/api/create.ts";
import * as $api_join from "./routes/api/join.ts";
import * as $api_reset from "./routes/api/reset.ts";
import * as $bestact from "./routes/bestact.ts";
import * as $index from "./routes/index.ts";
import * as $saved_name_cards_ from "./routes/saved/[name]/[cards].ts";

import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/_lib/db.ts": $api_lib_db,
    "./routes/api/_lib/mod.ts": $api_lib_mod,
    "./routes/api/create.ts": $api_create,
    "./routes/api/join.ts": $api_join,
    "./routes/api/reset.ts": $api_reset,
    "./routes/bestact.ts": $bestact,
    "./routes/index.ts": $index,
    "./routes/saved/[name]/[cards].ts": $saved_name_cards_,
  },
  islands: {},
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
