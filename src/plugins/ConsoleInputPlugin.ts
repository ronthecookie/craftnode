import Command from "../Command";
import Player from "../Player";
import Plugin from "../Plugin";
import Server from "../Server";
import Readline, { Interface } from 'readline'

class ConsoleInputPlugin implements Plugin {
    public commands: Command[] = [];
    private interface: Interface;
    constructor(server: Server) {

        this.interface = Readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.waitInput()
    }
    public waitInput(): void {
        this.interface.question('', (consoleInput: string) => {
            this.interface.close;
            this.waitInput()
        });
    }
}

export default ConsoleInputPlugin;
