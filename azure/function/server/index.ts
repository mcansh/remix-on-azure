import { installGlobals } from "@remix-run/node";

installGlobals();

import { createRequestHandler } from "./handler";

export default createRequestHandler({ build: require("./build") });
