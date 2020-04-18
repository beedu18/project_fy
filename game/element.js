class Element {
    constructor(x,y,food) {
        this.x=x;
        this.y=y;
        this.dimension=15;
        this.food=food; //true => food, false => poison
    }

    show() {
        noStroke();
        if(this.food) { 
            fill(0,255,0);
        }
            
        else {
            fill(255,0,0);
        }
        ellipse(this.x,this.y,this.dimension);
    }

    vibrate() {
        if(this.food) {
            this.x+=random(-1,1);
            this.y+=random(-1,1);
        }
        else {
            this.x+=random(-1,1);
            this.y+=random(-1,1);
        }
    }
}