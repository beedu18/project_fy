class Element {
    constructor(x,y,food) {
        this.x = x;
        this.y = y;
        this.dimension = 5;
        this.food = food; //true => food, false => poison
        this.xoff = random(100);
        this.spd = 2.5;
        this.lifetime=1000;
    }

    show() {
        noStroke();
        if(this.food) { 
            fill(255);
        }
            
        else {
            fill(0);
        }
        ellipse(this.x, this.y, this.dimension);
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