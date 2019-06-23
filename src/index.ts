import Server from "./Server";

const server = new Server({
    "online-mode": true,
    encryption: true,
    host: "0.0.0.0",
    port: 25565,
    maxPlayers: 10
});

