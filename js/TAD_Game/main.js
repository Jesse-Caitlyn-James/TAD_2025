import { $ } from "../../lib/TeachAndDraw.js";
import { Player } from "./player.js";
import { Tiles } from "./tiles.js";
import { CombatHandler } from "./combatHandler.js";

const pattern = [
    "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
    "1 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 1 1 1 1 1 1 1 1 1 1 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 1",
    "1 50 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 50 1 1 1 1 1 1 1 1 1 1 50 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 50 1",
    "1 50 100 150 150 150 150 150 150 150 150 150 150 150 150 150 150 150 100 50 1 1 1 1 1 1 1 1 1 1 50 100 150 150 150 150 150 150 150 150 150 150 150 150 150 150 150 100 50 1",
    "1 50 100 150 200 200 200 200 200 200 200 200 200 200 200 200 200 150 100 50 1 1 1 1 1 1 1 1 1 1 50 100 150 200 200 200 200 200 200 200 200 200 200 200 200 200 150 100 50 1",
    "1 50 100 150 200 200 200 200 200 200 200 200 200 200 200 200 200 150 100 50 1 1 1 1 1 1 1 1 1 1 50 100 150 200 200 200 200 200 200 200 200 200 200 200 200 200 150 100 50 1",
    "1 50 100 150 200 200 200 200 200 200 200 200 200 200 200 200 200 150 100 50 50 50 50 50 50 50 50 50 50 50 50 100 150 200 200 200 200 200 200 200 200 200 200 200 200 200 150 100 50 1",
    "1 50 100 150 200 200 200 200 200 200 200 200 200 200 200 200 200 150 100 100 100 100 100 100 100 100 100 100 100 100 100 150 200 200 200 200 200 200 200 200 200 200 200 200 200 200 150 100 50 1",
    "1 50 100 150 200 200 200 200 200 200 200 200 200 200 200 200 200 150 150 150 150 150 150 150 150 150 150 150 150 150 150 150 201 200 200 200 200 200 200 200 200 200 200 200 200 200 150 100 50 1",
    "1 50 100 150 200 200 200 200 200 200 200 200 200 200 200 200 200 150 100 100 100 100 100 100 100 100 100 100 100 100 100 150 200 200 200 200 200 200 200 200 200 200 200 200 200 200 150 100 50 1",
    "1 50 100 150 200 200 200 200 200 200 200 200 200 200 200 200 200 150 100 50 50 50 50 50 50 50 50 50 50 50 50 100 150 200 200 200 200 200 200 200 200 200 200 200 200 200 150 100 50 1",
    "1 50 100 150 200 200 200 200 200 200 200 200 200 200 200 200 200 150 100 50 1 1 1 1 1 1 1 1 1 1 50 100 150 200 200 200 200 200 200 200 200 200 200 200 200 200 150 100 50 1",
    "1 50 100 150 200 200 200 200 200 200 200 200 200 200 200 200 200 150 100 50 1 1 1 1 1 1 1 1 1 1 50 100 150 200 200 200 200 200 200 200 200 200 200 200 200 200 150 100 50 1",
    "1 50 100 150 150 150 150 150 150 150 150 150 150 150 150 150 150 150 100 50 1 1 1 1 1 1 1 1 1 1 50 100 150 150 150 150 150 150 150 150 150 150 150 150 150 150 150 100 50 1",
    "1 50 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 50 1 1 1 1 1 1 1 1 1 1 50 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 50 1",
    "1 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 1 1 1 1 1 1 1 1 1 1 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 50 1",
    "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1"

]

let speed = 50;

$.use(update);

let player = new Player($.w / 2, $.h / 2, 50, 100, 10);
let tiles = new Tiles(100);
let combatHandler = new CombatHandler();

tiles.create(pattern);
tiles.tileGroup[0].lastX = tiles.tileGroup[0].x;
tiles.tileGroup[0].lastY = tiles.tileGroup[0].y;

for(let i = 0; i < tiles.tileGroup.length; i++){
    let tile = tiles.tileGroup[i];
    if(tile.blockID == 201){
        combatHandler.spawnEnemy(tile);
    }
}


function update() {
    tiles.draw();

    // player.move();
    player.draw();
    combatHandler.draw();

    combatHandler.moveProjectiles(tiles.tileGroup[0]);
    combatHandler.moveEnemies(tiles.tileGroup[0]);
    combatHandler.enemyMovement(tiles, player);

    tiles.tileGroup[0].lastX = tiles.tileGroup[0].x;
    tiles.tileGroup[0].lastY = tiles.tileGroup[0].y;

    move();
    playerShoot();
}


function move() {
    if ($.keys.down("a") || $.keys.down("leftArrow")) {
        tileGroupMove("horizontal", "negative");
    }

    if ($.keys.down("w") || $.keys.down("upArrow")) {
        tileGroupMove("vertical", "negative");
    }

    if ($.keys.down("s") || $.keys.down("downArrow")) {
        tileGroupMove("vertical", "positive");
    }

    if ($.keys.down("d") || $.keys.down("rightArrow")) {
        tileGroupMove("horizontal", "positive");
    }

    for(let i = 0; i < tiles.tileGroup.length; i++){
        let tile = tiles.tileGroup[i];
        if (tile.wall){
            // weird things happen when a second bounce without input occurs
            // probs something to do with the -speed
            // -speed is bad yucky
            if(tile.overlaps(player.player)){
                for(let j = 0; j < tiles.tileGroup.length; j++){
                    let newTile = tiles.tileGroup[j];
                    newTile.speed = -newTile.speed;
                }
            }
        }
    }
}

function tileGroupMove(axis, polarity) {
    if (axis == "vertical") {
        if (polarity == "positive") {
            for (let i = 0; i < tiles.tileGroup.length; i++) {
                let tile = tiles.tileGroup[i];
                // Make go back pls?
                // tile.speed = speed;
            }
        }
        else {
            for (let i = 0; i < tiles.tileGroup.length; i++) {
                let tile = tiles.tileGroup[i];
                tile.speed = speed;
            }
        }
    }

    if (axis == "horizontal") {
        if (polarity == "positive") {
            for (let i = 0; i < tiles.tileGroup.length; i++) {
                let tile = tiles.tileGroup[i];
                tile.direction++;
                player.player.rotation = tile.direction;
            }
        }
        else {
            for (let i = 0; i < tiles.tileGroup.length; i++) {
                let tile = tiles.tileGroup[i];
                tile.direction--;
                player.player.rotation = tile.direction;
            }
        }
    }
}

function playerShoot(){
    if($.keys.down(" ") && player.lastFired + player.fireCooldown < $.frameCount){
        player.lastFired = $.frameCount;
        combatHandler.playerProjectiles.push(player.createProjectile());
    }
}

