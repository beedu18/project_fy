class Element {
    constructor(x,y,food) {
        this.x = x;
        this.y = y;
        this.dimension = 5;
        this.food = food; //true => food, false => poison
        this.xoff = random(100);
        this.spd = 2.5;
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
    }
}