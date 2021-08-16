const { installGlobals } = require("@remix-run/node");
const { createRequestHandler } = require("./handler");

installGlobals();

module.exports = createRequestHandler({ build: require("./build") });
