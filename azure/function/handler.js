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
  let headers = new Headers();

  for (let [key, value] of Object.entries(requestHeaders)) {
    if (!value) continue;
    headers.set(key, value);
  }

  return headers;
}

function createRemixRequest(req) {
  let url;
  if (process.env.NODE_ENV === "production") {
    url = new URL(req.headers["x-ms-original-url"]);
  } else {
    url = new URL(req.url);
    url.host = req.headers["host"];
    url.pathname = url.pathname.replace("/api/azure", "");
  }

  let init = {
    method: req.method || "GET",
    headers: createRemixHeaders(req.headers),
  };

  if (req.body && req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new Request(url.toString(), init);
}

module.exports = { createRequestHandler };
