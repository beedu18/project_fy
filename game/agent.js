class Agent {
    constructor(x, y, s=17, col=color(0,255,236)) {
        this.position = createVector(x,y);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,3));
        this.acceleration = createVector();
        this.temp=createVector(); //temporary vector
        this.size=s;
        this.col = col;
        this.trails=[];
        this.length = (5/4)*this.size;
        this.pos=createVector();
        this.maxSpeed = 3;
        this.maxForce = .4;
        this.health = 50;
        this.maxHealth = 100;
        this.h = 0;
        this.gene = [1.2,-1.2];
    }

    //Steering force = Desired - current
    manualMovement() {
        let Steering = createVector();
        if(keyIsDown(LEFT_ARROW)) 
            Steering = this.seek(createVector(0,this.position.y));    //Desired
        
        if(keyIsDown(RIGHT_ARROW)) 
            Steering = this.seek(createVector(width,this.position.y));
        
        if(keyIsDown(UP_ARROW)) 
            Steering = this.seek(createVector(this.position.x,0));
        
        if(keyIsDown(DOWN_ARROW)) 
            Steering = this.seek(createVector(this.position.x,height));

        if(keyIsDown(UP_ARROW) && keyIsDown(RIGHT_ARROW))
            Steering = this.seek(createVector(this.position.x+20,this.position.y-20));

        if(keyIsDown(UP_ARROW) && keyIsDown(LEFT_ARROW))
            Steering = this.seek(createVector(this.position.x-20,this.position.y-20));
        
        if(keyIsDown(DOWN_ARROW) && keyIsDown(RIGHT_ARROW))
            Steering = this.seek(createVector(this.position.x+20,this.position.y+20));
        
        if(keyIsDown(DOWN_ARROW) && keyIsDown(LEFT_ARROW))
            Steering = this.seek(createVector(this.position.x-20,this.position.y+20));
        
        this.applyForce(Steering);
    }

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

    aiMovement() {
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
                    this.health+=5;
                    this.foodEaten+=1;
                }
                else {
                    this.health-=5;
                    this.poisonEaten+=1;
                }
                elements.splice(closest,1);
                this.nutrition = this.foodEaten - this.poisonEaten;
            }
        }
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
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        
        this.health-=0.05;
        
        this.temp=createVector(this.position.x,this.position.y);
        this.trails.push(this.temp);        
        if(this.trails.length>this.length)
            this.trails.splice(0,1);    
    }

    show() {
        for(var i=this.trails.length-1; i>=0 ;i--) {
            this.pos=this.trails[i];
            noStroke();
            fill(this.col);
            ellipse(this.pos.x,this.pos.y,i/3);
        }
        ellipse(this.position.x,this.position.y,this.size);
    }

    naturalMovement() {
        this.position.x += random(-.7,.7);
        this.position.y += random(-.7,.7);
    }

    eat(elements) {
        var d=[];
        for(var i=elements.length-1; i>=0; i--) {
            d=dist(this.position.x, this.position.y, elements[i].x, elements[i].y);
            if (d<=this.size/2+elements[i].dimension/2) {
                if(elements[i].food) {
                    if(this.health<50) {
                        this.health+=5;
                    }
                }
                else {
                    this.health-=5;
                }
                elements.splice(i,1);
            }
        }
    }

    healthBar(x,y,content="default") {
        fill(this.col);
        textSize(this.size);
        textStyle(BOLD);
        text(content,x,y);
        
        let fraction = this.health/this.maxHealth;
        let currentColor = lerpColor(color(255,0,0),color(0,255,0),fraction);
        let b = this.size;
        let l = lengthConstant*width;
        
        this.h+=0.2;
        this.h%=5;
        //inner
        fill(currentColor);
        rect(x,y+this.size/2,fraction*l,b);
        
        //outer
        noFill();
        if(this.health<=20)
            strokeWeight(this.h);
        else
            strokeWeight(2);
        stroke(255);
        rect(x,y+this.size/2,l,b);
    }
}