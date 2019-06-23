import Player from "./Player";

export default interface Command {
    chatName: string;
    internal?: boolean
    // TODO: Implement proper parsing, validation blah blah blah (and implement Autocomplete in CommandPlugin properly)
    // new (server: Server): Command
    //     this.server = server;
    //     this.chatName = chatName;
    // }
    // execute(player: Player, args: String[]) {
    //     throw new Error("Function execute isn't implemented");
    // }
    execute: (player: Player, args: string[]) => void;
}
