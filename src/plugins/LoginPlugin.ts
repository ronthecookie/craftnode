import { Client } from "minecraft-protocol";
import Command from "../Command";
import Player from "../Player";
import Plugin from "../Plugin";
import Server from "../Server";

class LoginPlugin implements Plugin {
    public server: Server;
    public commands: Command[] = [];
    constructor(server: Server) {
        this.server = server;
        this.server.server.on("login", (client: Client) => {
            // console.log('someone logged in');
            const player = new Player(client);
            this.server.players.push(player);

            client.write("login", {
                entityId: client.uuid,
                levelType: "default",
                gameMode: 1,
                dimension: 0,
                difficulty: 2,
                maxPlayers: this.server.options.maxPlayers,
                reducedDebugInfo: false
            });
            client.write("player_info", {
                action: 0,
                data: Object.values(this.server.server.clients).map(client => {
                    return {
                        UUID: client.uuid,
                        name: client.profile.name,
                        properties: client.profile.properties,
                        gamemode: 1,
                        ping: client.latency
                    };
                })
            });
            [
                ...Object.entries(this.server.server.clients).map(client => {
                    return client[1];
                }),
                client
            ].forEach(iClient => {
                if (iClient.uuid == client.uuid) return;
                iClient.write("player_info", {
                    action: 0,
                    data: [
                        {
                            UUID: client.uuid,
                            name: client.profile.name,
                            properties: client.profile.properties,
                            gamemode: 1,
                            ping: client.latency
                        }
                    ]
                });
            });

            client.write(
                "position",
                Object.assign(player.pos, { flags: 0x00 })
            );

            this.server.emit("player", player);
        });
    }
}

export default LoginPlugin;
