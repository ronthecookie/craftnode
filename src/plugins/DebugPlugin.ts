import util from "util";
import Command from "../Command";
import Player from "../Player";
import Plugin from "../Plugin";
import Server from "../Server";
import { PacketMeta } from "minecraft-protocol";

class EvalCommand implements Command {
    private server: Server;
    public internal = true;
    public chatName = "eval";
    constructor(server: Server) {
        this.server = server;
    }
    execute(player: Player, args: String[]) {
        if (player.username !== "RONTheCookie") return player.chat([{text: "No permission", color: "red"}])
        player.chat(
            `eval depth=1: ${util.inspect(eval(args.join(" ")), false, 1)}`
        );
    }
}
class PrintPacketsCommand implements Command {
    private server: Server;
    private players: Set<Player>
    public internal = true;
    public chatName = "printpackets";
    constructor(server: Server) {
        this.players = new Set();
        this.server = server;
    }
    execute(player: Player, args: String[]) {
        const self = this;
        // function logCallbackFactory(player: Player) {
        function logCallback(data: object, meta: PacketMeta) {
            self.server.logger.debug(`${player.username} -> server`, data, meta.name);
        }
        // }

        if (this.players.has(player)) {
            this.players.delete(player);
            player.client.removeListener("packet", logCallback);
            player.chat([{color: "gray", text: "Debug: "}, {color: "red", text: "OFF"}]);
        } else {
            this.players.add(player);
            player.client.on("packet", logCallback);
            player.chat([{ color: "gray", text: "Debug: " }, { color: "green", text: "ON" }]);
        }
    }
}
class DebugPlugin implements Plugin {
    public commands: Command[];
    private server: Server;
    constructor(server: Server) {
        this.server = server;
        this.commands = [new EvalCommand(server), new PrintPacketsCommand(server)]; // maybe ?

        // this.server.on('player', player => {
        // const client = player.client;
        // client.on('packet', console.log);
        //   client.write('chat', {
        //     message: JSON.stringify({
        //       text: `Client, depth=0: ${util.inspect(client, false, 0)}}`
        //     }),
        //     position: 0
        //   });
        // });
    }
}

export default DebugPlugin;
