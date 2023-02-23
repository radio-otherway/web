import pino from 'pino'
import {logflarePinoVercel} from 'pino-logflare'

const {stream, send} = logflarePinoVercel({
  apiKey: "MK3qgU_-pwHQ",
  sourceToken: "f7d8c11d-8f36-4981-8168-bfd69aa72bbf"
});

// create pino logger
const logger = pino({
  browser: {
    transmit: {
      level: "info",
      send: send,
    }
  },
  level: "debug",
  base: {
    env: process.env.NODE_ENV,
    revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
  },
}, stream);

export default logger
