import Plugin from "../Plugin";
import Server from "../Server";
import ChatPlugin from "./ChatPlugin";
import CommandPlugin from "./CommandPlugin";
import DebugPlugin from "./DebugPlugin";
import LoginPlugin from "./LoginPlugin";
import TablistPlugin from "./TablistPlugin";
import JoinLeaveMessagePlugin from "./JoinLeaveMessagePlugin";
import ConsoleInputPlugin from "./ConsoleInputPlugin";


export default function getPlugins(server: Server): Plugin[] {
    return [LoginPlugin, DebugPlugin, CommandPlugin, ChatPlugin, TablistPlugin, JoinLeaveMessagePlugin, ConsoleInputPlugin].map(
        plugin => new plugin(server)
    );
}
