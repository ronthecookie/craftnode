import EventEmitter from "events";
import mc, { Server as MinecraftProtocolServer, ServerOptions as MinecraftProtocolServerOptions } from "minecraft-protocol";
import Command from "./Command";
import { Logger } from "./Logger";
import Player, { ChatMessagePart } from "./Player";
import Plugin from "./Plugin";
import getPlugins from "./plugins";
import { chatMessagePartsToString } from "./Util";

interface ServerOptions extends MinecraftProtocolServerOptions {
    // plugins: Plugin[],
    encryption?: boolean;
}

class Server extends EventEmitter {
    /*
    Events:
        player - when a new player has been added to this.players
    */
    public commands: Command[] = [];
    public players: Player[] = [];
    public plugins: Plugin[];
    public server: MinecraftProtocolServer;
    public options: ServerOptions;
    public logger: Logger;

    constructor(options: ServerOptions) {
        super();
        this.logger = new Logger();
        this.options = options;
        this.server = mc.createServer(options);
        this.players = []; // LoginPlugin manages this.
        // Might want to refactor this to have a difference between internal and external plugins.
        this.plugins = getPlugins(this);
        /**
         * Server finished starting
         * @event Server#started
         */
        this.emit("started");
    }
    broadcast(text: string | ChatMessagePart[]) {
        this.players.forEach(player => player.chat(text));
        if (typeof text == "string") this.logger.info("Chat:", text);
        else this.logger.info("Chat:", chatMessagePartsToString(text));
    }
}

export default Server;