const {
  Headers,
  Request,
  createRequestHandler: createRemixRequestHandler,
} = require("@remix-run/node");

function createRequestHandler({
  build,
  getLoadContext,
  mode = process.env.NODE_ENV,
}) {
  let handleRequest = createRemixRequestHandler(build, mode);

  return async (context, req) => {
    let request = createRemixRequest(req);
    let loadContext = getLoadContext ? getLoadContext(req) : undefined;

    let response = await handleRequest(request, loadContext);

    return {
      status: response.status,
      headers: response.headers.raw(),
      body: await response.text(),
    };
  };
}

function createRemixHeaders(requestHeaders) {
  let headers = new Headers();

  for (let [key, value] of Object.entries(requestHeaders)) {
    if (!value) continue;
    headers.set(key, value);
  }

  return headers;
}

function createRemixRequest(req) {
  let url = req.headers["x-ms-original-url"];
  // let url = "http://localhost:7071";

  let init = {
    method: req.method || "GET",
    headers: createRemixHeaders(req.headers),
  };

  if (req.body && req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new Request(url, init);
}

module.exports = { createRequestHandler };
