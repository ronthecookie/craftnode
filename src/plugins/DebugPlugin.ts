import util from "util";
import Command from "../Command";
import Player from "../Player";
import Plugin from "../Plugin";
import Server from "../Server";

class EvalCommand implements Command {
    private server: Server;
    public internal = true;
    public chatName = "eval";
    constructor(server: Server) {
        this.server = server;
    }
    execute(player: Player, args: String[]) {
        player.chat(
            `eval depth=1: ${util.inspect(eval(args.join(" ")), false, 1)}`
        );
    }
}
class DebugPlugin implements Plugin {
    public commands: Command[];
    private server: Server;
    constructor(server: Server) {
        this.server = server;
        this.commands = [new EvalCommand(server)]; // maybe ?

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
