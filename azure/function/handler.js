const {
  createRequestHandler: createRemixRequestHandler,
} = require("@remix-run/server-runtime");

const {
  formatServerError,
  Headers: NodeHeaders,
  Request: NodeRequest,
  Response: NodeResponse,
  RequestInit: NodeRequestInit,
} = require("@remix-run/node");

function createRequestHandler({
  build,
  getLoadContext,
  mode = process.env.NODE_ENV,
}) {
  let platform = { formatServerError };
  let handleRequest = createRemixRequestHandler(build, platform, mode);

  return async (_context, req) => {
    let request = createRemixRequest(req);
    let loadContext =
      typeof getLoadContext === "function" ? getLoadContext(req) : undefined;

    let response = await handleRequest(request, loadContext);

    return {
      status: response.status,
      headers: response.headers.raw(),
      body: await response.text(),
    };
  };
}

function createRemixHeaders(requestHeaders) {
  let headers = new NodeHeaders();

  for (let [key, value] of Object.entries(requestHeaders)) {
    if (!value) continue;
    headers.set(key, value);
  }

  return headers;
}

function createRemixRequest(req) {
  let url = req.headers["x-ms-original-url"];

  let init = {
    method: req.method || "GET",
    headers: createRemixHeaders(req.headers),
  };

  if (req.body && req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new NodeRequest(url, init);
}

module.exports = { createRequestHandler };
