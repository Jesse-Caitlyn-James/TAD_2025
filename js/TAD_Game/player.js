export class Player {
    constructor(x, y, w, h, speed) {
        this.create(x, y, w, h);
        this.speed = speed;
        this.fireCooldown = 60;
        this.lastFired = 0;

        // Collision detection
        // Left, Up, Down, Right
        // ikr but leave me be
    }

    create(x, y, w, h) {
        this.player = $.makeBoxCollider(x, y, w, h);
        this.player.rotation = 180;
    }

    draw() {
        this.player.draw();
    }

    move(tiles) {
        if ($.keys.down("a") || $.keys.down("leftArrow")) {
            for (let i = 0; i < tiles.tileGroup.length; i++) {
                let tile = tiles.tileGroup[i];
                tile.x += this.speed;
                if (this.collision(tile, tiles)) {
                    break;
                }
            }

        }

        if ($.keys.down("w") || $.keys.down("upArrow")) {
            for (let i = 0; i < tiles.tileGroup.length; i++) {
                let tile = tiles.tileGroup[i];
                tile.y += this.speed;
                if (this.collision(tile, tiles)) {
                    break;
                }
            }

        }

        if ($.keys.down("s") || $.keys.down("downArrow")) {
            for (let i = 0; i < tiles.tileGroup.length; i++) {
                let tile = tiles.tileGroup[i];
                tile.y -= this.speed;
                if (this.collision(tile, tiles)) {
                    break;
                }
            }

        }

        if ($.keys.down("d") || $.keys.down("rightArrow")) {
            for (let i = 0; i < tiles.tileGroup.length; i++) {
                let tile = tiles.tileGroup[i];
                tile.x -= this.speed;
                if (this.collision(tile, tiles)) {
                    break;
                }
            }
        }

        for (let i = 0; i < tiles.tileGroup.length; i++) {
            let tile = tiles.tileGroup[i];
            if (tile.type == "wall") {
                if (tile.collides(this.player)) {
                }
            }

            tile.x = Math.floor(tile.x);
            tile.y = Math.floor(tile.y);
        }

        if (this.player.x != $.width / 2 || this.player.y != $.height / 2) {
            this.player.x = $.width / 2;
            this.player.y = $.height / 2;
        }
    }

    collision(tile, tiles) {
        if (tile.type == "wall") {
            if (tile.collides(this.player)) {
                let moveX = this.player.x - $.width / 2;
                let moveY = this.player.y - $.height / 2;

                for (let j = 0; j < tiles.tileGroup.length; j++) {
                    let newTile = tiles.tileGroup[j];
                    newTile.x = newTile.lastX;
                    newTile.y = newTile.lastY;

                    newTile.x -= moveX;
                    newTile.y -= moveY;

                }
                this.player.x = $.width / 2;
                this.player.y = $.height / 2;

                return true;
            }

        } else {
            return false;
        }
    }
}