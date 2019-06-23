import { Client, PacketMeta } from "minecraft-protocol";
import Server from "./Server";
import { EventEmitter } from "events";
import { chatMessageToPacketField } from "./Util";
export interface Position {
    x: number;
    y: number;
    z: number;
    yaw: number;
    pitch: number;
}

class Player extends EventEmitter {
    // private server: Server;
    public client: Client;
    public pos: Position;
    constructor(client: Client) {
        super();
        this.client = client;
        this.pos = { x: 0, y: 60, z: 0, yaw: 0, pitch: 0 };
    }
    get username() {
        return this.client.username;
    }
    get uuid() {
        return this.client.uuid;
    }
    onCertainPacket(
        packetName: string,
        cb: (data: any, packetMeta: PacketMeta) => void
    ): void {
        this.client.on("packet", (data, meta) => {
            if (meta.name == packetName) cb(data, meta);
        });
    }
    /**
     * Send the client a chat message
     * Read https://wiki.vg/Chat#Shared_between_all_components
     */
    chat(text: string | ChatMessagePart[]) {
        this.client.write("chat", {position: 0, message: chatMessageToPacketField(text)});
    }
    kick(reason: string | ChatMessagePart[]) {
        this.client.write("kick_disconnect", {
            reason: chatMessageToPacketField(reason)
        });
        this.client.socket.destroy();
        this.client.emit("ended");
        this.emit("disconnect");
    }
}
interface IChatMessagePart {
    bold?: boolean;
    italic?: boolean;
    underlined?: boolean;
    strikethrough?: boolean;
    obfuscated?: boolean;
    color?:
        | "black"
        | "dark_blue"
        | "dark_green"
        | "dark_aqua"
        | "dark_red"
        | "dark_purple"
        | "gold"
        | "gray"
        | "dark_gray"
        | "blue"
        | "green"
        | "aqua"
        | "red"
        | "light_purple"
        | "yellow"
        | "white";
}
export type ChatMessagePart = ChatMessageStringPart; // | ChatMessageSomeOtherTypePart
export interface ChatMessageStringPart extends IChatMessagePart {
    text: string;
}
export default Player;
