# Ultraviolet Google-Style Proxy

A small Google-style frontend connected to Ultraviolet 3.x, bare-mux, EpoxyTransport, and a local Wisp server.

## Requirements

- Node.js 18+
- A Chromium-based browser for local testing
- HTTPS when deployed publicly

## Run locally

Open a terminal in this folder:

```bash
npm install
npm start
```

Then open:

```text
http://localhost:8080
```

Enter a URL such as:

```text
https://example.com
```

The frontend registers `/sw.js`, configures bare-mux with the local `/wisp/` endpoint, and sends the target through Ultraviolet's `/service/` route.

## Important

Ultraviolet is now a legacy/superseded project. Its upstream repository recommends Scramjet for newer projects. This package intentionally uses Ultraviolet because that is what this project requested.

For a public deployment, use HTTPS and add appropriate rate limiting, access controls, logging, and abuse protections. Do not operate an unrestricted public proxy without considering those controls.
