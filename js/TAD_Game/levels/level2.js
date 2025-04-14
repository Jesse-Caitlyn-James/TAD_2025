import { level1 } from "./level1.js";
import { level3 } from "./level3.js";
import { level5 } from "./level5.js";

export class level2 {
    constructor(assets) {
        this.levelPlan = levelPlan;
        this.assets = assets;
    }

    stage(level, levelLoader, player) {
        for (let i = 0; i < levelLoader.tileBuilder.tileGroup.length; i++) {
            let tile = levelLoader.tileBuilder.tileGroup[i];
            if (player.player.overlaps(tile)) {
                if (tile.blockID == 100) {
                    level = new level1(this.assets);
                    levelLoader.loadLevel(level, player, 255);
                }
                if (tile.blockID == 101) {
                    level = new level3(this.assets);
                    levelLoader.loadLevel(level, player, 255);
                }
                if (tile.blockID == 102) {
                    level = new level5(this.assets);
                    levelLoader.loadLevel(level, player, 255);
                }
            }

            // Asset loading
            if (tile.blockID == 200) {
                tile.asset = this.assets[200];
            }
            if (tile.blockID == 1) {
                tile.asset = this.assets[1];
            }
        }
    }
}

const levelPlan = [
    "1 1 1 1 1 1 1 1 101 1",
    "1 200 200 200 200 200 200 200 254 102",
    "100 255 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 1 1 1 1 1 1 1 1 1",
]