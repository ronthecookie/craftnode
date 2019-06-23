import Command from "../Command";
import Player from "../Player";
import Plugin from "../Plugin";
import Server from "../Server";

class JoinLeaveMessagePlugin implements Plugin {
    public commands: Command[] = [];
    private server: Server;
    constructor(server: Server) {
        this.server = server
        server.on("player", player => {
            server.broadcast([{text: `${player.username} has joined the game`, color: "yellow"}]);
            player.on("disconnect", () => {
                server.broadcast([{ text: `${player.username} has left the game`, color: "yellow" }]);
            });
        })
    }
}

export default JoinLeaveMessagePlugin;
