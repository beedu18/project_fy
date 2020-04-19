class Element {
    constructor(x,y,food,dimension) {
        this.x = x;
        this.y = y;
        this.dimension = dimension;
        this.food = food; //true => food, false => poison
        this.health = loadImage('../resources/health.png');
        this.poison = loadImage('../resources/poison.png');
        this.xoff = random(100);
        this.spd = 2.5;
        this.lifetime = 1000;
    }

    show() {
        noStroke();
        if(this.food) { 
            image(this.health,this.x-this.dimension/2, this.y-this.dimension/2, this.dimension, this.dimension);
        }
            
        else {
            image(this.poison,this.x-this.dimension/2, this.y-this.dimension/2, this.dimension, this.dimension);
        }
    }

    vibrate() {
        this.x += map(noise(this.xoff),0,1,-this.spd,this.spd);
        this.y += map(noise(this.xoff+100),0,1,-this.spd,this.spd);
        this.xoff += 0.01;
        this.lifetime -= 1;
    }

    edge() {
        if(this.x>width-this.dimension/2)
            this.x = this.dimension/2;
        if(this.x<this.dimension/2)
            this.x = width-this.dimension/2;
        if(this.y>height-this.dimension/2)
            this.y = this.dimension/2;
        if(this.y<this.dimension/2)
            this.y = height-this.dimension/2;
    }
}