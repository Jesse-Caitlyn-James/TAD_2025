export class Player {
    constructor(x, y, w, h, speed){
        this.create(x,y,w,h);
        this.speed = speed;
        this.fireCooldown = 60;
        this.lastFired = 0;
    }

    create(x, y, w, h){
        this.player = $.makeBoxCollider(x, y, w, h);
        this.player.rotation = 180;
    }

    draw(){
        this.player.draw();
    }

    move(tiles){
        if($.keys.down("a") || $.keys.down("leftArrow")){
            for (let i = 0; i < tiles.tileGroup.length; i++) {
                let tile = tiles.tileGroup[i];
                tile.x += this.speed;
                if (tile.type == "wall"){
                    // weird things happen when a second bounce without input occurs
                    // probs something to do with the -speed
                    // -speed is bad yucky
                    if(tile.overlaps(this.player)){
                        for(let j = 0; j < tiles.tileGroup.length; j++){
                            let newTile = tiles.tileGroup[j];
                            newTile.x = newTile.lastX;
                        }
                        break;
                    }
                }
            }
        }

        if($.keys.down("w") || $.keys.down("upArrow")){
            for (let i = 0; i < tiles.tileGroup.length; i++) {
                let tile = tiles.tileGroup[i];
                tile.y += this.speed;
                if (tile.type == "wall"){
                    // weird things happen when a second bounce without input occurs
                    // probs something to do with the -speed
                    // -speed is bad yucky
                    if(tile.overlaps(this.player)){
                        for(let j = 0; j < tiles.tileGroup.length; j++){
                            let newTile = tiles.tileGroup[j];
                            newTile.y = newTile.lastY;
                        }
                        break;
                    }
                }
            }
        }

        if($.keys.down("s") || $.keys.down("downArrow")){
            for (let i = 0; i < tiles.tileGroup.length; i++) {
                let tile = tiles.tileGroup[i];
                tile.y -= this.speed;
                if (tile.type == "wall"){
                    // weird things happen when a second bounce without input occurs
                    // probs something to do with the -speed
                    // -speed is bad yucky
                    if(tile.overlaps(this.player)){
                        for(let j = 0; j < tiles.tileGroup.length; j++){
                            let newTile = tiles.tileGroup[j];
                            newTile.y = newTile.lastY;
                        }
                        break;

                    }
                }
            }
        }

        if($.keys.down("d") || $.keys.down("rightArrow")){
            for (let i = 0; i < tiles.tileGroup.length; i++) {
                let tile = tiles.tileGroup[i];
                tile.x -= this.speed;
                if (tile.type == "wall"){
                    // weird things happen when a second bounce without input occurs
                    // probs something to do with the -speed
                    // -speed is bad yucky
                    if(tile.overlaps(this.player)){
                        for(let j = 0; j < tiles.tileGroup.length; j++){
                            let newTile = tiles.tileGroup[j];
                            newTile.x = newTile.lastX;
                        }
                        break;
                    }
                }
            }
        }
    }
}