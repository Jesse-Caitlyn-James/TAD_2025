export class CombatHandler {
    constructor() {
        this.playerProjectiles = $.makeGroup();
    }

    draw() {
        this.playerProjectiles.draw();
        this.enemy.draw();
        this.enemy.sightLine.draw();

    }

    moveProjectiles(tile) {
        let velX = tile.lastX - tile.x;
        let velY = tile.lastY - tile.y;

        for (let i = 0; i < this.playerProjectiles.length; i++) {
            let proj = this.playerProjectiles[i];
            proj.x -= velX;
            proj.y -= velY;
        }
    }

    moveEnemies(tile) {
        let velX = tile.lastX - tile.x;
        let velY = tile.lastY - tile.y;

        this.enemy.x -= velX;
        this.enemy.y -= velY;

        this.enemy.sightLine.x -= velX;
        this.enemy.sightLine.y -= velY;
    }

    spawnEnemy(tile) {
        this.enemy = $.makeBoxCollider(tile.x, tile.y, 50, 100);
        this.enemy.FSMState = "patrol";
        this.enemy.target = tile;
        this.enemy.sightLine = $.makeBoxCollider((this.enemy.x + this.enemy.target.x) / 2, (this.enemy.y + this.enemy.target.y) / 2, 10, 5);
        this.enemy.fill = "Red";
        this.enemy.sightLine.fill = "Red";
    }

    enemyMovement(tiles, player) {
        switch (this.enemy.FSMState) {
            case "patrol":
                this.enemyPatrol(tiles, player);
                break;
            case "hunt":
                this.enemyHunt(player, tiles);
                break;
            case "fire":
                this.enemyFire(player);
                break;
        }

        // move
    }

    enemyPatrol(tiles, player) {
        let targetDist = $.math.distance(this.enemy.x, this.enemy.y, this.enemy.target.x, this.enemy.target.y)
        if (targetDist < 15) {
            this.enemy.target = false;
            while (!this.enemy.target) {
                let target = tiles.tileGroup.getRandomEntry();
                this.enemy.sightLine.x = (this.enemy.x + target.x) / 2;
                this.enemy.sightLine.y = (this.enemy.y + target.y) / 2;
                this.enemy.sightLine.rotation = this.enemy.sightLine.getAngleToPoint(target.x, target.y);
                let dist = $.math.distance(this.enemy.sightLine.x, this.enemy.sightLine.y, target.x, target.y);
                this.enemy.sightLine.h = dist * 2;

                let safe = true;
                for (let i = 0; i < tiles.tileGroup.length; i++) {
                    let tile = tiles.tileGroup[i];

                    if (this.enemy.sightLine.overlaps(tile)) {
                        if (tile.wall) {
                            safe = false;
                            break;
                        }
                    }
                }

                if (safe) {
                    this.enemy.target = target;
                }
            }
        }
        else {
            this.enemy.rotation = this.enemy.getAngleToPoint(this.enemy.target.x, this.enemy.target.y);
            this.enemy.direction = this.enemy.rotation;
            this.enemy.speed = 20;
        }

        let playerDist = $.math.distance(player.player.x, player.player.y, this.enemy.x, this.enemy.y);
        if (playerDist < 400) {
            this.enemy.FSMState = "hunt";
            this.enemy.target = player.player;
        }
    }

    enemyHunt(player, tiles) {
        this.enemy.sightLine.x = (this.enemy.x + player.player.x) / 2;
        this.enemy.sightLine.y = (this.enemy.y + player.player.y) / 2;
        this.enemy.sightLine.rotation = this.enemy.sightLine.getAngleToPoint(player.player.x, player.player.y);
        let dist = $.math.distance(this.enemy.sightLine.x, this.enemy.sightLine.y, player.player.x, player.player.y);
        this.enemy.sightLine.h = dist * 2;

        let safe = true;
        for (let i = 0; i < tiles.tileGroup.length; i++) {
            let tile = tiles.tileGroup[i];

            if (this.enemy.sightLine.overlaps(tile)) {
                if (tile.wall) {
                    safe = false;
                    break;
                }
            }
        }

        if (safe) {
            this.enemy.rotation = this.enemy.getAngleToPoint(this.enemy.target.x, this.enemy.target.y);
            this.enemy.direction = this.enemy.rotation;
            this.enemy.speed = 20;
        } else {
            this.enemy.FSMState = "patrol";
        }

        let playerDist = $.math.distance(player.player.x, player.player.y, this.enemy.x, this.enemy.y);
        if (playerDist < 200) {
            this.enemy.FSMState = "fire";
            this.enemy.target = player.player;
        }
        if (playerDist > 600){
            this.enemy.FSMState = "patrol";
            this.enemy.target = this.enemy;
        }
    }

    enemyFire(player) {


        let playerDist = $.math.distance(player.player.x, player.player.y, this.enemy.x, this.enemy.y);
        if (playerDist < 400) {
            this.enemy.FSMState = "hunt";
            this.enemy.target = player.player;
        }
        if (playerDist > 600){
            this.enemy.FSMState = "patrol";
            this.enemy.target = this.enemy;
        }
    }
}