export class Projectile{
    constructor(x, y, direction){
        this.create(x, y, direction);
    }

    create(x, y, direction){
        this.projectile = $.makeBoxCollider(x, y, 5, 10);
        this.projectile.rotation = direction;
        this.projectile.direction = this.projectile.rotation;
        this.projectile.speed = 25;
        this.projectile.mass = 0;
        this.projectile.friction = 0;
        this.projectile.lifespan = 10;
        console
    }

    explode(){

    }
}