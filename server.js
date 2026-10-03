import express from "express";
import { createServer } from "node:http";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import wisp from "wisp-server-node";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");
const publicPath = join(__dirname, "public");

const app = express();

app.use(express.static(publicPath));
app.use("/uv/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/baremux/", express.static(baremuxPath));

app.use((req, res) => {
  res.status(404).send("Not Found");
});

const server = createServer();

server.on("request", (req, res) => {
  // These headers are useful for the modern UV transport setup.
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  app(req, res);
});

server.on("upgrade", (req, socket, head) => {
  if (req.url?.endsWith("/wisp/")) {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.end();
  }
});

const port = Number.parseInt(process.env.PORT || "8080", 10);

server.listen(port, "0.0.0.0", () => {
  console.log(`Ultraviolet proxy running on http://localhost:${port}`);
});
