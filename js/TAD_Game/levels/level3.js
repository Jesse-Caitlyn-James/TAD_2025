import { level2 } from "./level2.js";
import { level4 } from "./level4.js";

export class level3 {
    constructor(assets) {
        this.levelPlan = levelPlan;
        this.assets = assets;
    }

    stage(level, levelLoader, player) {
        for (let i = 0; i < levelLoader.tileBuilder.tileGroup.length; i++) {
            let tile = levelLoader.tileBuilder.tileGroup[i];
            if (player.player.overlaps(tile)) {
                if (tile.blockID == 100) {
                    level = new level2(this.assets);
                    levelLoader.loadLevel(level, player, 254);
                }
                if (tile.blockID == 101) {
                    level = new level4(this.assets);
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
    "1 1 1 1 1 1 1 1 1 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 255 101",
    "1 1 1 1 1 1 1 1 100 1",
]