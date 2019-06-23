import Plugin from "../Plugin";
import Server from "../Server";
import ChatPlugin from "./ChatPlugin";
import CommandPlugin from "./CommandPlugin";
import DebugPlugin from "./DebugPlugin";
import LoginPlugin from "./LoginPlugin";


export default function getPlugins(server: Server): Plugin[] {
    return [LoginPlugin, DebugPlugin, CommandPlugin, ChatPlugin].map(
        plugin => new plugin(server)
    );
}
