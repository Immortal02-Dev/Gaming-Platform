import net from "net";

const ports = [3306, 3307, 3308, 8889, 33060];
const host = "127.0.0.1";

async function probe() {
  for (const port of ports) {
    try {
      await new Promise((resolve, reject) => {
        const socket = new net.Socket();
        socket.setTimeout(500);
        socket.on("connect", () => {
          console.log(`Port ${port} is OPEN`);
          socket.destroy();
          resolve(true);
        });
        socket.on("timeout", () => {
          socket.destroy();
          reject();
        });
        socket.on("error", () => {
          reject();
        });
        socket.connect(port, host);
      });
    } catch (e) {
      // console.log(`Port ${port} is closed`);
    }
  }
}

probe();
