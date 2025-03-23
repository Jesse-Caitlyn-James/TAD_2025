import { $ } from "../../lib/TeachAndDraw.js";
import { LevelLoader } from "./levelLoader.js";
import { Player } from "./player.js";
import { Tiles } from "./tiles.js";

const level1 = [
    "1 1 1 1 1 1 1 1 1 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 255 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 100 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 1 1 1 1 1 1 1 1 1",
]

const level2 = [
    "1 1 1 1 1 1 1 1 1 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 100 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 200 255 200 200 200 200 200 200 1",
    "1 200 200 200 200 200 200 200 200 1",
    "1 1 1 1 1 1 1 1 1 1",
]

$.use(update);

let levelLoader = new LevelLoader(100);
let speed = 10;
let player = new Player($.w / 2, $.h / 2, 50, 100, speed);
let spawnLocation = 255;
let tiles = levelLoader.loadLevel(level1, player, spawnLocation);

function update() {
    levelLoader.draw();

    player.draw();
    player.move(levelLoader.tileBuilder);

    for (let i = 0; i < levelLoader.tileBuilder.tileGroup.length; i++){
        let tile = levelLoader.tileBuilder.tileGroup[i];
        if (player.player.overlaps(tile) && tile.blockID == 100){
            let tiles = levelLoader.loadLevel(level2, player, spawnLocation);

        }
    }
}

