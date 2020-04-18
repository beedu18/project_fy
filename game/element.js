class Element {
    constructor(x,y,food) {
        this.x=x;
        this.y=y;
        this.dimension=20;
        this.food=food; //true => food, false => poison
        this.health = loadImage('../resources/health.png');
        this.poison = loadImage('../resources/poison.png');
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
        this.x+=random(-3,3);
        this.y+=random(-3,3);
    }
}