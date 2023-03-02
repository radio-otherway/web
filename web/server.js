const https = require("https");
const fs = require("fs");

const next = require("next");
const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const hostname = "otherway.dev.fergl.ie";
const app = next({ dev, hostname, port, dir: __dirname });
const handle = app.getRequestHandler();

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/dev.fergl.ie/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/dev.fergl.ie/fullchain.pem"),
};

app.prepare().then(() => {
  https
    .createServer(options, (req, res) => handle(req, res))
    .listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port}`);
    });
});
