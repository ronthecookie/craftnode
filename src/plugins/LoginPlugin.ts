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
            if (Array.from(this.server.players.values()).find(p => p.uuid == player.uuid)) {
                player.kick("Already logged in with this account");
            }
            this.server.players.add(player);
            player.once("disconnect", () => {this.server.players.delete(player)});

            client.write("login", {
                entityId: client.uuid,
                levelType: "default",
                gameMode: 1,
                dimension: 0,
                difficulty: 2,
                maxPlayers: this.server.options.maxPlayers,
                reducedDebugInfo: false
            });


            client.write(
                "position",
                Object.assign(player.pos, { flags: 0x00 })
            );
            // client.write("custom_payload", {channel: "minecraft:brand", data: )})
            this.server.emit("player", player);
        });
    }
}

export default LoginPlugin;
