import { $ } from "../../lib/TeachAndDraw.js";
import { LevelLoader } from "./levelLoader.js";
import { Player } from "./player.js";
import { Tiles } from "./tiles.js";

// Level Imports
import { level1 } from "./levels/level1.js";

// Level Assets
const levelAssets = {
    1: "js/TAD_Game/assets/wall.png",
    200: "js/TAD_Game/assets/carpet.png",
};


$.use(update);
$.canvas.width = window.innerWidth;
$.canvas.height = window.innerHeight;

let levelLoader = new LevelLoader(100);
let speed = 10;

// Asset loading
let assets = levelAssets
for (let i = 0; i < Object.keys(assets).length; i++) {
    if (typeof (assets[Object.keys(assets)[i]]) == 'string') {
        let asset = assets[Object.keys(assets)[i]];
        assets[Object.keys(assets)[i]] = $.loadImage(0, 0, asset);
    }
}

let player = new Player($.w / 2, $.h / 2, 50, 50, speed);
let level = new level1(assets);
levelLoader.loadLevel(level, player, 255);



function update() {
    if (levelLoader.currentLevel != level) {
        level = levelLoader.currentLevel;
    }
    levelLoader.draw();

    player.draw();
    player.move(levelLoader.tileBuilder);

    level.stage(level, levelLoader, player);

    // $.debug = true;
}

