import { Projectile } from "./projectile.js";

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

    move(){
        if($.keys.down("a") || $.keys.down("leftArrow")){
            this.player.x -= this.speed;
        }

        if($.keys.down("w") || $.keys.down("upArrow")){
            this.player.y -= this.speed;
        }

        if($.keys.down("s") || $.keys.down("downArrow")){
            this.player.y += this.speed;
        }

        if($.keys.down("d") || $.keys.down("rightArrow")){
            this.player.x += this.speed;
        }
    }

    createProjectile(){
        let rotation = 360 - this.player.rotation;
        let c = this.player.w/2 + 10;
        let b = Math.cos(rotation * Math.PI/180) * c;
        let a = Math.sqrt(Math.abs(Math.pow(b, 2) - Math.pow(c, 2)));

        let x;
        let y = this.player.y + b;

        if(rotation >= 180){
            x = this.player.x - a;
        } else {
            x = this.player.x + a;
        }

        let projectile = new Projectile(x, y, this.player.rotation - 180);
        return projectile.projectile;
    }
}