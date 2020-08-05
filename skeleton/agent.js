class Agent {
    constructor(x, y, gene = [random(-2,2), random(-2,2)], s=17, col=color(0,255,236)) {
        this.position = createVector(x,y);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,3));
        this.acceleration = createVector();
        this.size=s;
        this.col = col;
        this.length = 25;
        this.maxSpeed = 3;
        this.maxForce = .4;
        this.health = 50;
        this.maxHealth = 100;
        this.gene = gene;
        this.h = 1;
        this.foodEaten = 0;
        this.poisonEaten = 1;
        this.nutrition = 0;
        this.count = 0;
        this.cycle = 0;
    }

    calcFitness() {
        //uncomment any of the following to change fitness value
        
        // return Math.random();
        // return this.cycle;
        // return this.health;
        // return this.food/(this.foodEaten + this.poisonEaten);
        // return (this.cycle + this.foodEaten/(this.foodEaten + this.poisonEaten));
        // return (this.cycle + this.foodEaten/(3*this.poisonEaten));
        // return (this.cycle + this.foodEaten - 2*this.poisonEaten);
        // return 100*(2-(this.maxHealth/this.health));
        return this.cycle+this.nutrition;
    }

    cloneWithTweaks() {
        let x = this.position.x;
        let y = this.position.y;
        let gene = [
                this.gene[0]+random(-0.05, 0.05),
                this.gene[1]+random(-0.05, 0.05)
            ];
        return new Agent(x, y, gene);
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

        this.health-=0.1;
        
        this.count+=1;
        this.count%=500;

        if(this.count%500==0)
            this.cycle+=1;
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
                if(elements[closest].food) {
                    if(this.health<=this.maxHealth-5)
                        this.health+=5;
                    this.foodEaten+=1;
                    this.nutrition+=1;
                }
                else {
                    this.health-=5;
                    this.poisonEaten+=1;
                    this.nutrition-=1;
                }
                elements.splice(closest,1);
            }
        }

    }
}