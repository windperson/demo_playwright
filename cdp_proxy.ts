import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import type { Socket } from 'node:net';
import { createProxyServer } from 'http-proxy';

const TARGET_URL = 'http://127.0.0.1:9222';
const LISTEN_PORT = 9223;

const proxy = createProxyServer({
  target: TARGET_URL,
  ws: true,
});

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  proxy.web(req, res);
});

const sockets = new Set<Socket>();
let isShuttingDown = false;

server.on('connection', (socket: Socket) => {
  sockets.add(socket);
  socket.on('close', () => sockets.delete(socket));
});

server.on('upgrade', (req: IncomingMessage, socket: Socket, head: Buffer) => {
  proxy.ws(req, socket, head);
});

server.listen(LISTEN_PORT, '0.0.0.0', () => {
  console.log(`CDP Proxy listening on all interfaces at port ${LISTEN_PORT}`);
});

function shutdown(signal: NodeJS.Signals): void {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  console.log(`Received ${signal}; shutting down CDP proxy...`);
  server.close(() => process.exit(0));
  sockets.forEach((socket) => socket.destroy());
  proxy.close();
}

process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));
