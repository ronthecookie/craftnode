import mkWorld from "prismarine-world";
import mkChunk from "prismarine-chunk";
import { Vec3 } from "vec3";
import { join } from "path";
import fs from "fs";
function createDirIfDoesntExist(name: string): void {
    if (!fs.existsSync(name)) fs.mkdirSync(name);
}
const World = mkWorld("1.13.2");
const Chunk = mkChunk("1.13.2");
createDirIfDoesntExist("world");
export function getVoidWorld() {
    return new World((x: number, z: number) => {
        const chunk = new Chunk();
        for (let x = 0; x < 16; x++) {
            for (let z = 0; z < 16; z++) {
                chunk.setBlockType(new Vec3(x, 50, z), 2);
                for (let y = 0; y < 256; y++) {
                    chunk.setSkyLight(new Vec3(x, y, z), 15);
                }
            }
        }
        return chunk;
    }, join(process.cwd(), "world"))
}
