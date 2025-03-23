export class Tiles{
    constructor(size){
        this.size = size;
        this.tileGroup = $.makeGroup();
    }

    create(pattern){
        for(let i = 0; i < pattern.length; i++){
            let patternRow = pattern[i].split(" ");
            for(let j = 0; j < patternRow.length; j++){
                let tile = $.makeBoxCollider(j * this.size + this.size/2, i * this.size + this.size/2, this.size, this.size);
                tile.blockID = patternRow[j];
                tile.fill = "rgb("+patternRow[j]+","+patternRow[j]+","+patternRow[j]+")";
                tile.static = true;

                tile.direction = 180;

                this.tileGroup.push(tile);
            }
        }
    }

    draw(){
        this.tileGroup.draw();

        for (let i = 0; i < this.tileGroup.length; i++){
            this.tileGroup[i].lastX = this.tileGroup[i].x;
            this.tileGroup[i].lastY = this.tileGroup[i].y;
        }
    }
}