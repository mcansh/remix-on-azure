import {
  AzureFunction,
  Context,
  HttpRequest,
  HttpRequestHeaders
} from "@azure/functions";
import {
  Headers,
  Request,
  createRequestHandler as createRemixRequestHandler
} from "@remix-run/node";

export function createRequestHandler({
  build,
  getLoadContext,
  mode = process.env.NODE_ENV
}: {
  build: ServerBuild;
  getLoadContext?: GetLoadContextFunction;
  mode?: string;
}): AzureFunction {
  let handleRequest = createRemixRequestHandler(build, mode);

  return async (context: Context, req: HttpRequest) => {
    let request = createRemixRequest(req);
    let loadContext = getLoadContext ? getLoadContext(req) : undefined;

    let response = await handleRequest(request, loadContext);

    context.res = {
      status: response.status,
      headers: createRemixHeaders(req.headers),
      body: await response.text()
    };
  };
}

function createRemixHeaders(requestHeaders: HttpRequestHeaders) {
  let headers = new Headers();

  for (let [key, value] of Object.entries(requestHeaders)) {
    if (!value) break;
    headers.set(key, value);
  }

  return headers;
}

function createRemixRequest(req: HttpRequest) {
  let url = req.headers["x-ms-original-url"]!;

  let init: RequestInit = {
    // TODO: why is this optional?
    method: req.method || "GET",
    headers: createRemixHeaders(req.headers)
  };

  if (req.body && req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new Request(url, init);
}

module.exports = {createRequestHandler}
