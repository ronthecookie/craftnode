import Command from "../Command";
import Player from "../Player";
import Plugin from "../Plugin";
import Server from "../Server";

class WorldPlugin implements Plugin {
    public commands: Command[] = [];
    private server: Server;
    constructor(server: Server) {
        this.server = server;
        server.on("player", async (player: Player) => {
            const chunk = await this.server.world.getColumn(0, 0);
            const heightmapsVal = [];
            for (let i = 0; i < 256; i++) heightmapsVal.push(200);
            console.log(heightmapsVal.length)
            player.client.write("map_chunk", {
                x: 0,
                z: 0,
                groundUp: true,
                bitMap: 0xffff,
                chunkData: chunk.dump(),
                blockEntities: [],
                heightmaps: { type: "compound", value: { MOTION_BLOCKING: { type: "intArray", value: heightmapsVal}}}
            });
        });
    }
}

export default WorldPlugin;
