import Command from "../Command";
import Player from "../Player";
import Plugin from "../Plugin";
import Server from "../Server";

class TablistPlugin implements Plugin {
    public commands: Command[] = [];
    constructor(server: Server) {
        server.on("player", (player: Player) => {
            const client = player.client;
            client.write("player_info", {
                action: 0,
                data: Object.values(server.server.clients).map(client => {
                    return {
                        UUID: client.uuid,
                        name: client.username,
                        properties: client.profile.properties || [],
                        gamemode: 1,
                        ping: client.latency
                    };
                })
            });
            [
                ...Object.entries(server.server.clients).map(client => {
                    return client[1];
                }),
                client
            ].forEach(iClient => {
                if (iClient.uuid == client.uuid) return;
                iClient.write("player_info", {
                    action: 0,
                    data: [
                        {
                            UUID: player.uuid,
                            name: player.username,
                            properties: client.profile.properties,
                            gamemode: 1,
                            ping: client.latency
                        }
                    ]
                });
            });
            player.once("disconnect", () => {
                console.log(player.username,"Disconnect")
                server.players.forEach(p => {
                    p.client.write("player_info", {
                        action: 4,
                        data: [{ UUID: player.uuid }]
                    });
                });
            });
        });
    }
}

export default TablistPlugin;
