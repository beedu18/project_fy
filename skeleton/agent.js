class Agent {
    constructor(x, y, col=color(0,255,236), s=17) {
        this.position = createVector(x,y);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,3));
        this.acceleration = createVector();
        this.size=s;
        this.col = col;
        this.length = 25;
        this.maxSpeed = 3;
        this.maxForce = .2;
        this.health = 50;
        this.maxHealth = 100;
    }

    //Steering force = Desired - current
    seek(target) {
        let Steering = createVector(0,0);
        Steering.add(createVector(target.x, target.y));
        Steering.sub(this.position);
        Steering.setMag(this.maxSpeed);
        Steering.sub(this.velocity);
        Steering.limit(this.maxForce);
        return Steering;
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    edge() {
        if(this.position.x>width-this.size/2)
            this.position.x = this.size/2;
        if(this.position.x<this.size/2)     
            this.position.x = width-this.size/2;
        if(this.position.y>height-this.size/2)
            this.position.y = this.size/2;
        if(this.position.y<this.size/2)
            this.position.y = height-this.size/2;
    }
    
    move() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);  
        this.acceleration.mult(0);  

        this.health-=0.06;
    }

    show() {
        let fraction = this.health/this.maxHealth;
        let currentColor = lerpColor(color(255,0,0),color(0,255,0),fraction);
        stroke(255);
        strokeWeight(1);
        fill(currentColor);
        ellipse(this.position.x,this.position.y,this.size);
    }

    eat(elements) {
        var d;
        var minDist = Infinity;
        var closest = -1;
        for(var i=elements.length-1; i>=0; i--) {
            d=dist(this.position.x, this.position.y, elements[i].x, elements[i].y);
            if(d<minDist) {
                minDist = d;
                closest = i;
            }
        }

        if(closest>-1) {
            this.applyForce(this.seek(elements[closest]));
            
            if(minDist<=this.size/2+elements[closest].dimension/2) {
                if(elements[closest].food)
                    this.health+=5;
                else
                    this.health-=5;
                elements.splice(closest,1);
            }
        }

    }
}