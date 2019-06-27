declare module "prismarine-chunk" {
    /* Declaration file wrriten by ronthecookie <ronthecookie0101@gmail.com>
     * These typings have yet to be extensively tested
     * Some functions are missing because they aren't implemented in the latest (1.13) js
     */
    import { Block } from "prismarine-block";
    import { Vec3 } from "vec3";
    // export default function prismarine_chunk(mcVersion: string): Chunk;
    interface iniFunc {
        (x: number, y: number, z: number): Block;
    }
    export default function prismarine_chunk(version: string): any;

    export class Chunk {
        constructor();
        initalize(iniFunc: iniFunc): Chunk;
        getBlock(pos: Vec3): Block;
        setBlock(pos: Vec3, block: Block): void;
        getBlockType(pos: Vec3): number;
        getBlockStateId(pos: Vec3): number;
        // getBlockData(pos: Vec3): 0
        getBlockLight(pos: Vec3): number;
        getSkyLight(pos: Vec3): number;
        getBiome(pos: Vec3): number;
        // getBiomeColor(pos: Vec3)
        setBlockStateId(pos: Vec3, id: number): void;
        setBlockType(pos: Vec3, id: number): void;
        // setBlockData(pos: Vec3, data)
        setBlockLight(pos: Vec3, light: number): void;
        setSkyLight(pos: Vec3, light: number): void;
        setBiome(pos: Vec3, biome: number): void;
        setBiomeColor(pos: Vec3, biomeColor: string): void;
        dump(): Buffer;
        load(data: Buffer, bitmap: number, skyLightSent: boolean): void;
    }
}
