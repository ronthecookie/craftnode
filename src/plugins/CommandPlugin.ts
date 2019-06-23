import Command from "../Command";
import Player from "../Player";
import Plugin from "../Plugin";
import Server from "../Server";

class CommandPlugin implements Plugin {
    public commands: Command[] = [];
    public server: Server;
    constructor(server: Server) {
        this.server = server;
        this.server.on("started", () => {
            this.server.commands = this.server.plugins
                .map(pl => pl.commands)
                .reduce((a, b): Command[] => [...a, ...b]);
        });

        this.server.on("player", (player: Player) => {
            player.onCertainPacket("chat", (data, meta) => {
                const msg = data.message;
                if (!msg.startsWith("/")) return;
                const cmdName = msg.split(" ")[0].slice(1);
                const cmd = this.server.commands.find(
                    command => command.chatName == cmdName
                );
                if (!cmd)
                    return player.chat([
                        {
                            text: "Unknown command",
                            color: "red"
                        }
                    ]);
                try {
                    // we have to create this execute method
                    cmd.execute(player, msg.split(" ").slice(1));
                } catch (error) {
                    this.server.logger.error(`Error while executing command ${cmdName} for ${player.username}:`, error);
                    player.chat([
                        {
                            text: `Error while executing command: ${error}\nCheck console for the full stack trace`,
                            color: "red"
                        }
                    ]);
                }
            });
            // for some reason the client seems to not care about this
            // client.write('declare_commands', {
            //   nodes: [
            //     {
            //       flags: {command_node_type: 0}, // root
            //       children: [{ flags: {command_node_type: 1/*literal*/}, name: 'helpppp' }]
            //     }
            //   ]
            // });
        });
    }
}

export default CommandPlugin;

class UptimeCommand implements Command {
    private server: Server;
    public chatName = "uptime";
    public internal = true;
    constructor(server: Server) {
        this.server = server;
    }
    execute(player: Player, args: String[]) {}
}
