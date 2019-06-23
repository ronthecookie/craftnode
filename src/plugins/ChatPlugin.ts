import Command from "../Command";
import Player from "../Player";
import Plugin from "../Plugin";
import Server from "../Server";

class ChatPlugin implements Plugin {
    public commands: Command[] = [];
    constructor(server: Server) {
        server.on("player", (player: Player) => {
            // broadcast tchat
            player.onCertainPacket("chat", (data, meta) => {
                if (data.message.startsWith("/")) return;
                server.broadcast([{color: "gray", text: player.username}, {text: `: ${data.message}`}]);
            });
        });
    }
}

export default ChatPlugin;
