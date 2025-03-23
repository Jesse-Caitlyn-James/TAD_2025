import { Tiles } from "./tiles.js";

export class LevelLoader{
    constructor(tileSize){
        this.currentLevel;
        this.tileBuilder = new Tiles(tileSize);

        this.tileList = [
            [1, "wall"],
        ]
    }

    loadLevel(level, player, spawnLocation){
        this.tileBuilder.tileGroup = $.makeGroup();

        let newLevel = this.tileBuilder.create(level);
        
        for(let i = 0; i < this.tileBuilder.tileGroup.length; i++){
            let tile = this.tileBuilder.tileGroup[i];
            for (let j = 0; j < this.tileList.length; j++){
                let id = this.tileList[j][0];
                let type = this.tileList[j][1];
                
                if (tile.blockID == id){
                    tile.type = type;
                }
            }
        }

        for (let i = 0; i < this.tileBuilder.tileGroup.length; i++){
            let tile = this.tileBuilder.tileGroup[i];
            if (tile.blockID == spawnLocation){
                let moveDistX = player.player.x - tile.x;
                let moveDistY = player.player.y - tile.y;

                for (let j = 0; j < this.tileBuilder.tileGroup.length; j++){
                    let tile2 = this.tileBuilder.tileGroup[j];
                    tile2.x += moveDistX;
                    tile2.y += moveDistY;
                }
                
                break;
            }
        }

        return newLevel;
    }

    draw(){
        this.tileBuilder.draw();
    }
}