class Agent {
    constructor(x, y, s=17, gene = [random(-2,2), random(-2,2)], col=color(0,255,236)) {
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
        this.gene = gene;
        this.h = 1;
    }

    calcFitness() {
        return this.health;
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

    highlight() {
        this.h+=1;
        this.h%=10;
        stroke(255);
        strokeWeight(this.h);
        noFill();
        ellipse(this.position.x, this.position.y, this.size);
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
            var steering = this.seek(elements[closest]);
            if(elements[closest].food)
                steering.mult(this.gene[0]);
            else
                steering.mult(this.gene[1]);
            this.applyForce(steering);
            
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